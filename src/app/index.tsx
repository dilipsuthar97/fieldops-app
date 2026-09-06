import { toApiError } from "@/api/client";
import { WorkOrder, WorkOrderStatus } from "@/api/entities/WorkOrder";
import Fab from "@/components/Fab";
import { EmptyState, ErrorState, ListFooter } from "@/components/ListStates";
import { SearchField } from "@/components/SearchField";
import { StatusFilter } from "@/components/StatusFilter";
import { WorkOrderListing } from "@/components/WorkOrderListing";
import { WorkOrderSkeleton } from "@/components/WorkOrderSkeleton";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useWorkOrders } from "@/hooks/useWorkOrders";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  View,
} from "react-native";
import { Text } from "react-native-fieldops-ui";
import { SafeAreaView } from "react-native-safe-area-context";

const keyExtractor = (order: WorkOrder) => order.id;

const Separator = () => <View className="border-b-hairline border-border" />;

const WorkOrdersScreen = () => {
  // state
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<WorkOrderStatus | undefined>(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const debouncedSearch = useDebouncedValue(search.trim(), 400);

  // api
  const {
    data,
    error,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useWorkOrders({ status, q: debouncedSearch });

  // state
  const orders = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const isFiltered = status !== null || debouncedSearch.length > 0;
  const isLoadingSearchOrFilter =
    isFetching && !isPending && !refreshing && !isFetchingNextPage;

  const clearFilters = useCallback(() => {
    setSearch("");
    setStatus(undefined);
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const handleEndReached = useCallback(() => {
    // guard against FlatList firing repeatedly
    if (hasNextPage && !isFetchingNextPage && !isError) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, isError, fetchNextPage]);

  const handleFooterRetry = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    } else {
      refetch();
    }
  }, [hasNextPage, fetchNextPage, refetch]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<WorkOrder>) => (
      <WorkOrderListing order={item} />
    ),
    [],
  );

  const renderContent = () => {
    // first load, nothing cached yet.
    if (isPending) {
      return <WorkOrderSkeleton />;
    }

    if (isError && orders.length === 0) {
      return (
        <ErrorState message={toApiError(error).message} onRetry={refetch} />
      );
    }

    return (
      <FlatList
        data={orders}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <EmptyState filtered={isFiltered} onClearFilters={clearFilters} />
        }
        ListFooterComponent={
          orders.length > 0 ? (
            <ListFooter
              loading={isFetchingNextPage}
              failed={isError}
              onRetry={handleFooterRetry}
            />
          ) : (
            <></>
          )
        }
      />
    );
  };

  const handleCreate = useCallback(() => {
    // TODO: create flow
  }, []);

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-bg">
      {/* title */}
      <View className="px-4 pt-2 pb-3">
        <Text className="text-title text-fg">Work orders</Text>
      </View>
      {/* search field */}
      <View className="px-4 pb-3">
        <SearchField
          value={search}
          onChangeText={setSearch}
          isLoading={isLoadingSearchOrFilter}
        />
      </View>
      {/* staus filter */}
      <View className="pb-3">
        <StatusFilter value={status} onChange={setStatus} />
      </View>
      {/* divider */}
      <View className="border-b-hairline border-border" />
      {/* data */}
      <View className="flex-1">{renderContent()}</View>
      {/* floating action button */}
      <Fab label="+" onPress={handleCreate} />
    </SafeAreaView>
  );
};

export default WorkOrdersScreen;
