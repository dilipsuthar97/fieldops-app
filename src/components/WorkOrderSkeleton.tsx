import { View } from "react-native";

const SkeletonRow = () => {
  return (
    <View className="gap-2 border-b-hairline border-border px-4 py-3">
      <View className="flex-row items-center justify-between">
        <View className="h-3 w-1/4 rounded bg-border" />
        <View className="h-3 w-1/3 rounded bg-border" />
      </View>
      <View className="h-4 w-3/4 rounded bg-border" />
      <View className="h-3 w-1/2 rounded bg-border" />
      <View className="h-3 w-1/3 rounded bg-border" />
    </View>
  );
};

export const WorkOrderSkeleton = () => {
  return (
    <View accessibilityLabel="Loading work orders">
      {Array.from({ length: 6 }, (_, index) => (
        <SkeletonRow key={index} />
      ))}
    </View>
  );
};
