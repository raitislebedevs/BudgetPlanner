import React, { useEffect, useState } from "react";
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
import EditSwipable from "../components/EditSwipable/EditSwipable";
import { categoryIcons } from "../utils/categoryIcons";
import AppPickerItem from "../components/AppPicker/AppPickerItem";

function CategorySetUpScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [activeEdit, setActiveEdit] = useState("");
  const [modalIsVisible, setModalVisible] = useState(false);
  const categories = incomeCategory();
  const icons = categoryIcons();

  useEffect(() => {
    setData(categories);
  }, []);

  const selectIcon = (item) => {
    try {
      let iconChange = activeEdit;
      iconChange.icon = item;
      setData([...data, iconChange]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteIcon = (removable) => {
    console.log(activeEdit);
    console.log(data);
    try {
      let newData = data.filter((s) => s.label != removable.label);
      newData.forEach(function (o) {
        o.items = o?.items?.filter((s) => s != removable);
      });

      setData([...newData]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
      <ScrollView style={styles.container}>
        <View>
          <List.Section>
            {data?.map((category) => (
              <EditSwipable
                onPressEdit={() => {
                  setModalVisible(true);
                  setActiveEdit(category);
                }}
                onPress={() => deleteIcon(category)}
              >
                <List.Accordion
                  theme={{ colors: { primary: colors.primary } }}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={category?.icon || "none"}
                      onPress={() => setModalVisible(true)}
                    />
                  )}
                  title={category.label}
                  style={styles.border}
                >
                  {category?.items?.map((item) => {
                    return (
                      <EditSwipable
                        onPressEdit={() => {
                          setModalVisible(true);
                          setActiveEdit(item);
                        }}
                        onPress={() => deleteIcon(item)}
                      >
                        <List.Item
                          style={styles.item}
                          title={item.label}
                          left={(props) => (
                            <List.Icon {...props} icon={item?.icon || "help"} />
                          )}
                        />
                      </EditSwipable>
                    );
                  })}

                  <AppButton title={"Add Category Item"} color={"tertiary"} />
                </List.Accordion>
              </EditSwipable>
            ))}
            <AppButton title={"Add Category"} color={"tertiary"} />
          </List.Section>
        </View>
      </ScrollView>
      <View style={styles.mainButton}>
        <AppButton title="Submit Changes" />
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
                  selectIcon(category.item);
                  setModalVisible(false);
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
    // flex: 1,
    // justifyContent: "flex-end",
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
