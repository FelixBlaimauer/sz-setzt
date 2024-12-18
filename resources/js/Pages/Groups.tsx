import { DataTable } from '@/Components/DataTable';
import { Game } from '@/Components/GameCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Group, GroupTeam } from '@/lib/types/Group';
import { groupColumns } from '@/Pages/Profile/Partials/GroupColumns';
import { PageProps } from '@/types';
import {
    Match,
    SingleEliminationBracket,
    SVGViewer,
} from '@g-loot/react-tournament-brackets/dist/esm';
import { Head } from '@inertiajs/react';
import useSize from '@react-hook/size';
import { useRef } from 'react';

interface GroupsPageProps {
    games: Game[];
    group_games: any;
    groups: Group[];
}

export default function GroupsPage({
    games,
    groups,
    group_games,
    auth,
}: PageProps<GroupsPageProps>) {
    const bracketContainer = useRef(null);
    const [width, height] = useSize(bracketContainer);

    console.log(group_games);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Standings
                </h2>
            }
        >
            <Head title="Home" />

            <div className="mx-auto mt-4 max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <h2 className="text-2xl font-semibold text-slate-950">
                        Gruppenphase
                    </h2>

                    <Tabs
                        defaultValue={groups[0].id.toString()}
                        className="mt-2"
                    >
                        <span className="me-2">Gruppe: </span>
                        <TabsList>
                            {groups.map((group) => (
                                <TabsTrigger
                                    key={group.id}
                                    value={group.id.toString()}
                                >
                                    {group.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {groups.map((group) => (
                            <TabsContent
                                key={group.id}
                                value={group.id.toString()}
                            >
                                <DataTable<GroupTeam>
                                    columns={groupColumns}
                                    data={group.teams}
                                    defaultSorting={[
                                        { id: 'rank', desc: false },
                                    ]}
                                    striped
                                />
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>

                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <h2 className="text-2xl font-semibold text-slate-950">
                        Bracket
                    </h2>

                    <div
                        ref={bracketContainer}
                        className="mx-auto mt-2 h-[720px]"
                    >
                        <SingleEliminationBracket
                            matchComponent={Match}
                            matches={group_games}
                            // matches={[
                            //     {
                            //         id: 0,
                            //         name: 'Semi',
                            //         nextMatchId: 1,
                            //         tournamentRoundText: '3',
                            //         startTime: '2024-12-18',
                            //         state: 'PLAYED',
                            //         participants: [
                            //             {
                            //                 id: '1',
                            //                 resultText: 'LOST',
                            //                 isWinner: false,
                            //                 status: null,
                            //                 name: 'Team 1',
                            //             },
                            //             {
                            //                 id: '2',
                            //                 resultText: 'WON',
                            //                 isWinner: true,
                            //                 status: null,
                            //                 name: 'Team 2',
                            //             },
                            //         ],
                            //     },
                            //     {
                            //         id: 1,
                            //         name: 'Final',
                            //         nextMatchId: null,
                            //         tournamentRoundText: '4',
                            //         startTime: '2024-12-18',
                            //         state: 'PLAYED',
                            //         participants: [
                            //             {
                            //                 id: '1',
                            //                 resultText: 'LOST',
                            //                 isWinner: false,
                            //                 status: null,
                            //                 name: 'Team 1',
                            //             },
                            //             {
                            //                 id: '2',
                            //                 resultText: 'WON',
                            //                 isWinner: true,
                            //                 status: null,
                            //                 name: 'Team 2',
                            //             },
                            //         ],
                            //     },
                            // ]}
                            svgWrapper={({ children, ...props }) => (
                                <SVGViewer
                                    width={width}
                                    height={height}
                                    {...props}
                                >
                                    {children}
                                </SVGViewer>
                            )}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
