import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Team } from '@/Pages/Admin/Partials/Teams/TeamColumns';
import TeamAdminList from '@/Pages/Admin/TeamAdminList';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Index({ teams }: PageProps<{ teams: Team[] }>) {
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}