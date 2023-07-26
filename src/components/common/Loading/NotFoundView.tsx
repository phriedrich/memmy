import React from "react";
import { Text, View } from "@src/components/common/Gluestack";
import { selectThemeOptions } from "@src/slices/settings/settingsSlice";
import { useAppSelector } from "@root/store";
import { Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

function NotFoundView() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { t } = useTranslation();
  const theme = useAppSelector(selectThemeOptions);

  return (
    <View style={styles.container} backgroundColor={theme.colors.bg}>
      <Text fontStyle="italic" color={theme.colors.textSecondary}>
        {t("notFound.community")}
      </Text>
      <Button title={t("Go Back")} onPress={() => navigation.pop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotFoundView;
