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
} from "react-native";
import { Appbar, List } from "react-native-paper";
import AppButton from "../components/AppButton/AppButton";
import { colors } from "../config/colors";
import { incomeCategory } from "../utils/categoryItems";
import defaultStyles from "../config/appStyles";
import RemoveSwipable from "../components/RemoveSwipable/RemoveSwipable";
import EditSwipable from "../components/EditSwipable/EditSwipable";

function CategorySetUpScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [swiping, setSriping] = useState(false);
  const [modalIsVisible, setModalVisible] = useState(false);
  const categories = incomeCategory();

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
                      <EditSwipable>
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
        <View style={styles.buytton}>
          <AppButton title="Main Screen" />
        </View>
      </View>
      <Modal
        visible={modalIsVisible}
        animationType="slide"
        style={styles.container}
      >
        {/* <FlatList
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
        /> */}
        <AppButton
          title={"Close"}
          color="secondary"
          onPress={() => setModalVisible(false)}
        />
      </Modal>
    </>
  );
}

export default CategorySetUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    borderTopColor: colors.white,
    borderTopWidth: 1,
    backgroundColor: colors.primary,
  },
  buytton: {
    flex: 1,
    justifyContent: "flex-end",
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
    // backgroundColor: colors.lightGray,
    // borderRadius: 25,
    // flexDirection: "row",
    // width: "100%",
    // padding: 15,
    // marginVertical: 5,
    flex: 1,
  },
});
