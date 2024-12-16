import { DataTable } from '@/Components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Bet } from '@/lib/types/Bet';
import { betsColumns } from '@/Pages/Profile/Partials/BetsColumns';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function BetsScreen({ bets, auth }: PageProps<{ bets: Bet[] }>) {
    console.log(bets);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Wetten
                </h2>
            }
        >
            <Head title="Wetten" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h2 className="mb-4 text-xl font-semibold text-slate-950">
                            Übersicht
                        </h2>

                        <DataTable<Bet> columns={betsColumns} data={bets} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
