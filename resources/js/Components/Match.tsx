import { cn } from '@/lib/utils';
import { MatchComponentProps } from '@g-loot/react-tournament-brackets/dist/esm';
import { Link } from '@inertiajs/react';

export default function Match({
    match,
    onMatchClick,
    onPartyClick,
    onMouseEnter,
    onMouseLeave,
    topParty,
    bottomParty,
    topWon,
    bottomWon,
    topHovered,
    bottomHovered,
    topText,
    bottomText,
    connectorColor,
    computedStyles,
    teamNameFallback,
    resultFallback,
}: MatchComponentProps) {
    return (
        <div>
            <span className="ms-2 text-slate-600">{topText}</span>
            <Link
                className="flex flex-col justify-around rounded-lg border text-slate-600"
                href={route('games.show', match.id)}
            >
                <div
                    onMouseEnter={() => onMouseEnter(topParty.id)}
                    className={cn(
                        'flex justify-between px-2 py-1 transition',
                        topHovered && 'text-slate-950',
                        bottomHovered && 'bg-muted',
                    )}
                >
                    <div>{topParty.name || teamNameFallback}</div>
                    <div
                        className={cn(
                            topHovered && topWon && 'text-greenquoise-400',
                            bottomHovered && bottomWon && 'text-red-600',
                        )}
                    >
                        {topParty.resultText ?? resultFallback(topParty)}
                    </div>
                </div>
                <div className="border-b" />
                <div
                    onMouseEnter={() => onMouseEnter(bottomParty.id)}
                    className={cn(
                        'flex justify-between px-2 py-1 transition',
                        bottomHovered && 'text-slate-950',
                        topHovered && 'bg-muted',
                    )}
                >
                    <div>{bottomParty.name || teamNameFallback}</div>
                    <div
                        className={cn(
                            bottomHovered &&
                                bottomWon &&
                                'text-greenquoise-400',
                            topHovered && topWon && 'text-red-600',
                        )}
                    >
                        {bottomParty.resultText ?? resultFallback(bottomParty)}
                    </div>
                </div>
            </Link>
            <p className="text-center text-slate-600">{bottomText}</p>
        </div>
    );
}
