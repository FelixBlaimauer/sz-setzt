import { TournamentStage } from '@/Components/GameCard';

export interface AdminGame {
    id: string;
    name: string;
    planned_at: string;
    duration: number;
    group_id?: number;
    stage: TournamentStage;
    team_a_id?: string;
    team_b_id?: string;
}
