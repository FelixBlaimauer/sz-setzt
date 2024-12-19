import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, User } from '@/types';
import { DataTable } from '@/Components/DataTable';
import { userColumns } from '@/Pages/Admin/Partials/Users/UserColumns';

export default function UsersScreen({users, auth}: PageProps<{users: User[]}>) {
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
                        <h2 className="text-2xl font-semibold text-slate-950">
                            Users
                        </h2>

                        <DataTable<User> columns={userColumns} data={users} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
