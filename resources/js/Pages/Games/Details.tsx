import { PageProps } from '@/types';
import GameCard, { Game } from '@/Components/GameCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Details({ auth, game }: PageProps<{ game: Game }>) {
    useEffect(() => {
        console.log(game);
    }, [game]);

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-semibold">Spiel Details</h2>}
        >
            <Head title={`${game.teams[0].name} vs. ${game.teams[1].name}`} />

            <GameCard game={game} />

            <div className="mx-4 mt-4">
                <h2 className="text-center text-2xl font-semibold">
                    Wette plazieren
                </h2>


            </div>
        </AuthenticatedLayout>
    );
}
