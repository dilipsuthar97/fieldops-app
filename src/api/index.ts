import { apiEndpoints } from "./apiEndpoints";
import { apiFetch } from "./client";
import { WorkOrdersRequest, WorkOrdersResponse } from "./models/WorkOrderModel";

/** The endpoint accepts 1–50 and defaults to 20. */
export const PAGE_SIZE = 20;

class APIs {
  async getWorkOrders(request: WorkOrdersRequest) {
    try {
      const response = await apiFetch<WorkOrdersResponse, WorkOrdersRequest>({
        path: apiEndpoints.URL_WORK_ORDERS,
        method: "GET",
        params: { limit: PAGE_SIZE, ...request },
      });
      return response;
    } catch (error) {
      console.log("get shared documents error: ", error);
      throw error;
    }
  }
}

const apis = new APIs();

export { apis };
