import { WorkOrder, WorkOrderStatus } from "../entities/WorkOrder";

export interface WorkOrdersRequest {
  cursor?: string;
  status?: WorkOrderStatus;
  q?: string;
  signal?: AbortSignal;
  limit?: number;
}

export interface WorkOrdersResponse {
  data: WorkOrder[];
  nextCursor: string | null;
}
