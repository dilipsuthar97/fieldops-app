import { WorkOrder } from "@/api/entities/WorkOrder";
import { getMetaLine, getStatusLabel } from "@/utils/workOrder";
import { FC } from "react";
import { View } from "react-native";
import { STATUS_TEXT_CLASS, Text } from "react-native-fieldops-ui";

interface WorkOrderListingProps {
  order: WorkOrder;
}

export const WorkOrderListing: FC<WorkOrderListingProps> = ({ order }) => {
  const meta = getMetaLine(order);

  return (
    <View className="gap-1 px-4 py-3">
      <View className="flex-row items-center justify-between gap-2">
        <Text variant={"label"} className="text-fg-muted">
          {order.reference}
        </Text>
        <Text
          variant={"label"}
          className={`${STATUS_TEXT_CLASS[order.status] ?? "text-fg-muted"}`}
        >
          {`● ${getStatusLabel(order.status)}`}
        </Text>
      </View>
      <Text variant={"heading"} className="text-fg" numberOfLines={2}>
        {order.title}
      </Text>
      <Text className="text-fg-muted" numberOfLines={1}>
        {order.site}
      </Text>
      {meta ? (
        <Text variant={"caption"} className="text-fg-muted">
          {meta}
        </Text>
      ) : null}
    </View>
  );
};
