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
import { Picker } from "@react-native-picker/picker";

function IOSPicker({
  icon,
  items,
  halfSize,
  placeholder,
  onValueChange,
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
          <Text style={[defaultStyles.appTextNormal, styles.text]}>
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
        <View style={styles.pickerContainer}>
          <Picker
            style={{ height: 50, width: 300 }}
            onValueChange={(e) => {
              onValueChange(e);
              setModalVisible(false);
            }}
          >
            {items.map((item) => {
              return (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={item.label}
                />
              );
            })}
          </Picker>
        </View>
        <View style={styles.textContainer}>
          <AppButton
            title={"Close"}
            color="secondary"
            onPress={() => setModalVisible(false)}
          />
        </View>
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
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
    marginLeft: "5%",
    marginRight: "5%",
  },

  pickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    marginLeft: "5%",
    marginRight: "5%",
  },
});
export default IOSPicker;
