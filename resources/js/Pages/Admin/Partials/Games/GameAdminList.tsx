import { DataTable } from '@/Components/DataTable';
import { TournamentStage } from '@/Components/GameCard';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { AdminGame } from '@/lib/types/AdminGame';
import { Team } from '@/lib/types/Team';
import { getGameColumns } from '@/Pages/Admin/Partials/Games/GameColumns';
import { Select } from '@headlessui/react';
import { router, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

type GameFormData = Omit<AdminGame, 'id'>;

interface GameAdminListProps {
    games: AdminGame[];
    teams: Team[];
}

const groups = ['A', 'B', 'C', 'D'];

export default function GameAdminList({ games, teams }: GameAdminListProps) {
    const [handlingGameCreation, setHandlingGameCreation] = useState(false);
    const gameNameInput = useRef<HTMLInputElement | null>(null);

    const gameColumns = getGameColumns({
        onDelete: (game) => {
            router.delete(route('games.destroy', game.id));
        },
    });

    const {
        data,
        setData,
        post: create,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm<GameFormData>({
        stage: TournamentStage.GROUP_STAGE,
    });

    const handleGameCreation = () => {
        setHandlingGameCreation(true);
    };

    const closeTeamCreation = () => {
        setHandlingGameCreation(false);

        clearErrors();
        reset();
    };

    const createTeam = (e) => {
        e.preventDefault();

        console.log(data);

        create(route('games.store'), {
            preserveScroll: true,
            onSuccess: () => closeTeamCreation(),
            onError: () => gameNameInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <section>
            <header className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-medium text-gray-900">Games</h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Manage the games.
                    </p>
                </div>

                <PrimaryButton
                    onClick={handleGameCreation}
                    disabled={processing}
                >
                    New game
                </PrimaryButton>

                <Modal
                    className="overflow-visible"
                    show={handlingGameCreation}
                    onClose={closeTeamCreation}
                >
                    <form onSubmit={createTeam} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Create game
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Enter details to create a new game.
                        </p>

                        <div className="mt-6">
                            <InputLabel htmlFor="game-name" value="Game Name" />

                            <TextInput
                                ref={gameNameInput}
                                id="game-name"
                                name="game-name"
                                onChange={(e) => {
                                    setData('name', e.target.value);
                                }}
                                value={data.name}
                                className="mt-1 block w-full"
                                placeholder="Game Name"
                                isFocused
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-2">
                            <InputLabel
                                htmlFor="planned-at"
                                value="Planned At"
                            />

                            <div className="flex w-fit gap-2">
                                <Datetime
                                    id="planned-at"
                                    name="planned-at"
                                    onChange={(e) => {
                                        setData('planned_at', e);
                                    }}
                                    value={data.planned_at}
                                    className="mt-1 block w-full"
                                    placeholder="Planned At"
                                    isFocused
                                />

                                <SecondaryButton
                                    type="button"
                                    onClick={() =>
                                        setData('planned_at', new Date())
                                    }
                                >
                                    Now
                                </SecondaryButton>

                                <InputError
                                    message={errors.planned_at}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="duration"
                                    value="Duration"
                                />

                                <TextInput
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    onChange={(e) => {
                                        setData('duration', e.target.value);
                                    }}
                                    value={data.duration}
                                    min={0}
                                    className="mt-1"
                                    placeholder="Duration"
                                    isFocused
                                />

                                <InputError
                                    message={errors.duration}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6">
                                <InputLabel htmlFor="group-id" value="Group" />

                                <Select
                                    id="group-id"
                                    onChange={(e) => {
                                        setData('group_id', e.target.value);
                                    }}
                                    multiple={false}
                                    value={data.group_id}
                                >
                                    <option value={undefined}>Null</option>
                                    {groups.map((group, index) => (
                                        <option
                                            key={group + index}
                                            value={index + 1}
                                        >
                                            {group}
                                        </option>
                                    ))}
                                </Select>

                                <InputError
                                    message={errors.group_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <InputLabel htmlFor="game-stage" value="Stage" />

                            <Select
                                id="game-stage"
                                onChange={(e) => {
                                    setData('stage', e.target.value);
                                }}
                                multiple={false}
                                value={data.stage}
                            >
                                {Object.values(TournamentStage).map(
                                    (stage, index) => (
                                        <option
                                            key={stage + index}
                                            value={stage}
                                        >
                                            {stage}
                                        </option>
                                    ),
                                )}
                            </Select>

                            <InputError
                                message={errors.stage}
                                className="mt-2"
                            />
                        </div>

                        <h4 className="mt-4">Team</h4>

                        <div className="mt-2">
                            <InputLabel htmlFor="team-a-id" value="Team A" />

                            <Select
                                id="team-a-id"
                                onChange={(e) => {
                                    setData('team_a_id', e.target.value);
                                }}
                                multiple={false}
                                value={data.team_a_id}
                            >
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </Select>

                            <InputError
                                message={errors.team_a_id}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-6">
                            <InputLabel htmlFor="team-b-id" value="Team B" />

                            <Select
                                id="team-a-id"
                                onChange={(e) => {
                                    setData('team_b_id', e.target.value);
                                }}
                                multiple={false}
                                value={data.team_b_id}
                            >
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </Select>

                            <InputError
                                message={errors.team_b_id}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton onClick={closeTeamCreation}>
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton>Create Game</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </header>

            <div className="py-10">
                <DataTable<AdminGame> columns={gameColumns} data={games} />
            </div>
        </section>
    );
}
