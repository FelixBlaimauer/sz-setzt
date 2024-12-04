import { ColumnDef } from '@tanstack/react-table';

export interface Team {
    id: string;
    name: string;
}

export const columns: ColumnDef<Team>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
];
