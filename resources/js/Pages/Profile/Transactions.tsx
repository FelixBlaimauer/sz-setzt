import { DataTable } from '@/Components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Transaction } from '@/lib/types/Transaction';
import { transactionColumns } from '@/Pages/Profile/Partials/TransactionColumns';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function TransactionScreen({
    auth,
    transactions,
}: PageProps<{ transactions: Transaction[] }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Transactions
                </h2>
            }
        >
            <Head title="Transactions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h2 className="mb-4 text-xl font-semibold text-slate-950">
                            Recent Transactions
                        </h2>

                        <DataTable<Transaction>
                            columns={transactionColumns}
                            data={transactions}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
