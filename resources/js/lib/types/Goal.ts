import { Player } from '@/lib/types/Player';

export interface Goal {
    id: string;
    player: Player;
    minute: number;
}
