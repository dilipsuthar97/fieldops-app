import { User } from "./User";

export const STATUSES = ["open", "in_progress", "blocked", "done"] as const;

export type WorkOrderStatus = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<WorkOrderStatus, string> = {
  open: "Open",
  in_progress: "In progress",
  blocked: "Blocked",
  done: "Done",
};

export interface Checklist {
  id: string;
  label: string;
  done: boolean;
}

export interface WorkOrder {
  id: string;
  reference: string;
  title: string;
  site: string;
  description: string;
  status: WorkOrderStatus;
  priority?: string;
  assigneeId: string | null;
  dueAt: string;
  checklist: Checklist[];
  createdAt: string;
  updatedAt: string;
  version: number;
  assignee: User | null;
}
