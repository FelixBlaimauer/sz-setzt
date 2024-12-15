import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transaction } from '@/lib/types/Transaction';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/Components/DataTable';
import { transactionColumns } from '@/Pages/Profile/Partials/TransactionColumns';

export default function TransactionScreen({ auth, transactions }: PageProps<{ transactions: Transaction[] }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Transactions
                </h2>
            }
        >
            <Head title="Transactions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h2 className="text-xl font-semibold text-slate-950 mb-4">
                            Recent Transactions
                        </h2>

                        <DataTable<Transaction> columns={transactionColumns} data={transactions} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
