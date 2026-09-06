import { apis } from "@/api";
import { WorkOrdersRequest } from "@/api/models/WorkOrderModel";
import { queryClient } from "@/api/queryClient";
import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useCallback } from "react";

type WorkOrderPage = Awaited<ReturnType<typeof apis.getWorkOrders>>;

export const useWorkOrders = ({
  status,
  q,
}: Pick<WorkOrdersRequest, "status" | "q">) => {
  const queryKey = ["work-orders", { status, q }];

  const query = useInfiniteQuery({
    queryKey: queryKey,
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

  // method to reset all loaded pages to 1 page, to avoid refetching all loaded page like. 1, 2, 3, 4, ...
  const refreshFirstPage = useCallback(() => {
    queryClient.setQueryData<InfiniteData<WorkOrderPage, number>>(
      queryKey,
      (old) =>
        old
          ? {
              pages: old.pages.slice(0, 1),
              pageParams: old.pageParams.slice(0, 1),
            }
          : old,
    );
    return query.refetch();
  }, [queryClient, query.refetch, ...queryKey]);

  return { ...query, refreshFirstPage };
};
