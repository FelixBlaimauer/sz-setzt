import { AdminGame } from '@/lib/types/AdminGame';
import type { ColumnDef } from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/Components/ui/dropdown-menu';
import { Button } from '@headlessui/react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

interface GameColumnsProps {
    onEdit?: (game: AdminGame) => void;
    onDelete?: (game: AdminGame) => void;
}

export const getGameColumns = ({
    onEdit,
    onDelete,
}: GameColumnsProps): ColumnDef<AdminGame>[] => [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Name',
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
        }
    }
];
