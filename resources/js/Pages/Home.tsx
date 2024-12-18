import GameCard, { Game } from '@/Components/GameCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ODD_FORMATS, OddFormat } from '@/lib/utils';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function Home({ auth, games }: PageProps<{ games: Game[] }>) {
    const [liveGames, setLiveGames] = useState<Game[]>([]);
    const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
    const [finishedGames, setFinishedGames] = useState<Game[]>([]);

    const [oddFormat, setOddFormat] = useState<OddFormat>('decimal');

    useEffect(() => {
        const now = dayjs();

        const liveGames: Game[] = [];
        const upcomingGames: Game[] = [];
        const finishedGames: Game[] = [];

        games.forEach((game) => {
            const playedAt = dayjs(game.played_at);
            const endsAt = playedAt.add(game.duration, 'minutes');

            if (now.isAfter(endsAt)) {
                finishedGames.push(game);
            } else if (now.isBefore(playedAt)) {
                upcomingGames.push(game);
            } else {
                liveGames.push(game);
            }
        });

        liveGames.sort((a, b) => dayjs(a.played_at).diff(dayjs(b.played_at)));
        upcomingGames.sort((a, b) =>
            dayjs(a.played_at).diff(dayjs(b.played_at)),
        );
        finishedGames.sort((a, b) =>
            dayjs(b.played_at).diff(dayjs(a.played_at)),
        );

        setLiveGames(liveGames);
        setUpcomingGames(upcomingGames);
        setFinishedGames(finishedGames);
    }, [games]);

    return (
        <AuthenticatedLayout>
            <Head title="Games" />

            <div className="mt-4">
                {auth.user && (
                    <div className="mx-4 mb-6 flex items-center justify-between gap-4 rounded-lg bg-white p-2 shadow-sm sm:w-fit">
                        <p className="ml-1 hidden text-lg text-slate-950 sm:block">
                            Settings:
                        </p>
                        <div className="flex w-full items-center justify-between rounded-lg bg-muted text-muted-foreground sm:w-fit sm:justify-center">
                            {ODD_FORMATS.map((format) => (
                                <button
                                    key={format}
                                    data-active={oddFormat === format}
                                    className="rounded-lg px-2 py-1 capitalize transition data-[active=true]:bg-white data-[active=true]:text-slate-950 data-[active=true]:shadow"
                                    onClick={() => setOddFormat(format)}
                                >
                                    {format}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {liveGames.length > 0 && (
                    <>
                        <div className="flex justify-center">
                            <h2 className="text-2xl font-semibold">
                                {liveGames.length > 1
                                    ? 'Live Spiele'
                                    : 'Live Spiel'}
                            </h2>
                            <div className="relative">
                                <div className="absolute aspect-square h-3 animate-blink rounded-full bg-red-500" />
                                <div className="absolute aspect-square h-3 animate-ping rounded-full bg-red-400 delay-700 duration-1000" />
                            </div>
                        </div>

                        <div className="mt-2 space-y-4">
                            {liveGames.map((game) => (
                                <GameCard
                                    key={game.id}
                                    game={game}
                                    oddFormat={oddFormat}
                                    isLive
                                />
                            ))}
                        </div>

                        <div className="mx-auto my-8 w-1/2 border" />
                    </>
                )}

                {upcomingGames.length > 0 && (
                    <>
                        <div className="-mt-2 flex justify-center">
                            <h2 className="text-2xl font-medium">
                                Nächste Spiele
                            </h2>
                        </div>

                        <div className="mt-4 space-y-4">
                            {upcomingGames.map((game) => (
                                <GameCard
                                    key={game.id}
                                    game={game}
                                    oddFormat={oddFormat}
                                    showScore={false}
                                    showTime
                                />
                            ))}
                        </div>

                        <div className="mx-auto my-8 w-1/2 border" />
                    </>
                )}

                {finishedGames.length > 0 && (
                    <>
                        <div className="-mt-4 flex justify-center">
                            <h2 className="text-2xl font-medium">
                                Vergangene Spiele
                            </h2>
                        </div>

                        <div className="mt-4 space-y-4">
                            {finishedGames.map((game) => (
                                <GameCard
                                    key={game.id}
                                    game={game}
                                    showOdds={false}
                                    oddFormat={oddFormat}
                                />
                            ))}
                        </div>

                        <div className="mx-auto my-8 w-1/2 border" />
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
