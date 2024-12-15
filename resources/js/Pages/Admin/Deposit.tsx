import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DepositFormData {
    amount: number;
}

export default function Deposit({
    user
}: PageProps<{ user: User }>) {
    const {
        data,
        setData,
        post: create,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm<DepositFormData>({
        amount: 0,
        user_id: user?.id,
    });

    const closeDepositCreation = () => {
        clearErrors();
        reset();
    };

    const createDeposit = (e) => {
        e.preventDefault();

        create(route('transaction.store'), {
            preserveScroll: true,
            onSuccess: () => closeDepositCreation(),
            onFinish: () => reset(),
        });
    };

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Deposit
                </h2>
            }
        >
            <Head title="Admin | Deposit" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div
                        className={cn(
                            'bg-white p-4 shadow sm:rounded-lg sm:p-8',
                            user?.id ? 'text-gray-600' : 'text-slate-200',
                        )}
                    >
                        <h2 className="text-xl text-slate-950">
                            Manage Transaction
                        </h2>
                        <p>
                            <span className="font-medium">Name: </span>
                            {user?.name}
                        </p>
                        <p>
                            <span className="font-medium">Email: </span>
                            {user?.email}
                        </p>
                        <p>
                            <span className="font-medium">Id: </span>
                            {user?.id}
                        </p>
                        <p>
                            <span className="font-medium">Balance: </span>
                            {user?.id && user?.balance}
                        </p>

                        <form
                            className="mt-2 max-w-sm"
                            onSubmit={createDeposit}
                        >
                            <InputLabel
                                htmlFor="deposit-amount"
                                value="Deposit Amount"
                                className="sr-only"
                            />

                            <TextInput
                                id="deposit-amount"
                                name="deposit-amount"
                                onChange={(e) => {
                                    setData('amount', e.target.value);
                                }}
                                value={data.amount}
                                className="mt-1 block w-full"
                                placeholder="Deposit Amount"
                            />

                            <InputError
                                message={errors.amount}
                                className="mt-2"
                            />

                            <PrimaryButton
                                disabled={processing}
                                className="mt-2 w-full justify-center"
                            >
                                <span className="text-sm">Confirm Deposit</span>
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
