import { ActivityIndicator, Pressable, TextInput, View } from "react-native";
import { Text } from "react-native-fieldops-ui";

interface SearchFieldProps {
  value: string;
  onChangeText: (value: string) => void;
  isLoading?: boolean;
}

export const SearchField = ({
  value,
  onChangeText,
  isLoading,
}: SearchFieldProps) => {
  return (
    <View className="flex-row items-center gap-2 rounded border border-border bg-surface px-3">
      <Text className="text-fg-muted">🔍</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
        className="flex-1 py-3 text-body placeholder:text-fg-muted"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel="Search work orders"
      />
      <View className="w-4 items-center justify-center">
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : value.length > 0 ? (
          <Pressable
            onPress={() => onChangeText("")}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            hitSlop={12}
          >
            <Text className="text-body text-fg-muted">✕</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};
