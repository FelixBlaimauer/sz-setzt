import { Game } from '@/Components/GameCard';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Player } from '@/lib/types/Player';
import { Team } from '@/lib/types/Team';
import { PageProps } from '@/types';
import { Select } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export interface AdminTeam extends Team {
    players: Player[];
}

export interface AdminGame extends Game {
    teams: AdminTeam[];
}

export default function GameAdminScreen({
    game,
}: PageProps<{ game: AdminGame }>) {
    const [plannedAt, setPlannedAt] = useState<Date | string>(
        new Date(game.planned_at),
    );
    const [startedAt, setStartedAt] = useState<Date | string | undefined>(
        game.started_at ? new Date(game.started_at) : undefined,
    );
    const [endedAt, setEndedAt] = useState<Date | string | undefined>(
        game.ended_at ? new Date(game.ended_at) : undefined,
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin
                </h2>
            }
        >
            <Head title="Admin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h2 className="mb-2 text-2xl font-medium">
                            Game Details
                        </h2>

                        <form className="space-y-2">
                            <div>
                                <InputLabel
                                    htmlFor="game-name"
                                    value="Game Name"
                                />
                                <TextInput
                                    id="game-name"
                                    name="game-name"
                                    value={game.name}
                                    placeholder="Game Name"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="planned_at"
                                    value="Planned At"
                                />
                                <div className="flex gap-2">
                                    <Datetime
                                        value={plannedAt}
                                        className="rounded-lg"
                                    />
                                    <SecondaryButton
                                        onClick={() => setPlannedAt(new Date())}
                                        type="button"
                                    >
                                        Now
                                    </SecondaryButton>
                                </div>
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="Started At"
                                    value="Started At"
                                />
                                <div className="flex gap-2">
                                    <Datetime
                                        value={startedAt}
                                        className="rounded-lg"
                                    />
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => setStartedAt(new Date())}
                                    >
                                        Now
                                    </SecondaryButton>
                                </div>
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="Ended At"
                                    value="Ended At"
                                />
                                <div className="flex gap-2">
                                    <Datetime
                                        value={endedAt}
                                        className="rounded-lg"
                                    />
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => setEndedAt(new Date())}
                                    >
                                        Now
                                    </SecondaryButton>
                                </div>
                            </div>

                            <h3 className="text-xl">Goals</h3>
                            {game.teams.map((team) => (
                                <div key={team.id}>
                                    <h4>{team.name}</h4>
                                    {team.goals?.map((goal) => (
                                        <div
                                            key={goal.id}
                                            className="flex gap-2"
                                        >
                                            <input
                                                min={0}
                                                type="number"
                                                value={goal.minute}
                                                className="w-24 rounded-lg"
                                            />
                                            <Select>
                                                {team.players.map((player) => (
                                                    <option
                                                        key={player.id}
                                                        value={player.id}
                                                    >
                                                        {player.name}
                                                    </option>
                                                ))}
                                            </Select>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
