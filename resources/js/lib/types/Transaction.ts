export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAW = 'WITHDRAW',
    SPEND = 'SPEND',
}

export interface Transaction {
    id: string;
    amount: number;
    type: TransactionType;
    created_at: string;
}
