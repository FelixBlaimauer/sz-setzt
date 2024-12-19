import { TransactionType } from '@/lib/types/Transaction';
import { cn } from '@/lib/utils';

const chipClasses = {
    [TransactionType.DEPOSIT]: {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
    },
    [TransactionType.WITHDRAW]: {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
    },
    [TransactionType.SPEND]: {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
    },
    [TransactionType.EARN]: {
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
    },
};

export default function TransactionChip({ type }: { type: TransactionType }) {
    return (
        <span
            className={cn(
                'rounded-full px-2 py-1 text-xs font-semibold leading-tight',
                chipClasses[type].bgColor,
                chipClasses[type].textColor,
            )}
        >
            {type}
        </span>
    );
}
