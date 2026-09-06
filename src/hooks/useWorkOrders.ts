import { apis } from "@/api";
import { WorkOrdersRequest } from "@/api/models/WorkOrderModel";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

export function useWorkOrders({
  status,
  q,
}: Pick<WorkOrdersRequest, "status" | "q">) {
  return useInfiniteQuery({
    queryKey: ["work-orders", { status, q }],
    queryFn: ({ pageParam, signal }) =>
      apis.getWorkOrders({
        cursor: pageParam,
        status: status ?? undefined,
        q: q || undefined,
        signal,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    placeholderData: keepPreviousData,
  });
}
