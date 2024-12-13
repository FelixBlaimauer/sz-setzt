import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { DataTable } from '@/Components/DataTable';
import { AdminGame } from '@/lib/types/AdminGame';
import { getGameColumns } from '@/Pages/Admin/Partials/Games/GameColumns';

type GameFormData = Omit<AdminGame, 'id'>;

interface GameAdminListProps {
    games: AdminGame[];
}

export default function TeamAdminList({ games }: GameAdminListProps) {
    const [handlingGameCreation, setHandlingGameCreation] = useState(false);
    const gameNameInput = useRef<HTMLInputElement | null>(null);

    const gameColumns = getGameColumns({
        onEdit: () => {},
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
        name: '',
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

        create(route('teams.store'), {
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

                <Modal show={handlingGameCreation} onClose={closeTeamCreation}>
                    <form onSubmit={createTeam} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Create game
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Enter details to create a new game.
                        </p>

                        <div className="mt-6">
                            <InputLabel
                                htmlFor="team-name"
                                value="Team Name"
                                className="sr-only"
                            />

                            <TextInput
                                ref={gameNameInput}
                                id="team-name"
                                name="team-name"
                                onChange={(e) => {
                                    setData('name', e.target.value);
                                }}
                                value={data.name}
                                className="mt-1 block w-full"
                                placeholder="Team Name"
                                isFocused
                            />

                            <InputError
                                message={errors.name}
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
