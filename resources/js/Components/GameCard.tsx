import { Team } from '@/lib/types/Team';
import { cn, formatOdds, OddFormat } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

export interface Game {
    id: string;
    played_at: string;
    duration: number;
    teams: Team[];
}

export interface GameCardProps {
    game: Game;
    isLive?: boolean;
    showScore: boolean;
    showOdds: boolean;
    oddFormat: OddFormat;
}

export default function GameCard({
    game,
    isLive,
    oddFormat = 'decimal',
    showOdds = true,
    showScore = true,
}: GameCardProps) {
    const [now, setNow] = useState<Dayjs>();

    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            setNow(dayjs());
        }, 1000);

        return () => clearInterval(interval);
    }, [isLive]);

    return (
        <div className="mx-4 mt-2 overflow-hidden rounded-lg bg-white shadow-md">
            {/*<div className="flex items-center justify-center border-b p-2">*/}
            {/*    <p className="font-mono text-4xl font-bold -tracking-widest text-slate-900">*/}
            {/*        {game.teams[0].goals.length ?? '0'}:*/}
            {/*        {game.teams[1].goals.length ?? '0'}*/}
            {/*    </p>*/}
            {/*</div>*/}
            <div
                className={cn(
                    'relative flex p-4',
                    'game-card-right',
                    // game.teams[1].goals.length > game.teams[0].goals.length
                    //     ? 'game-card-left'
                    //     : 'game-card-right',
                )}
            >
                <div
                    className={cn(
                        'flex grow flex-col justify-between gap-8',
                        isLive && 'gap-24',
                        showScore && 'gap-14',
                    )}
                >
                    <div>
                        <p className="hyphens-auto text-2xl font-medium leading-6 text-slate-800">
                            {game.teams[0].name}
                        </p>

                        {/*TODO: Special elements for games*/}
                        {/*<div className="mt-1 hidden items-center gap-0.5 text-sm">*/}
                        {/*    <Star className="h-4 w-4 fill-amber-400 stroke-none" />*/}
                        {/*    <p className="text-slate-500">Gruppensieger</p>*/}
                        {/*</div>*/}
                    </div>
                    <div className="flex w-fit flex-col items-center text-xl">
                        {showOdds && game.teams[0].odds && (
                            <span
                                className={cn(
                                    '-my-2 text-3xl font-medium',
                                    game.teams[0].odds > game.teams[1].odds
                                        ? 'text-navy-400'
                                        : 'text-greenqouise-400',
                                )}
                            >
                                {formatOdds(game.teams[0].odds, oddFormat)}
                            </span>
                        )}
                        <span className="text-slate-700">
                            {game.teams[0].stats.wins}W/
                            {game.teams[0].stats.ties}T/
                            {game.teams[0].stats.losses}L
                        </span>
                    </div>
                </div>
                <div className="flex grow flex-col-reverse items-end justify-between gap-8 text-right">
                    <div>
                        <p className="hyphens-auto text-2xl font-medium leading-6 text-slate-800">
                            {game.teams[1].name}
                        </p>
                    </div>
                    <div className="flex w-fit flex-col-reverse items-center text-xl">
                        {showOdds && game.teams[1].odds && (
                            <span
                                className={cn(
                                    '-my-2 text-3xl font-medium',
                                    game.teams[1].odds > game.teams[0].odds
                                        ? 'text-navy-400'
                                        : 'text-greenqouise-400',
                                )}
                            >
                                {formatOdds(game.teams[1].odds, oddFormat)}
                            </span>
                        )}
                        <span className="text-slate-700">
                            {game.teams[1].stats.wins}W/
                            {game.teams[1].stats.ties}T/
                            {game.teams[1].stats.losses}L
                        </span>
                    </div>
                </div>
                {showScore && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono">
                        <p className="text-6xl font-bold -tracking-widest text-slate-900">
                            {game.teams[0].goals.length ?? '0'}:
                            {game.teams[1].goals.length ?? '0'}
                        </p>
                        {isLive && now && (
                            <p className="-mt-1 text-xl font-medium text-slate-700">
                                {dayjs
                                    .duration(game.duration, 'minutes')
                                    .subtract(now.diff(dayjs(game.played_at)))
                                    .format('mm:ss')}
                            </p>
                        )}
                    </div>
                )}
            </div>
            {isLive ? (
                <Link
                    className="flex justify-center border border-transparent bg-gray-800 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                    href={route('games.show', game.id)}
                >
                    <span>Details</span>
                </Link>
            ) : (
                <div className="flex items-center justify-between border-t px-2 py-1">
                    <p className="ml-2 text-lg text-slate-600">
                        {dayjs(game.played_at).format('DD.MM - HH:mm')} Uhr
                    </p>
                    <Link
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                        href={route('games.show', game.id)}
                    >
                        Details
                    </Link>
                </div>
            )}
        </div>
    );
}
