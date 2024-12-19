import { Goal } from '@/lib/types/Goal';

export interface Team {
    id: string;
    name: string;
    odds?: number;
    goals?: Goal[];
    stats: {
        wins: number;
        ties: number;
        losses: number;
    };
}
