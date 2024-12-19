import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { AdminGame } from '@/lib/types/AdminGame';
import { Button } from '@headlessui/react';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';

interface GameColumnsProps {
    onEdit?: (game: AdminGame) => void;
    onDelete?: (game: AdminGame) => void;
}

const groupNames = ['A', 'B', 'C', 'D'];

export const getGameColumns = ({
    onEdit,
    onDelete,
}: GameColumnsProps): ColumnDef<AdminGame>[] => [
    {
        id: 'id',
        cell: ({ row }) => {
            const game = row.original;

            return (
                <Link
                    href={route('admin.game', game.id)}
                    className="text-blue-600 hover:underline"
                >
                    {game.id}
                </Link>
            );
        },
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        header: 'Planned At',
        accessorFn: ({ planned_at }) =>
            dayjs(planned_at).format('YYYY-MM-DD - HH:mm'),
    },
    {
        header: 'Duration',
        accessorKey: 'duration',
    },
    {
        header: 'Stage',
        accessorKey: 'stage',
    },
    {
        header: 'Group',
        accessorFn: ({ group_id }) => (group_id ? groupNames[group_id - 1] : 'N/A'),
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const game = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit?.(game)}>
                                <Pencil className="h-4 w-4 text-gray-800" />
                                Edit
                            </DropdownMenuItem>
                        )}
                        {onDelete && (
                            <DropdownMenuItem onClick={() => onDelete?.(game)}>
                                <Trash2 className="h-4 w-4 text-red-600" />
                                Delete
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
