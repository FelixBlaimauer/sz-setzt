export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAW = 'WITHDRAW',
    SPEND = 'SPEND',
    EARN = 'EARN',
}

export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    created_at: string;
}
