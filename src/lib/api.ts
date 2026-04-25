import axios from "axios";
import { Campaign, Lead, Stats, LinkedInAuthResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for consistent data access
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || "An error occurred";
    return Promise.reject(new Error(message));
  }
);

export const api = {
  auth: {
    signup: (data: Record<string, unknown>) => apiClient.post("/auth/signup", data),
    login: (data: Record<string, unknown>) => apiClient.post("/auth/login", data),
  },
  campaigns: {
    list: (accountId: string): Promise<Campaign[]> => apiClient.get(`/campaigns`, { params: { accountId } }),
    get: (id: string): Promise<Campaign> => apiClient.get(`/campaigns/${id}`),
    create: (data: Record<string, unknown>): Promise<Campaign> => apiClient.post("/campaigns", data),
    updateStatus: (id: string, status: string): Promise<void> => apiClient.put(`/campaigns/${id}/status`, { status }),
    delete: (id: string): Promise<void> => apiClient.delete(`/campaigns/${id}`),
  },
  leads: {
    list: (campaignId: string): Promise<Lead[]> => apiClient.get(`/leads`, { params: { campaignId } }),
    add: (data: Record<string, unknown>): Promise<Lead> => apiClient.post("/leads", data),
  },
  stats: {
    get: (campaignId: string): Promise<Stats> => apiClient.get(`/stats`, { params: { campaignId } }),
  },
  account: {
    get: (accountId: string) => apiClient.get(`/account`, { params: { accountId } }),
  },
  agents: {
    list: (campaignId: string): Promise<{ agents: string[] }> => apiClient.get(`/agents`, { params: { campaignId } }),
    delete: (campaignId: string, sessionPath: string) => 
      apiClient.delete(`/agents`, { params: { campaignId, sessionPath } }),
  },
  uploadSession: (formData: FormData) => 
    apiClient.post("/upload-session", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  execution: {
    status: (requestId: string) => apiClient.get(`/execution/${requestId}`),
  },
  linkedin: {
    getAuth: (): Promise<LinkedInAuthResponse> => apiClient.get("/linkedin/auth"),
    startCapture: (): Promise<{ jobId: string }> => apiClient.post("/linkedin/capture"),
    getCaptureStatus: (jobId: string): Promise<{ 
      status: string; 
      message?: string; 
      error?: string; 
      profileName?: string;
      progress?: number;
    }> => apiClient.get("/linkedin/capture", { params: { jobId } }),
    removeAgent: (agentId: string): Promise<void> => apiClient.delete("/linkedin/auth", { params: { agentId } }),
  }
};
