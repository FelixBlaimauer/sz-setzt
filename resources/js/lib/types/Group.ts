import { Team } from '@/lib/types/Team';

export interface Group {
    id: number;
    name: string;
    description: string;
    teams: GroupTeam[];
}

export interface GroupTeam extends Omit<Team, 'stats'> {
    rank: number;
    group_stats: {
        points: number;
        goalDifference: number;
        goals: number;
    };
}
