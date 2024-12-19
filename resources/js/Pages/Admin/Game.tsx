import GameCard, { Game } from '@/Components/GameCard';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Player } from '@/lib/types/Player';
import { Team } from '@/lib/types/Team';
import { PageProps } from '@/types';
import { Select } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import dayjs from 'dayjs';

export interface AdminTeam extends Team {
    players: Player[];
}

export interface AdminGame extends Game {
    teams: AdminTeam[];
}

interface NewGoal {
    team_id: string;
    player_id: string;
    minute?: number;
    game_id: null;
}

const GoalForm = ({ game, team }: { game: Game; team: AdminTeam }) => {
    const {
        data,
        setData,
        post: create,
        errors,
    } = useForm<NewGoal>({
        player_id: team.players[0].id,
        team_id: team.id,
        minute: undefined,
        game_id: null,
    });

    const createGoal = (e) => {
        e.preventDefault();

        create(route('games.goals.store', game.id));
    };

    return (
        <div>
            <h4>
                {team.name}: {team.goals?.length ?? 0}
            </h4>

            <form onSubmit={createGoal} className="mt-4">
                <Select
                    value={data.player_id}
                    onChange={(e) => setData('player_id', e.target.value)}
                >
                    {team.players.map((player) => (
                        <option key={player.id} value={player.id}>
                            {player.shirt_number} | {player.name}
                        </option>
                    ))}
                </Select>
                <TextInput
                    className="ms-2 w-24"
                    type="number"
                    min={0}
                    value={data.minute}
                />

                <SecondaryButton className="ms-2" type="submit">
                    Add Goal
                </SecondaryButton>

                <InputError message={errors.team_id} />
                <InputError message={errors.player_id} />
                <InputError message={errors.game_id} />
            </form>
        </div>
    );
};

export default function GameAdminScreen({
    game,
}: PageProps<{ game: AdminGame }>) {
    const [startedAt, setStartedAt] = useState<Date | string | undefined>(
        game.started_at ? new Date(game.started_at) : undefined,
    );
    const [endedAt, setEndedAt] = useState<Date | string | undefined>(
        game.ended_at ? new Date(game.ended_at) : undefined,
    );

    const {
        data: startData,
        setData: setStartData,
        put: start,
    } = useForm<{ started_at: string }>();

    const {
        data: endData,
        setData: setEndData,
        put: end,
    } = useForm<{ ended_at: string }>();

    const handleStart = () => {
        if (!startedAt) return;

        setStartData('started_at', dayjs(startedAt).toISOString());
        end(route('games.end', game.id));
    };

    const handleEnd = () => {
        if (!endedAt) return;

        setEndData('ended_at', dayjs(endedAt).toISOString());
        start(route('games.end', game.id));
    };

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
                    <GameCard
                        game={game}
                        showScore={true}
                        showOdds={true}
                        showDetails={true}
                        oddFormat={'decimal'}
                    />

                    <div className="mx-4 bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h2 className="mb-2 text-2xl font-medium">
                            Game: {game.name}
                        </h2>

                        <div className="flex flex-wrap">
                            <div className="grow">
                                <p className="text-xl font-medium">
                                    Start Time
                                </p>
                                <div className="flex gap-2">
                                    <Datetime
                                        onChange={(v) => setStartedAt(v)}
                                        value={startedAt}
                                    />
                                    <SecondaryButton
                                        onClick={() => setStartedAt(new Date())}
                                    >
                                        Now
                                    </SecondaryButton>
                                </div>
                                <PrimaryButton
                                    onClick={handleStart}
                                    className="mt-2"
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                            <div className="grow">
                                <p className="text-xl font-medium">End Time</p>
                                <div className="flex gap-2">
                                    <Datetime
                                        onChange={(v) => setEndedAt(v)}
                                        value={endedAt}
                                    />
                                    <SecondaryButton
                                        onClick={() => setEndedAt(new Date())}
                                    >
                                        Now
                                    </SecondaryButton>
                                </div>
                                <PrimaryButton onClick={handleEnd} className="mt-2">
                                    Save
                                </PrimaryButton>
                            </div>
                        </div>

                        <h4 className="mt-4 text-lg font-medium">Goals</h4>

                        <div className="space-y-2">
                            {game.teams.map((team) => (
                                <GoalForm
                                    game={game}
                                    key={team.id}
                                    team={team}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
