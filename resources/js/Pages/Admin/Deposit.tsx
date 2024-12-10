import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Deposit({ userId }: PageProps<{ userId: string }>) {
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Deposit
                </h2>
            }
        >
            <Head title="Admin | Deposit" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h2 className="text-xl">Manage Transaction</h2>
                        <p className="text-gray-600">
                            <span className="font-medium">User: </span>
                            {userId}
                        </p>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
