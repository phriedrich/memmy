import { TableView } from "@gkasdorf/react-native-tableview-simple";
import {
  HStack,
  Image,
  ScrollView,
  Text,
} from "@src/components/common/Gluestack";
import {
  selectSettings,
  selectThemeOptions,
} from "@src/slices/settings/settingsSlice";
import { useAppDispatch, useAppSelector } from "@root/store";
import React from "react";
import { StyleSheet } from "react-native";
import { changeIcon } from "react-native-change-icon";
import { setSetting } from "../../../../slices/settings/settingsActions";
import { appIconOptions } from "../../../../types/AppIconType";
import CCell from "../../../common/Table/CCell";
import CSection from "../../../common/Table/CSection";
import SFIcon from "../../../common/icons/SFIcon";

function IconSelectionScreen() {
  const settings = useAppSelector(selectSettings);

  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectThemeOptions);

  return (
    <ScrollView bg={theme.colors.bg} flex={1}>
      <TableView style={styles.table}>
        <CSection footer="App icons by dizzy@lemmy.ml">
          {Object.entries(appIconOptions).map(([key, value]) => (
            <CCell
              key={key}
              cellStyle="RightDetail"
              title={
                <HStack space="mdsm" alignItems="center">
                  <Image
                    style={{ borderRadius: 10, width: 40, height: 40 }}
                    source={value.path}
                    alt={`${value.display} icon`}
                  />
                  <Text>{value.display}</Text>
                </HStack>
              }
              cellAccessoryView={
                settings.appIcon === key && (
                  <SFIcon icon="checkmark" size={12} />
                )
              }
              backgroundColor={theme.colors.fg}
              titleTextColor={theme.colors.textPrimary}
              rightDetailColor={theme.colors.textSecondary}
              onPress={() => {
                dispatch(setSetting({ appIcon: key }));
                changeIcon(key);
              }}
            />
          ))}
        </CSection>
      </TableView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  table: {
    marginHorizontal: 15,
  },
});

export default IconSelectionScreen;
