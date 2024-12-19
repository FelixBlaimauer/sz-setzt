import GameCard, { Game } from '@/Components/GameCard';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Bet } from '@/lib/types/Bet';
import { Team } from '@/lib/types/Team';
import { cn, formatOdds } from '@/lib/utils';
import { PageProps } from '@/types';
import { Radio, RadioGroup } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import {
    CandyCane,
    Circle,
    CircleCheck,
    CircleSlash,
    Coins,
} from 'lucide-react';
import { useState } from 'react';

interface PlaceBetFormData {
    amount: number;
    team: string;
    game: string;
}

export default function Details({
    auth,
    game,
    bets,
}: PageProps<{ game: Game; bets: Bet[] }>) {
    const [selectedTeam, setSelectedTeam] = useState<Team>();
    const [isLive] = useState(!!game.started_at && !game.ended_at);

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
            <Head
                title={`${game.name}: ${game.teams[0].name} vs. ${game.teams[1].name}`}
            />

            <div className="mt-4">
                <GameCard
                    game={game}
                    showScore={!!game.started_at}
                    isLive={isLive}
                    showDetails={false}
                    // onTimeChange={() => router.reload({ only: ['game'] })}
                />
            </div>

            {game.started_at && (
                <div className="mx-4 mt-4 rounded-lg bg-white p-4 shadow">
                    <h2 className="mb-2 text-center text-2xl font-semibold">
                        Tore
                    </h2>

                    <div className="flex flex-col flex-wrap justify-center border-b p-2 sm:flex-row">
                        <div className="sm:w-1/2 sm:min-w-[320px] sm:pe-2">
                            <p className="mb-2 flex justify-center gap-1 text-center text-2xl leading-6 sm:justify-start">
                                <span className="font-medium">
                                    {game.teams[0].name}:
                                </span>
                                {game.teams[0].goals.length}
                            </p>
                            <ul className="flex flex-col gap-2">
                                {game.teams[0].goals.length > 0 ? (
                                    game.teams[0].goals.map((goal) => (
                                        <li
                                            key={goal.id}
                                            className="flex items-center justify-between rounded-lg bg-slate-50/50 p-4"
                                        >
                                            <div className="flex items-center gap-4">
                                                <CandyCane className="size-6 text-rose-400" />
                                                <div className="leading-4 text-slate-800">
                                                    <p className="font-semibold text-slate-900">
                                                        {goal.player?.name ??
                                                            'Unbekannt'}
                                                    </p>
                                                    <p>
                                                        {goal.player
                                                            ?.shirt_number ??
                                                            '?'}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-lg">
                                                {goal.minute.toFixed(0)}'
                                            </p>
                                        </li>
                                    ))
                                ) : (
                                    <div className="flex items-center gap-1 rounded-lg bg-slate-50/40 p-4 text-slate-500">
                                        <CircleSlash className="size-4" />
                                        <p>Noch keine Tore</p>
                                    </div>
                                )}
                            </ul>
                        </div>
                        <div className="m-4 block border-b sm:hidden" />
                        <div className="sm:w-1/2 sm:min-w-[320px] sm:ps-2">
                            <p className="mb-2 flex justify-center gap-1 text-center text-2xl leading-6 sm:justify-start">
                                <span className="font-medium">
                                    {game.teams[1].name}:
                                </span>
                                {game.teams[1].goals.length}
                            </p>
                            <ul className="flex flex-col gap-2">
                                {game.teams[1].goals.length > 0 ? (
                                    game.teams[1].goals?.map((goal) => (
                                        <li
                                            key={goal.id}
                                            className="flex flex-row-reverse items-center justify-between rounded-lg bg-navy-400/5 p-4"
                                        >
                                            <div className="flex flex-row-reverse items-center gap-4">
                                                <CandyCane className="size-6 text-rose-400" />
                                                <div className="text-right leading-4 text-slate-800">
                                                    <p className="font-semibold text-slate-900">
                                                        {goal.player?.name ??
                                                            'Unbekannt'}
                                                    </p>
                                                    <p>
                                                        {goal.player
                                                            ?.shirt_number ??
                                                            '?'}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-lg">
                                                {goal.minute.toFixed(0)}'
                                            </p>
                                        </li>
                                    ))
                                ) : (
                                    <div className="flex items-center gap-1 rounded-lg bg-navy-400/5 p-4 text-slate-600">
                                        <CircleSlash className="size-4" />
                                        <p>Noch keine Tore</p>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {auth.user && (!game.started_at || bets?.length > 0) && (
                <div className="mx-4 mb-12 mt-4 rounded-lg bg-white p-4 shadow">
                    <h2 className="mb-2 text-center text-2xl font-semibold">
                        Wette plazieren
                    </h2>

                    {bets?.length > 0 && (
                        <div className="flex flex-col items-center gap-4 px-4 py-2 text-slate-600 sm:flex-row">
                            <CircleCheck className="size-8 text-greenquoise-400" />
                            <div className="leading-5">
                                <p>
                                    Du hast bereits eine Wette plaziert:{' '}
                                    <span className="font-medium">
                                        {bets[0].bettable.team.name}
                                    </span>
                                </p>
                                <div className="mt-2 flex items-center font-medium sm:mt-0">
                                    <span>{bets[0].amount}</span>
                                    <Coins className="ms-1 size-4 text-amber-500" />
                                </div>
                            </div>
                        </div>
                    )}
                    {!game.started_at && bets?.length < 1 && (
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
                                        className="group flex items-center justify-between border-b p-2 text-slate-200 transition last:border-0 hover:text-slate-600 data-[checked]:text-slate-950"
                                    >
                                        <div className="flex items-center gap-2">
                                            <CircleCheck className="hidden size-5 text-greenquoise-400 group-data-[checked]:block" />
                                            <Circle className="size-5 text-slate-200 group-hover:text-slate-600 group-data-[checked]:hidden" />
                                            <p>{team.name}</p>
                                        </div>

                                        <span
                                            className={cn(
                                                'font-medium',
                                                team.odds > 2
                                                    ? 'text-navy-400'
                                                    : 'text-greenquoise-400',
                                            )}
                                        >
                                            {team?.odds &&
                                                formatOdds(
                                                    team.odds,
                                                    'decimal',
                                                )}
                                        </span>
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
                                        className="mt-1 w-1 grow"
                                        placeholder="Wett Einsatz"
                                        type="number"
                                        min={0}
                                    />

                                    <p>Coins</p>
                                    <Coins className="-ms-2 size-6 min-w-6 text-amber-500" />
                                </div>

                                {data.amount > 0 && selectedTeam && (
                                    <p className="text-slate-600">
                                        Möglicher Gewinn:
                                        <span className="ms-1 font-medium">
                                            {(
                                                data.amount * selectedTeam?.odds
                                            ).toFixed(0)}
                                        </span>
                                    </p>
                                )}

                                <InputError
                                    message={errors.game}
                                    className="mt-1"
                                />
                                <InputError
                                    message={errors.amount}
                                    className="mt-1"
                                />
                            </div>

                            <PrimaryButton
                                disabled={
                                    !selectedTeam ||
                                    data.amount < 1 ||
                                    processing
                                }
                                className="flex w-full justify-center"
                            >
                                <span className="text-sm">Wette plazieren</span>
                            </PrimaryButton>
                        </form>
                    )}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
