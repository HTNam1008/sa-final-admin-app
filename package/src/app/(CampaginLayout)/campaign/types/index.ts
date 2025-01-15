// app/(DashboardLayout)/campaign/types/index.ts

export interface Campaign {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    status: 'ENDED' | 'NOT_ACCEPTED' | 'PENDING';
    initial: number;
    remaining: number;
    paid: boolean;
  }

export type CampaignStatus = 'ENDED' | 'NOT_ACCEPTED' | 'PENDING';