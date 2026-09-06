import { FC } from "react";
import { Pressable, PressableProps } from "react-native";
import { Text } from "react-native-fieldops-ui";

interface FabProps extends PressableProps {
  label: string;
}

const Fab: FC<FabProps> = ({ onPress, label }) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Create work order"
      className="w-[50px] h-[50px] absolute bottom-4 right-4 m-safe items-center justify-center rounded-[100px] bg-primary"
    >
      <Text variant={"title"} className="text-primary-fg">
        {label}
      </Text>
    </Pressable>
  );
};

export default Fab;
