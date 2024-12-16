import { BetType } from '@/lib/types/Bet';
import { cn } from '@/lib/utils';
import { Dices, Trophy } from 'lucide-react';

const chipClasses = {
    [BetType.GAME_BET]: {
        icon: <Dices className="size-4" />,
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        text: 'Game',
    },
    [BetType.TOURNAMENT_BET]: {
        icon: <Trophy className="size-4" />,
        bgColor: 'bg-amber-100',
        textColor: 'text-amber-800',
        text: 'Turnier',
    },
};

export default function BetChip({ type }: { type: BetType }) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold uppercase leading-tight',
                chipClasses[type].bgColor,
                chipClasses[type].textColor,
            )}
        >
            {chipClasses[type].icon}
            {chipClasses[type].text}
        </span>
    );
}
