import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  LayoutAnimation,
  Modal,
  FlatList,
} from "react-native";
import { Appbar, List } from "react-native-paper";
import AppButton from "../components/AppButton/AppButton";
import { colors } from "../config/colors";
import { incomeCategory } from "../utils/categoryItems";
import defaultStyles from "../config/appStyles";
import RemoveSwipable from "../components/RemoveSwipable/RemoveSwipable";
import EditSwipable from "../components/EditSwipable/EditSwipable";
import { categoryIcons } from "../utils/categoryIcons";
import AppPickerItem from "../components/AppPicker/AppPickerItem";

function CategorySetUpScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [swiping, setSriping] = useState(false);
  const [modalIsVisible, setModalVisible] = useState(false);
  const categories = incomeCategory();
  const icons = categoryIcons();

  return (
    <>
      <View style={styles.container}>
        <View style={defaultStyles.statusbar} />
        <View>
          <Appbar style={styles.appBar}>
            <Appbar.BackAction
              color={colors.white}
              onPress={() => navigation.navigate("MainScreen")}
            />

            <Appbar.Content title="Main Screen" color={colors.white} />

            <View style={styles.header}>
              <Image
                style={styles.logo}
                source={require("../assets/favicon.png")}
              />
            </View>
          </Appbar>
        </View>
        <View>
          <List.Section>
            {categories?.map((category) => (
              <RemoveSwipable>
                <List.Accordion
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={"cash"}
                      onPress={() => setModalVisible(true)}
                    />
                  )}
                  title={category.label}
                  style={styles.border}
                >
                  {category.items.map((item) => {
                    return (
                      <EditSwipable onPressEdit={() => setModalVisible(true)}>
                        <List.Item
                          style={styles.item}
                          title={item.label}
                          left={(props) => (
                            <List.Icon {...props} icon={"cash"} />
                          )}
                        />
                      </EditSwipable>
                    );
                  })}

                  <AppButton title={"Add Category Item"} color={"tertiary"} />
                </List.Accordion>
              </RemoveSwipable>
            ))}
            <AppButton title={"Add Category"} color={"tertiary"} />
          </List.Section>
        </View>
        <View style={styles.mainButton}>
          <AppButton title="Main Screen" />
        </View>
      </View>
      <Modal visible={modalIsVisible} animationType="slide">
        <FlatList
          data={icons}
          numColumns={3}
          style={styles.modaItem}
          keyExtractor={(item) => item}
          renderItem={(category) => (
            <View style={styles.category}>
              <AppPickerItem
                icon={category.item}
                onPress={() => {
                  console.log("Testing press");
                }}
              />
            </View>
          )}
        />

        <View style={styles.button}>
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

export default CategorySetUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  category: {
    marginTop: 10,
    marginLeft: 5,
  },
  appBar: {
    borderTopColor: colors.white,
    borderTopWidth: 1,
    backgroundColor: colors.primary,
  },
  button: {
    marginBottom: 10,
  },
  mainButton: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    margin: 15,
    marginLeft: 20,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  listFrame: {
    flex: 1,
    justifyContent: "center",
    color: "black",
    borderWidth: 2,
  },
  item: { marginLeft: 42 },

  border: {
    borderRadius: 20,
    color: "black",
  },
  container: {
    flex: 1,
  },
  modaItem: {
    marginTop: 10,
  },
});
