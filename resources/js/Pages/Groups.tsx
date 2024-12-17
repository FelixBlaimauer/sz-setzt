import { DataTable } from '@/Components/DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Group, GroupTeam } from '@/lib/types/Group';
import { groupColumns } from '@/Pages/Profile/Partials/GroupColumns';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface GroupsPageProps {
    groups: Group[];
}

export default function GroupsPage({
    groups,
    auth,
}: PageProps<GroupsPageProps>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gruppen
                </h2>
            }
        >
            <Head title="Home" />

            <div className="mt-4">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <Tabs defaultValue={groups[0].id.toString()}>
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
                                            { id: 'rank', desc: false }
                                        ]}
                                        striped
                                    />
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
