export interface Campaign {
  id: string;
  name: string;
  status: string;
  accountId: string;
  lastActive?: string;
  agents?: number;
  leads?: number;
  sent?: number;
  accepted?: number;
  progress?: number;
  createdAt?: string;
  updatedAt?: string;
  executionStatus?: string;
  settings?: {
    sendConnection: boolean;
    sendFirstMessage: boolean;
    sendFollowup: boolean;
  };
}

export interface Lead {
  id: string;
  campaignId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  linkedinUrl?: string;
  status?: string;
}

export interface Stats {
  totalLeads: number;
  statusCounts: Record<string, number>;
}

export interface Agent {
  id: string;
  addedAt: string;
  provider: "linkedin_oauth" | "playwright";
  expiresAt?: string | null;
  isExpired?: boolean;
  profile: {
    id: string;
    name: string;
    email: string;
    picture: string;
  };
}

export interface LinkedInAuthResponse {
  agents: Agent[];
  isProduction: boolean;
  playwrightDisabled: boolean;
}
