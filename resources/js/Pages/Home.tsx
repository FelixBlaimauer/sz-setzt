import GameCard, { Game } from '@/Components/GameCard';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { cn, ODD_FORMATS, OddFormat } from '@/lib/utils';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Welcome({ auth, games }: PageProps<{ games: Game[] }>) {
    const [liveGames, setLiveGames] = useState<Game[]>([]);
    const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
    const [finishedGames, setFinishedGames] = useState<Game[]>([]);

    const [oddFormat, setOddFormat] = useState<OddFormat>('decimal');

    const [refreshRotate, setRefreshRotate] = useState<boolean>(false);

    const refresh = () => {
        setRefreshRotate(!refreshRotate);
        router.reload();
    };

    useEffect(() => {
        console.log(games);

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
            dayjs(a.played_at).diff(dayjs(b.played_at)),
        );

        setLiveGames(liveGames);
        setUpcomingGames(upcomingGames);
        setFinishedGames(finishedGames);
    }, [games]);

    return (
        <AuthenticatedLayout>
            <Head title="Home | Weihnachtsturnier" />

            <PrimaryButton
                className="fixed bottom-4 right-4 z-10 aspect-square transition-transform"
                onClick={refresh}
            >
                <RefreshCw
                    className={cn(
                        'h-4 w-4 transition-transform',
                        refreshRotate && 'rotate-180',
                    )}
                />
            </PrimaryButton>

            <div className="mt-4">
                <div className="mx-4 mb-6 flex items-center justify-between gap-4 rounded-lg bg-white p-2 shadow-sm sm:w-fit">
                    <p className="ml-1 text-lg text-slate-950">Settings:</p>
                    <div className="flex w-fit items-center justify-center rounded-lg bg-muted text-muted-foreground">
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
                {liveGames.length > 0 && (
                    <>
                        <div className="flex justify-center">
                            <h2 className="text-2xl font-semibold">
                                {liveGames.length > 1
                                    ? 'Live Spiele'
                                    : 'Live Spiel'}
                            </h2>
                            <div className="relative">
                                <div className="animate-blink absolute aspect-square h-3 rounded-full bg-red-500" />
                                <div className="absolute aspect-square h-3 animate-ping rounded-full bg-red-400 delay-700 duration-1000" />
                            </div>
                        </div>

                        {liveGames.map((game) => (
                            <GameCard
                                key={game.id}
                                game={game}
                                oddFormat={oddFormat}
                                isLive
                            />
                        ))}

                        <div className="mx-auto my-8 w-1/2 border" />
                    </>
                )}

                {upcomingGames.length > 0 && (
                    <>
                        <div className="-mt-4 flex justify-center">
                            <h2 className="text-2xl font-medium">
                                Nächste Spiele
                            </h2>
                        </div>

                        {upcomingGames.map((game) => (
                            <GameCard
                                key={game.id}
                                game={game}
                                oddFormat={oddFormat}
                                showTime
                            />
                        ))}

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

                        {finishedGames.map((game) => (
                            <GameCard
                                key={game.id}
                                game={game}
                                oddFormat={oddFormat}
                            />
                        ))}

                        <div className="mx-auto my-8 w-1/2 border" />
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
