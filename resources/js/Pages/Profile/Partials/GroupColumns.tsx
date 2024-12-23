import { ColumnDef } from '@tanstack/react-table';
import { GroupTeam } from '@/lib/types/Group';

export const groupColumns: ColumnDef<GroupTeam>[] = [
    {
        accessorKey: 'rank',
        header: '#',
        enableSorting: true,
    },
    {
        accessorKey: 'name',
        header: 'Team',
    },
    {
        accessorKey: 'group_stats.points',
        header: 'P',
    },
    {
        accessorKey: 'group_stats.goalDifference',
        header: 'TD',
    },
    {
        accessorKey: 'group_stats.goals',
        header: 'T',
    },
];


export const advGroupColumns: ColumnDef<GroupTeam>[] = [
    {
        accessorKey: 'rank',
        header: '#',
        enableSorting: true,
    },
    {
        accessorKey: 'name',
        header: 'Team',
    },
    {
        accessorKey: 'adv_group_stats.points',
        header: 'P',
    },
    {
        accessorKey: 'adv_group_stats.goalDifference',
        header: 'TD',
    },
    {
        accessorKey: 'adv_group_stats.goals',
        header: 'T',
    },
];
