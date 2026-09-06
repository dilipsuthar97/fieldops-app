import {
  STATUS_LABELS,
  STATUSES,
  WorkOrderStatus,
} from "@/api/entities/WorkOrder";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "react-native-fieldops-ui";

interface StatusFilterProps {
  value: WorkOrderStatus | undefined;
  onChange: (value: WorkOrderStatus | undefined) => void;
}

const OPTIONS: { value: WorkOrderStatus | undefined; label: string }[] = [
  { value: undefined, label: "All" },
  ...STATUSES.map((status) => ({
    value: status,
    label: STATUS_LABELS[status],
  })),
];

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-row gap-2 px-4">
        {OPTIONS.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.label}
              onPress={() => onChange(option.value)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              className={
                selected
                  ? "rounded border border-primary bg-primary px-3 py-2"
                  : "rounded border border-border bg-bg px-3 py-2"
              }
            >
              <Text
                variant={"label"}
                className={selected ? "text-primary-fg" : "text-fg"}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};
