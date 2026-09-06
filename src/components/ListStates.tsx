import { ActivityIndicator, View } from "react-native";
import { Button, Text } from "react-native-fieldops-ui";

export const EmptyState = ({
  filtered,
  onClearFilters,
}: {
  filtered: boolean;
  onClearFilters: () => void;
}) => {
  return (
    <View className="flex-1 items-center justify-center gap-2 px-8">
      <Text variant={"heading"} className="text-fg">
        {filtered
          ? "No work orders match these filters."
          : "No work orders yet."}
      </Text>
      <Text className="text-fg-muted">
        {filtered
          ? "Try a different search term or status."
          : "New work orders will appear here."}
      </Text>
      {filtered ? (
        <View className="pt-2">
          <Button
            label="Clear filters"
            variant="ghost"
            size="sm"
            onPress={onClearFilters}
          />
        </View>
      ) : null}
    </View>
  );
};

export const ErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => {
  return (
    <View className="flex-1 items-center justify-center px-4">
      <View className="w-full gap-3 rounded border border-danger bg-surface p-4">
        <Text className="text-heading text-danger">
          {`Couldn't load work orders`}
        </Text>
        <Text className="text-body text-fg-muted">{message}</Text>
        <Button label="Retry" size="sm" onPress={onRetry} />
      </View>
    </View>
  );
};

export const ListFooter = ({
  loading,
  failed,
  onRetry,
}: {
  loading: boolean;
  failed: boolean;
  onRetry: () => void;
}) => {
  return (
    <View className="pb-8">
      {failed ? (
        <View className="items-center gap-2 px-4 py-3">
          <Text className="text-body text-danger">
            {`Couldn't load more work orders.`}
          </Text>
          <Button label="Retry" variant="ghost" size="sm" onPress={onRetry} />
        </View>
      ) : (
        <View className="h-8 items-center justify-center">
          {loading ? <ActivityIndicator size="small" /> : null}
        </View>
      )}
      <View className="h-8" />
    </View>
  );
};
