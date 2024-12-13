import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { teamColumns } from '@/Pages/Admin/Partials/Teams/TeamColumns';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { DataTable } from '@/Components/DataTable';
import { Team } from '@/lib/types/Team';

type TeamFormData = Omit<Team, 'id'>;

interface TeamAdminListProps {
    teams: Team[];
}

export default function TeamAdminList({ teams }: TeamAdminListProps) {
    const [handlingTeamCreation, setHandlingTeamCreation] = useState(false);
    const teamNameInput = useRef<HTMLInputElement | null>(null);

    const {
        data,
        setData,
        post: create,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm<TeamFormData>({
        name: '',
    });

    const handleTeamCreation = () => {
        setHandlingTeamCreation(true);
    };

    const closeTeamCreation = () => {
        setHandlingTeamCreation(false);

        clearErrors();
        reset();
    };

    const createTeam = (e) => {
        e.preventDefault();

        create(route('teams.store'), {
            preserveScroll: true,
            onSuccess: () => closeTeamCreation(),
            onError: () => teamNameInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <section>
            <header className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-medium text-gray-900">Teams</h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Manage the teams.
                    </p>
                </div>

                <PrimaryButton
                    onClick={handleTeamCreation}
                    disabled={processing}
                >
                    New Team
                </PrimaryButton>

                <Modal show={handlingTeamCreation} onClose={closeTeamCreation}>
                    <form onSubmit={createTeam} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Create Team
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Enter details to create a new team.
                        </p>

                        <div className="mt-6">
                            <InputLabel
                                htmlFor="team-name"
                                value="Team Name"
                                className="sr-only"
                            />

                            <TextInput
                                ref={teamNameInput}
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
                            <PrimaryButton>Create Team</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </header>

            <div className="py-10">
                <DataTable<Team> columns={teamColumns} data={teams} />
            </div>
        </section>
    );
}
