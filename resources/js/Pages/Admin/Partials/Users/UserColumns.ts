import { User } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

export const userColumns: ColumnDef<User>[] = [
    {
        header: 'ID',
        accessorKey: 'id',
    },
    {
        header: 'Name',
        accessorKey: 'name',
    },
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Created',
        accessorFn: (user) =>
            dayjs(user.created_at).format('DD.MM.YYYY - HH:mm'),
    },
];
