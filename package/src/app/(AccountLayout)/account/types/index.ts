// app/(DashboardLayout)/campaign/types/index.ts

export interface Account {
    id: string;
    username: string;
    fullname: string;
    email: string;
    password: string;
    phone: string;
    role: AccountRole;
    active:boolean;
}

export type AccountRole = 'User' | 'ADMIN' | 'Counterpart';