import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { QRCodeSVG } from 'qrcode.react';
import { PageProps } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';

export default function Deposit({
    auth,
    depositUrl,
}: PageProps<{ depositUrl: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Deposit
                </h2>
            }
        >
            <Head title="Deposit" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h2 className="text-xl font-semibold">
                            Your Deposit Information
                        </h2>
                        <p>
                            Please use the following information to deposit
                            funds into your account.
                        </p>
                        {auth?.user ? (
                            <Tabs className="mt-4" defaultValue="qrcode">
                                <TabsList>
                                    <TabsTrigger value="qrcode">
                                        QR Code
                                    </TabsTrigger>
                                    <TabsTrigger value="url">URL</TabsTrigger>
                                </TabsList>
                                <TabsContent value="qrcode">
                                    <QRCodeSVG
                                        className="ml-1"
                                        value={depositUrl}
                                    />
                                </TabsContent>
                                <TabsContent value="url">
                                    <Link
                                        href={depositUrl}
                                        className="text-blue-500 underline"
                                    >
                                        {depositUrl}
                                    </Link>
                                </TabsContent>
                            </Tabs>
                        ) : (
                            <p className="text-gray-600">
                                Please log in to access this page!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
