import { Bet, BetType } from '@/lib/types/Bet';
import BetChip from '@/Pages/Profile/Partials/BetChip';
import { Button } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ArrowUpDown } from 'lucide-react';

export const betsColumns: ColumnDef<Bet>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'amount',
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
        },
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
            const bet = row.original;

            return <BetChip type={bet.type} />;
        },
    },
    {
        id: 'created_at',
        accessorFn: (bet) =>
            dayjs(bet.created_at).format('DD.MM.YYYY - HH:mm:ss'),
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
    {
        header: 'Prediction',
        cell: ({ row }) => {
            const bet = row.original;

            if (bet.type === BetType.GAME_BET) {
                return (
                    <div className="text-slate-950">
                        <Link
                            className="group hover:text-navy-400 hover:underline"
                            href={route('games.show', bet.bettable.game.id)}
                        >
                            <span className="mr-1 font-medium text-slate-600 group-hover:text-navy-400">
                                Game:
                            </span>
                            {bet.bettable.game.id}
                        </Link>
                        <p>
                            <span className="mr-1 font-medium text-slate-600 group-hover:text-navy-400">
                                Team:
                            </span>
                            {bet.bettable.team.name}
                        </p>
                    </div>
                );
            } else {
                return bet.bettable.team.name;
            }
        },
    },
];
