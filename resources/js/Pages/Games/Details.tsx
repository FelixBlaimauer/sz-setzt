import GameCard, { Game } from '@/Components/GameCard';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Team } from '@/lib/types/Team';
import { PageProps } from '@/types';
import { Radio, RadioGroup } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { CandyCane, Circle, CircleCheck, Coins } from 'lucide-react';
import { useState } from 'react';

interface PlaceBetFormData {
    amount: number;
    team: string;
    game: string;
}

export default function Details({ auth, game }: PageProps<{ game: Game }>) {
    const [selectedTeam, setSelectedTeam] = useState<Team>();

    const {
        data,
        setData,
        post: create,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm<PlaceBetFormData>({
        game: game.id,
        team: selectedTeam?.id,
        amount: 0,
    });

    const createBet = (e) => {
        e.preventDefault();

        create(route('bet.game.store'), {
            preserveScroll: true,
            onSuccess: () => clearErrors(),
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-semibold">Spiel Details</h2>}
        >
            <Head title={`${game.teams[0].name} vs. ${game.teams[1].name}`} />

            <div className="mt-4">
                <GameCard
                    game={game}
                    showScore={true}
                    isLive={true}
                    showDetails={false}
                />
            </div>

            <div className="mx-4 mt-4 rounded-lg bg-white p-4 shadow">
                <h2 className="mb-2 text-center text-2xl font-semibold">
                    Tore
                </h2>

                <div className="flex flex-col flex-wrap justify-center border-b p-2 sm:flex-row">
                    <div className="sm:w-1/2 sm:min-w-[320px] sm:pe-2">
                        <p className="flex gap-1 text-center text-2xl">
                            <span className="font-semibold">
                                {game.teams[0].name}:
                            </span>
                            {game.teams[0].goals.length}
                        </p>
                        <ul className="flex flex-col gap-2">
                            {game.teams[0].goals.length > 0 &&
                                game.teams[0].goals.map((goal) => (
                                    <li
                                        key={goal.id}
                                        className="flex items-center gap-4 rounded-lg bg-slate-50/40 p-4"
                                    >
                                        <CandyCane className="size-6 text-rose-400" />
                                        <div className="leading-4 text-slate-800">
                                            <p>{goal.minute}'</p>
                                            <p className="font-semibold text-slate-900">
                                                {goal.player}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="m-4 block border-b sm:hidden" />
                    <div className="sm:w-1/2 sm:min-w-[320px] sm:ps-2">
                        <p className="flex gap-1 text-center text-2xl">
                            <span className="font-semibold">
                                {game.teams[1].name}:
                            </span>
                            {game.teams[1].goals.length}
                        </p>
                        <ul className="flex flex-col gap-2">
                            {game.teams[1].goals.length > 0 &&
                                game.teams[1].goals?.map((goal) => (
                                    <li
                                        key={goal.id}
                                        className="flex flex-row-reverse items-center gap-4 rounded-lg bg-navy-400/5 p-4"
                                    >
                                        <CandyCane className="size-6 text-rose-400" />
                                        <div className="text-right leading-4 text-slate-800">
                                            <p>{goal.minute}'</p>
                                            <p className="font-semibold text-slate-900">
                                                {goal.player}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>

            {auth.user && (
                <div className="mx-4 mt-4 rounded-lg bg-white p-4 shadow">
                    <h2 className="mb-2 text-center text-2xl font-semibold">
                        Wette plazieren
                    </h2>

                    <form className="space-y-2" onSubmit={createBet}>
                        <RadioGroup
                            by="name"
                            value={selectedTeam}
                            onChange={(e) => {
                                setSelectedTeam(e);
                                setData('team', e.id);
                            }}
                            className="overflow-hidden rounded-lg border text-slate-600"
                        >
                            {game.teams.map((team) => (
                                <Radio
                                    key={team.id}
                                    value={team}
                                    className="group flex items-center gap-2 border-b p-2 text-slate-200 transition last:border-0 hover:text-slate-600 data-[checked]:text-slate-950"
                                >
                                    <CircleCheck className="hidden size-5 text-greenquoise-400 group-data-[checked]:block" />
                                    <Circle className="size-5 text-slate-200 group-hover:text-slate-600 group-data-[checked]:hidden" />
                                    <p>{team.name}</p>
                                </Radio>
                            ))}
                        </RadioGroup>

                        <div>
                            <InputLabel
                                htmlFor="bet-amount"
                                value="Einsatz"
                                className="sr-only"
                            />

                            <div className="flex items-center gap-4 pr-4">
                                <TextInput
                                    id="bet-amount"
                                    name="bet-amount"
                                    onChange={(e) => {
                                        setData('amount', e.target.value);
                                        clearErrors('amount');
                                    }}
                                    value={data.amount}
                                    className="mt-1 grow"
                                    placeholder="Wett Einsatz"
                                />

                                <p>Coins</p>
                                <Coins className="-ms-2 size-6 min-w-6 text-amber-500" />
                            </div>

                            <InputError
                                message={errors.amount}
                                className="mt-1"
                            />
                        </div>

                        <PrimaryButton
                            disabled={!selectedTeam}
                            className="flex w-full justify-center"
                        >
                            <span className="text-sm">Wette plazieren</span>
                        </PrimaryButton>
                    </form>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
