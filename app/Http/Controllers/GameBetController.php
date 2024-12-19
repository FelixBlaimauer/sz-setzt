<?php

namespace App\Http\Controllers;

use App\Enums\BetType;
use App\Enums\TransactionType;
use App\Models\Game;
use App\Models\GameBet;
use App\Models\Transaction;
use Auth;
use Illuminate\Http\Request;

class GameBetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if ($user == null) {
            abort(403);
        }

        $amount = (int) $request->input('amount');
        $team_id = $request->input('team');
        $game_id = $request->input('game');

        $bets = $user->bets->where('type', BetType::GAME_BET)->load('bettable');

        if ($bets->where('bettable.game_id', $game_id)->count() > 0) {
            return back()->withErrors(['game' => 'You have already placed a bet on this game!']);
        }

        if (Game::find($game_id)->started_at !== null) {
            return back()->withErrors(['game' => 'Game has already started!']);
        }

        if ($amount < 1) {
            return back()->withErrors(['amount' => 'Cannot bet negative amount!']);
        }

        if ($user->balance < $amount) {
            return back()->withErrors(['amount' => 'Insufficient funds!']);
        }

        \DB::transaction(function () use ($team_id, $game_id, $amount, $request, $user) {
            $gameBet = new GameBet([
                'game_id' => $game_id,
                'team_id' => $team_id,
            ]);

            $gameBet->save();

            $transaction = new Transaction([
                'user_id' => $user->id,
                'amount' => -1 * $amount,
                'type' => TransactionType::SPEND,
            ]);

            $transaction->save();

            $gameBet->bet()->create([
                'user_id' => $user->id,
                'type' => BetType::GAME_BET,
                'amount' => $amount,
                'transaction_id' => $transaction->id,
            ]);
        });

        return redirect()->back()->with('success', 'Bet placed successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(GameBet $gameBet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GameBet $gameBet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GameBet $gameBet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GameBet $gameBet)
    {
        //
    }
}
