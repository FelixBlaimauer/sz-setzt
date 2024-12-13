import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GameAdminList from '@/Pages/Admin/Partials/Games/GameAdminList';
import TeamAdminList from '@/Pages/Admin/Partials/Teams/TeamAdminList';
import type { Team } from '@/lib/types/Team';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import type { AdminGame } from '@/lib/types/AdminGame';

export default function Index({
    teams,
    games,
}: PageProps<{ teams: Team[]; games: AdminGame[] }>) {
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
                        <TeamAdminList teams={teams} />
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <GameAdminList games={games} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
