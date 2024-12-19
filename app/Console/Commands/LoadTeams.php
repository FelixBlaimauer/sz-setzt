<?php

namespace App\Console\Commands;

use App\Models\Group;
use App\Models\Player;
use App\Models\Team;
use Google\Service\Exception;
use Google\Service\Sheets\CellData;
use Google\Service\Sheets\RowData;
use Google\Service\Sheets\Sheet;
use Google_Client;
use Google_Service_Sheets;
use Illuminate\Console\Command;
use Throwable;

class LoadTeams extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:teams-and-players {spreadsheetId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Imports teams and players from the Google Sheets File via the Google API';


    private Google_Client $client;
    private Google_Service_Sheets $service;

    /**
     * Execute the console command.
     * @throws Exception
     * @throws Throwable
     */
    public function handle(): void
    {
        $this->client = new Google_Client();
        $this->client->setApplicationName("Weihnachtsturnier");
        $this->client->setDeveloperKey(env('GOOGLE_API_KEY'));
        $this->service = new \Google_Service_Sheets($this->client);

        $teams = $this->getTeams();
        $players = $this->getPlayers();

        //collect($teams)->each(fn($team) => print_r("'{$team['name']}' '{$team['group']}'\n"));

        foreach ($players as $player) {
            if (!collect($teams)->contains(fn($team) => $team["name"] == $player["team"])) {
                echo "'" . $player["team"] . "' '" . $player["nr"] . "' '" . $player["name"] . "'\n";
                echo "Last Player is in unknown Team\n";
            }
        }

        \DB::Transaction(function () use ($teams, $players) {
            $groupMap = Group::all()->mapWithKeys(fn($group) => [$group->name => $group->id]);

            $teamModels = [];
            foreach ($teams as $team) {
                $teamModel = new Team([
                    "name" => $team["name"],
                    "group_id" => $groupMap->get($team["group"], 3) // TODO: remove default value 3 when group_id is nullable
                ]);
                $teamModel->save();
                $teamModels[$team["name"]] = $teamModel->id;
            }

            foreach ($players as $player) {
                $playerModel = new Player([
                    "name" => $player["name"],
                    "shirt_number" => $player["nr"],
                    "team_id" => $teamModels[$player["team"]],
                ]);
                $playerModel->save();
            }
        });
    }

    private static function sanitize(string $value): string
    {
        return trim(preg_replace('/[^\w\- \x{00F0}-\x{02AF}]/u', '', $value));
    }

    public function getTeams()
    {
        $spreadsheet = $this->service->spreadsheets->get($this->argument('spreadsheetId'), ["ranges" => "Mannschaften!A1:E30", "includeGridData" => true]);
        $sheets = $spreadsheet->getSheets();
        $teamsSheet = collect($sheets)
            ->first(fn(Sheet $sheet) => $sheet->getProperties()->getTitle() == "Mannschaften");

        $teams = collect($teamsSheet->getData()[0]->getRowData())
            ->skip(1)
            ->filter(fn(RowData $row) => trim($row->getValues()[0]->formattedValue) != "")
            ->map(function (RowData $row) {
                $cells = collect($row->getValues())->map(fn(CellData $cell) => trim($cell->formattedValue));
                return ["name" => LoadTeams::sanitize($cells[0]), "player_count" => $cells[1], "group" => $cells[3]];
            })->toArray();

        return $teams;
    }

    public function getPlayers()
    {
        $spreadsheet = $this->service->spreadsheets->get($this->argument('spreadsheetId'), ["ranges" => "Torschützenliste!A1:E200", "includeGridData" => true]);
        $sheets = $spreadsheet->getSheets();
        $playerSheet = collect($sheets)
            ->first(fn(Sheet $sheet) => $sheet->getProperties()->getTitle() == "Torschützenliste");

        $players = collect($playerSheet->getData()[0]->getRowData())
            ->skip(1)
            ->filter(fn(RowData $row) => trim($row->getValues()[0]->formattedValue) != "")
            ->map(function (RowData $row) {
                $cells = collect($row->getValues())->map(fn(CellData $cell) => trim($cell->formattedValue));
                return ["team" => LoadTeams::sanitize($cells[0]), "nr" => $cells[1], "name" => LoadTeams::sanitize($cells[2]), "goals" => $cells[3]];
            })->toArray();

        return $players;
    }


}
