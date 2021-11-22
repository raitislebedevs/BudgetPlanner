import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../config/colors";
import defaultStyles from "../../config/appStyles";
import AppButton from "../AppButton/AppButton";
import AppPickerItem from "./AppPickerItem";

function AppPicker({
  icon,
  items,
  halfSize,
  placeholder,
  onSelectItem,
  selectedItem,
}) {
  const [modalIsVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, halfSize && { width: "50%" }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.mediumGray}
              style={styles.icon}
            />
          )}
          <Text style={[defaultStyles.text, styles.text]}>
            {selectedItem ? selectedItem : placeholder}
          </Text>
          <MaterialCommunityIcons
            name={"chevron-down"}
            size={20}
            color={colors.mediumGray}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        visible={modalIsVisible}
        animationType="slide"
        style={styles.container}
      >
        <FlatList
          data={items}
          numColumns={3}
          style={styles.modaItem}
          keyExtractor={(item) => item.value.toString()}
          renderItem={(category) => (
            <AppPickerItem
              label={category?.item?.label}
              icon={category?.item?.icon}
              onPress={() => {
                setModalVisible(false);
                onSelectItem(category?.item?.label);
              }}
            />
          )}
        />
        <AppButton
          title={"Close"}
          color="secondary"
          onPress={() => setModalVisible(false)}
        />
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 5,
    flex: 1,
  },
  modaItem: {
    marginTop: 42,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});
export default AppPicker;
