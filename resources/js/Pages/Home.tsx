import GameCard, { Game } from '@/Components/GameCard';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function Welcome({ auth, games }: PageProps<{ games: Game[] }>) {
    const [liveGames, setLiveGames] = useState<Game[]>([]);
    const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
    const [finishedGames, setFinishedGames] = useState<Game[]>([]);

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

        setLiveGames(liveGames);
        setUpcomingGames(upcomingGames);
        setFinishedGames(finishedGames);
    }, [games]);

    return (
        <>
            <Head title="Home | Weihnachtsturnier" />

            <nav className="fixed left-0 right-0 top-0 z-10 bg-white p-4 shadow-md">
                Navigation Placeholder
            </nav>

            {liveGames.length > 0 && (
                <>
                    <div className="mt-20 flex justify-center">
                        <h2 className="text-2xl font-semibold">
                            {liveGames.length > 1
                                ? 'Live Spiele'
                                : 'Live Spiel'}
                        </h2>
                        <div className="relative">
                            <div className="absolute aspect-square h-3 rounded-full bg-red-500" />
                            <div className="duration-1500 absolute aspect-square h-3 animate-ping rounded-full bg-red-400" />
                        </div>
                    </div>

                    {liveGames.map((game) => (
                        <GameCard
                            key={game.id}
                            game={game}
                            oddFormat="moneyline"
                            isLive
                        />
                    ))}
                </>
            )}

            <div className="mx-auto my-8 w-1/2 border" />

            <div className="-mt-2 flex justify-center">
                <h2 className="text-2xl font-medium">Nächste Spiele</h2>
            </div>

            {games.map((game) => (
                <GameCard key={game.id} game={game} oddFormat="moneyline" />
            ))}
        </>
    );
}
