import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import {
    ArrowRightLeft,
    CircleUserRound,
    Coins,
    LogOut,
    Notebook,
    PiggyBank,
    RefreshCw,
    Shield,
} from 'lucide-react';
import { PropsWithChildren, ReactNode, useState } from 'react';

type Role = 'admin' | 'guest';

interface User {
    id: string;
    name: string;
    email: string;
    roles: Role[];
}

interface NavRoute {
    title: string;
    name: string;
}

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user satisfies User | null;

    const navRoutes: NavRoute[] = [
        { title: 'Dashboard', name: 'dashboard' },
        { title: 'Games', name: 'games.index' },
    ];

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [refreshRotate, setRefreshRotate] = useState<boolean>(false);

    const refresh = () => {
        setRefreshRotate(!refreshRotate);
        router.reload();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {navRoutes.map((navRoute) => (
                                    <NavLink
                                        key={navRoute.name}
                                        href={route(navRoute.name)}
                                        active={route().current(navRoute.name)}
                                    >
                                        {navRoute.title}
                                    </NavLink>
                                ))}
                                {user?.roles.includes('admin') && (
                                    <>
                                        {/*<div className="py-4 pl-4 text-gray-500">*/}
                                        {/*    <div className="flex h-full items-center border-l-2 pl-2" />*/}
                                        {/*</div>*/}
                                        <NavLink
                                            href={route('admin.index')}
                                            active={route().current(
                                                'admin.index',
                                            )}
                                            className="items-center gap-1"
                                        >
                                            <Shield className="h-4 w-4" />
                                            Admin
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        {user ? (
                            <>
                                <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                    {user && (
                                        <Link
                                            href={route('profile.deposit')}
                                            className="group mx-4 flex items-center gap-2 text-gray-500 transition hover:text-gray-800"
                                        >
                                            <p>{user.balance}</p>
                                            <Coins className="h-5 w-5 transition group-hover:text-amber-500" />
                                        </Link>
                                    )}

                                    <div className="relative ms-3">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                    >
                                                        {user?.name}

                                                        <svg
                                                            className="-me-0.5 ms-1 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route('profile.edit')}
                                                    className="flex items-center gap-2"
                                                >
                                                    <CircleUserRound className="h-4 w-4" />
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        'profile.deposit',
                                                    )}
                                                    className="flex items-center gap-2"
                                                >
                                                    <PiggyBank className="h-4 w-4" />
                                                    Deposit
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route(
                                                        'profile.transactions',
                                                    )}
                                                    className="flex items-center gap-2"
                                                >
                                                    <ArrowRightLeft className="h-4 w-4" />
                                                    Transactions
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('profile.bets')}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Notebook className="size-4" />
                                                    Wetten
                                                </Dropdown.Link>
                                                <div className="my-1 border-t"></div>
                                                <Dropdown.Link
                                                    href={route('logout')}
                                                    className="flex items-center gap-2"
                                                    method="post"
                                                    as="button"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className="-me-2 flex items-center sm:hidden">
                                    {user && (
                                        <Link
                                            href={route('profile.deposit')}
                                            className="group mx-4 flex items-center gap-2 text-gray-500 transition hover:text-gray-800"
                                        >
                                            <p>{user.balance}</p>
                                            <Coins className="h-5 w-5 transition group-hover:text-amber-500" />
                                        </Link>
                                    )}

                                    <button
                                        onClick={() =>
                                            setShowingNavigationDropdown(
                                                (previousState) =>
                                                    !previousState,
                                            )
                                        }
                                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                                    >
                                        <svg
                                            className="h-6 w-6"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                className={
                                                    !showingNavigationDropdown
                                                        ? 'inline-flex'
                                                        : 'hidden'
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={
                                                    showingNavigationDropdown
                                                        ? 'inline-flex'
                                                        : 'hidden'
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div>
                                <Link
                                    href={route('login')}
                                    className="flex h-full items-center gap-1 text-slate-600 transition hover:text-slate-800"
                                >
                                    <CircleUserRound className="h-4 w-4" />
                                    Log In
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        {navRoutes.map((navRoute) => (
                            <ResponsiveNavLink
                                key={navRoute.name}
                                href={route(navRoute.name)}
                                active={route().current(navRoute.name)}
                            >
                                {navRoute.title}
                            </ResponsiveNavLink>
                        ))}
                        {user?.roles.includes('admin') && (
                            <ResponsiveNavLink
                                href={route('admin.index')}
                                active={route().current('admin.index')}
                                className="flex items-center gap-2"
                            >
                                <Shield className="h-4 w-4" />
                                Admin
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-2">
                        {user ? (
                            <>
                                <div className="px-4">
                                    <div className="text-base font-medium text-gray-800">
                                        {user?.name}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {user?.email}
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink
                                        href={route('profile.edit')}
                                        className="items-center gap-2"
                                    >
                                        <CircleUserRound className="h-4 w-4" />
                                        Profile
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route('profile.deposit')}
                                        className="items-center gap-2"
                                    >
                                        <PiggyBank className="h-4 w-4" />
                                        Deposit
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route('profile.transactions')}
                                        className="items-center gap-2"
                                    >
                                        <ArrowRightLeft className="h-4 w-4" />
                                        Transactions
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route('profile.bets')}
                                        className="items-center gap-2"
                                    >
                                        <Notebook className="size-4" />
                                        Wetten
                                    </ResponsiveNavLink>
                                    <div className="border-t" />
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                        className="items-center gap-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </>
                        ) : (
                            <ResponsiveNavLink href={route('login')}>
                                Log In
                            </ResponsiveNavLink>
                        )}
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

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

            <main className="mx-auto max-w-7xl">{children}</main>
        </div>
    );
}
