import { DataTable } from '@/Components/DataTable';
import Match from '@/Components/Match';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Group, GroupTeam } from '@/lib/types/Group';
import { advGroupColumns, groupColumns } from '@/Pages/Profile/Partials/GroupColumns';
import { PageProps } from '@/types';
import {
    MatchType,
    SingleEliminationBracket,
    SVGViewer,
} from '@g-loot/react-tournament-brackets/dist/esm';
import { Head } from '@inertiajs/react';
import useSize from '@react-hook/size';
import { useRef } from 'react';

interface GroupsPageProps {
    matches: MatchType[];
    groups: Group[];
    adv_groups: Group[];
}

export default function GroupsPage({
    groups,
    matches,
    adv_groups,
    auth,
}: PageProps<GroupsPageProps>) {
    const bracketContainer = useRef(null);
    const [width, height] = useSize(bracketContainer);

    // console.log('matches', matches);
    // console.log('groups', groups);
    // console.log('g', adv_groups);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Standings
                </h2>
            }
        >
            <Head title="Standings" />

            <div className="mx-auto mt-4 max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <h2 className="text-2xl font-semibold text-slate-950">
                        Freitag Gruppen
                    </h2>

                    <Tabs
                        defaultValue={adv_groups[0].id.toString()}
                        className="mt-2"
                    >
                        <span className="me-2">Gruppe: </span>
                        <TabsList>
                            {adv_groups.map((group) => (
                                <TabsTrigger
                                    key={group.id}
                                    value={group.id.toString()}
                                >
                                    {group.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {adv_groups.map((group) => (
                            <TabsContent
                                key={group.id}
                                value={group.id.toString()}
                            >
                                <DataTable<GroupTeam>
                                    columns={advGroupColumns}
                                    data={group.advanced}
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
                        Gruppenphase
                    </h2>

                    <Tabs
                        defaultValue={groups[0].id.toString()}
                        className="mt-2"
                    >
                        <span className="me-2">Gruppe: </span>
                        <TabsList>
                            {groups.map(
                                (group) =>
                                    group.teams.length > 0 && (
                                        <TabsTrigger
                                            key={group.id}
                                            value={group.id.toString()}
                                        >
                                            {group.name}
                                        </TabsTrigger>
                                    ),
                            )}
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
                            matches={matches}
                            options={{
                                style: {
                                    roundHeader: {
                                        isShown: false,
                                        fontColor: '#111',
                                        fontFamily: 'Kanit',
                                    },
                                    connectorColor: '#D7D7DC',
                                    connectorColorHighlight: '#34343C',
                                },
                            }}
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
