import { create } from "zustand";
import type { Job } from "../types/job";

interface JobStore {
  jobs: Job[];
  addJob: (
    job: Omit<Job, "id" | "createdAt" | "updatedAt" | "history">
  ) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  updateJobStatus: (id: string, status: Job["status"], note?: string) => void;
}

// Mock data
const initialJobs: Job[] = [
  {
    id: "JOB-001",
    customer: {
      name: "Reiden",
      phone: "(555) 123-4567",
      email: "example@gmail.com",
    },
    vehicle: {
      make: "Toyota",
      model: "Camry",
      year: "2020",
      vin: "1HGCM82633A123456",
      licensePlate: "ABC-123",
    },
    service: {
      type: "maintenance",
      items: [
        {
          id: "1",
          name: "Oil Change",
          description: "Full synthetic oil change",
          quantity: 1,
          unitPrice: 49.99,
          total: 49.99,
        },
      ],
      estimatedCost: 49.99,
    },
    status: "in_progress",
    priority: "medium",
    technician: "1",
    createdAt: "2024-02-15T10:00:00Z",
    updatedAt: "2024-02-15T10:00:00Z",
    startDate: "2024-02-15T10:00:00Z",
    estimatedCompletion: "2024-02-15T12:00:00Z",
    notes: "Regular maintenance service",
    history: [
      {
        timestamp: "2024-02-15T10:00:00Z",
        action: "Job Created",
        user: "System",
      },
    ],
  },
  {
    id: "JOB-002",
    customer: {
      name: "MIKO",
      phone: "(555) 234-5678",
      email: "jane@example.com",
    },
    vehicle: {
      make: "Honda",
      model: "Civic",
      year: "2019",
      vin: "2HGES16575H123456",
      licensePlate: "XYZ-789",
    },
    service: {
      type: "repair",
      items: [
        {
          id: "1",
          name: "Brake Service",
          description: "Front brake pad replacement",
          quantity: 1,
          unitPrice: 199.99,
          total: 199.99,
        },
      ],
      estimatedCost: 199.99,
    },
    status: "pending",
    priority: "high",
    technician: "2",
    createdAt: "2024-02-14T15:00:00Z",
    updatedAt: "2024-02-14T15:00:00Z",
    startDate: "2024-02-14T15:00:00Z",
    estimatedCompletion: "2024-02-14T17:00:00Z",
    notes: "Customer reported squeaking noise",
    history: [
      {
        timestamp: "2024-02-14T15:00:00Z",
        action: "Job Created",
        user: "System",
      },
    ],
  },
];

let jobIdCounter = 3; // Start counter from the next job ID

export const useJobStore = create<JobStore>((set) => ({
  jobs: initialJobs,

  addJob: (job) =>
    set((state) => {
      const newJob: Job = {
        id: `JOB-${jobIdCounter++}`, // Incremental job ID
        ...job,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        history: [
          {
            timestamp: new Date().toISOString(),
            action: "Job Created",
            user: "System",
          },
        ],
      };
      return { jobs: [newJob, ...state.jobs] };
    }),

  updateJob: (id, updates) =>
    set((state) => {
      const now = new Date().toISOString();
      return {
        jobs: state.jobs.map((job) =>
          job.id === id
            ? {
                ...job,
                ...updates,
                updatedAt: now,
                history: [
                  ...job.history,
                  {
                    timestamp: now,
                    action: "Job Updated",
                    user: "System",
                  },
                ],
              }
            : job
        ),
      };
    }),

  deleteJob: (id) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== id),
    })),

  updateJobStatus: (id, status, note) =>
    set((state) => {
      const now = new Date().toISOString();
      return {
        jobs: state.jobs.map((job) =>
          job.id === id
            ? {
                ...job,
                status,
                updatedAt: now,
                history: [
                  ...job.history,
                  {
                    timestamp: now,
                    action: `Status changed to ${status}${
                      note ? `: ${note}` : ""
                    }`,
                    user: "System",
                  },
                ],
              }
            : job
        ),
      };
    }),
}));
