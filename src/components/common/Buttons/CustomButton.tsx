import React, { useState } from "react";
import { HStack, Pressable, Text } from "@src/components/common/Gluestack";
import { selectThemeOptions } from "@src/slices/settings/settingsSlice";
import { useAppSelector } from "@root/store";
import SFIcon from "../icons/SFIcon";

function CustomButton({
  onPress,
  text,
  icon,
  selectable = false,
  size = "md",
  badge,
}: {
  onPress: () => void;
  text: string;
  icon: string;
  selectable?: boolean;
  size?: "md" | "sm";
  badge?: string;
}) {
  const [pressedIn, setPressedIn] = useState(false);
  const [selected, setSelected] = useState(false);

  const theme = useAppSelector(selectThemeOptions);

  const onPressIn = () => {
    setPressedIn(true);
  };

  const onPressOut = () => {
    setPressedIn(false);
  };

  const onPressBefore = () => {
    if (selectable) setSelected((prev) => !prev);

    onPress();
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPressBefore}
      opacity={pressedIn ? 0.7 : 1}
      py={size === "md" ? "$2" : "$1"}
      borderRadius={size === "md" ? "$xl" : "$3xl"}
      backgroundColor={!selected ? theme.colors.inputBg : theme.colors.accent}
      flexGrow={1}
    >
      <HStack space="smxs" alignItems="center" justifyContent="center">
        {icon && <SFIcon icon={icon} size={size === "md" ? 16 : 14} />}
        <Text size={size} color={theme.colors.textPrimary}>
          {text}
        </Text>
        {badge && (
          <Text size={size} color={theme.colors.textPrimary}>
            {badge}
          </Text>
        )}
      </HStack>
    </Pressable>
  );
}

export default CustomButton;
