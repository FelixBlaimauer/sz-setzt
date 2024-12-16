import { Transaction } from '@/lib/types/Transaction';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import TransactionChip from '@/Pages/Profile/Partials/TransactionChip';
import { Button } from '@headlessui/react';
import { ArrowUpDown } from 'lucide-react';

// TODO: fix sorting
export const transactionColumns: ColumnDef<Transaction>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'amount',
        sortingFn: (a, b) => Math.abs(a.original.amount) - Math.abs(b.original.amount),
        header: ({ column }) => {
            return (
                <Button
                    className="flex items-center gap-1"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Amount
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        }
    },
    {
        id: 'type',
        header: ({ column }) => {
            return (
                <Button
                    className="flex items-center gap-1"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Type
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const transaction = row.original;

            return <TransactionChip type={transaction.type} />;
        }
    },
    {
        id: 'created_at',
        accessorFn: (transaction) =>
            dayjs(transaction.created_at).format('DD.MM.YYYY - HH:mm:ss'),
        sortingFn: (a, b) =>
            dayjs(a.original.created_at).diff(b.original.created_at),
        header: ({ column }) => {
            return (
                <Button
                    className="flex items-center gap-1"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Date
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
    },
];
