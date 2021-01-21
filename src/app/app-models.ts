export interface transactionRecords {
    houseNo: number;
    customerName: string;
    waterConsumption: number;
    amount: number;
}

export interface createTransactions {
    houseNo: number;
    customerName: string;
    waterConsumption: number;
    amount: number;
}

export interface Customers {
    houseNo: number;
    customerName: string;
    address: string;
    status: string;
}