import { Game } from '@/Components/GameCard';
import { Team } from '@/lib/types/Team';

export enum BetType {
    GAME_BET = 'GAME_BET',
    TOURNAMENT_BET = 'TOURNAMENT_BET',
    'PLAYER_BET' = 'PLAYER_BET',
}

export interface BetBase {
    id: string;
    amount: string;
    created_at: string;
}

interface GameBetBase extends BetBase {
    type: BetType.GAME_BET;
    bettable: GameBet;
}

interface TournamentBetBase extends BetBase {
    type: BetType.TOURNAMENT_BET;
    bettable: TournamentBet;
}

export type Bet = GameBetBase | TournamentBetBase;

export interface GameBet {
    id: string;
    game: Game;
    team: Team;
}

export interface TournamentBet {
    id: string;
    team: Team;
}
