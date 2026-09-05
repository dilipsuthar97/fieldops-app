import { View } from "react-native";
import { Button, Text } from "react-native-fieldops-ui";

export default function Index() {
  return (
    <View className="flex-1 p-4 bg-surface">
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <Button label="Button" onPress={() => alert("Hello")} />
    </View>
  );
}
