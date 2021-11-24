import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Appbar, List } from "react-native-paper";
import AppButton from "../../components/AppButton/AppButton";
import { colors } from "../../config/colors";
import defaultStyles from "../../config/appStyles";
import EditSwipable from "../../components/EditSwipable/EditSwipable";
import { categoryIcons } from "../../utils/categoryIcons";
import AppPickerItem from "../../components/AppPicker/AppPickerItem";
import { TriangleColorPicker } from "react-native-color-picker";
import ListIcon from "../../components/ListIcon/ListIcon";
import AddCategoryItem from "../../components/AddCategoryItem/AddCategoryItem";
import userCategories from "../../services/userCategories";
import userInfoServices from "../../services/userInfoServices";
import { connect } from "react-redux";
import * as actions from "../../Redux/actions";
import { useLocale } from "react-easy-localization";

function CategoryScreen({
  navigation,
  reduxCategories,
  type,
  defaultCategories,
  reduxUser,
  reduxUserInfo,
  setUserCategories,
  setUserInfo,
}) {
  const { i18n } = useLocale();
  const t = i18n;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [seeCategory, setSeeCategory] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryItem, setCategoryItem] = useState("");
  const [addedCategories, setAddedCategories] = useState([]);
  const [addedCategoryItems, setAddedCategoryItems] = useState([]);
  const [activeEdit, setActiveEdit] = useState("");
  const [modalIsVisible, setModalVisible] = useState(false);
  const [colorPickerVisibility, setColorPickerVisibility] = useState(false);
  const icons = categoryIcons(t);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    setSeeCategory(true);
    setData((reduxCategories && reduxCategories[type]) || defaultCategories);
    setSeeCategory(false);
  };

  const selectIcon = (item) => {
    try {
      let iconChange = activeEdit;
      iconChange.icon = item.icon;
      setData([...data]);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteIcon = (removable) => {
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
  const onColorChange = (color) => {
    try {
      let iconColor = activeEdit;
      iconColor.color = color;
      setData([...data]);
    } catch (error) {
      console.log(error);
    }
  };
  const onCategoryAdd = () => {
    try {
      let newCategory = {};
      newCategory.label = category;
      newCategory.value = category;
      newCategory.color = colors.primary;
      newCategory.items = [];
      setData([...data, newCategory]);
    } catch (error) {
      console.log(error);
    }
  };
  const onCategoryItemAdd = (category) => {
    try {
      let newItem = {};
      newItem.label = categoryItem;
      newItem.value = categoryItem;
      newItem.color = colors.primary;

      let addedItem = data.forEach((cat) => {
        if (cat.label == category) {
          cat.items.push(newItem);
        }
      });

      setData([...addedItem]);
    } catch (error) {
      console.log(error);
    }
  };

  const submitCategory = async () => {
    setIsLoading(true);
    try {
      if (!reduxUserInfo?.userCategories) {
        let users = [];
        users.push(reduxUser?.id);

        let payload = {
          [type]: data,
          users,
        };

        console.log(payload);

        const result = await userCategories.CREATE(payload);

        console.log(result);
        setUserCategories(result.data);

        const { data } = await userInfoServices.UPDATE(reduxUserInfo?.id, {
          userCategories: result.data.id,
        });
        setUserInfo(data);
        setIsLoading(false);
        return;
      }
      const { id } = reduxUserInfo?.userCategories;
      if (id) {
        let payload = {
          [type]: data,
        };

        const result = await userCategories.UPDATE(id, payload);
        setUserCategories(result?.data);

        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
              source={require("../../assets/favicon.png")}
            />
          </View>
        </Appbar>
      </View>
      <ScrollView style={styles.container}>
        <View>
          <List.Section>
            <>
              {!seeCategory ? (
                <>
                  {data?.map((category) => (
                    <EditSwipable
                      onPressEdit={() => {
                        setModalVisible(true);
                        setActiveEdit(category);
                      }}
                      onPress={() => deleteIcon(category)}
                      key={category.label}
                      onPressChange={() => {
                        setColorPickerVisibility(true);
                        setActiveEdit(category);
                      }}
                    >
                      <List.Accordion
                        theme={{ colors: { primary: colors.primary } }}
                        left={(props) => (
                          <ListIcon
                            {...props}
                            icon={category?.icon || "help"}
                            onPress={() => setModalVisible(true)}
                            color={category?.color || colors.secondary}
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
                              key={`${item.label}_${category.label}`}
                              onPressChange={() => {
                                setColorPickerVisibility(true);
                                setActiveEdit(item);
                              }}
                            >
                              <List.Item
                                style={styles.item}
                                title={item.label}
                                left={(props) => (
                                  <ListIcon
                                    {...props}
                                    icon={item?.icon || "help"}
                                    onPress={() => setModalVisible(true)}
                                    color={item?.color || colors.secondary}
                                  />
                                )}
                              />
                            </EditSwipable>
                          );
                        })}

                        <>
                          {addedCategoryItems.map(() => {
                            if (
                              category.label != addedCategoryItems[0].category
                            )
                              return;

                            return (
                              <AddCategoryItem
                                onPressSuccess={() => {
                                  onCategoryItemAdd(category.label);
                                  setAddedCategoryItems([]);
                                }}
                                handleOnChange={(e) => setCategoryItem(e)}
                                onPressCancel={() => setAddedCategoryItems([])}
                              />
                            );
                          })}
                        </>
                        <View style={styles.helpButtonItem}>
                          <AppButton
                            style={styles.button}
                            title={"Add Category Item"}
                            color={"tertiary"}
                            onPress={() =>
                              setAddedCategoryItems([
                                { category: category.label },
                              ])
                            }
                          />
                        </View>
                      </List.Accordion>
                    </EditSwipable>
                  ))}
                </>
              ) : (
                <ActivityIndicator
                  style={styles.loader}
                  size="large"
                  color={colors.primary}
                />
              )}
            </>
            <>
              {addedCategories.map((item) => {
                return (
                  <AddCategoryItem
                    onPressSuccess={() => {
                      onCategoryAdd();
                      setAddedCategories([]);
                    }}
                    onPressCancel={() => setAddedCategories([])}
                    handleOnChange={(e) => setCategory(e)}
                  />
                );
              })}
            </>

            <View style={styles.helpButton}>
              <AppButton
                style={styles.button}
                title={"Add Category"}
                color={"tertiary"}
                onPress={() => setAddedCategories([{}])}
              />
            </View>
          </List.Section>
        </View>
      </ScrollView>
      {!isLoading ? (
        <View style={styles.mainButton}>
          <AppButton title="Submit Changes" onPress={() => submitCategory()} />
        </View>
      ) : (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={colors.primary}
        />
      )}

      <Modal visible={modalIsVisible} animationType="slide">
        <FlatList
          data={icons}
          numColumns={3}
          style={styles.modaItem}
          keyExtractor={(item) => {
            `${item.icon}_${item.color}`;
          }}
          renderItem={(category) => (
            <View style={styles.category}>
              <AppPickerItem
                icon={category.item.icon}
                color={category.item.color || colors.primary}
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
      <Modal visible={colorPickerVisibility} animationType="fade">
        <TriangleColorPicker
          onColorSelected={(color) => {
            setColorPickerVisibility(false);
            onColorChange(color);
          }}
          style={{ flex: 1 }}
        />
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  reduxCategories: state?.user?.categories,
  reduxUser: state?.user?.user,
  reduxUserInfo: state?.user?.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setUserCategories: (value) => dispatch(actions.setUserCategories(value)),
  setUserInfo: (value) => dispatch(actions.setUserInfo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);

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
    marginBottom: 10,
    marginLeft: "5%",
    marginRight: "5%",
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
  item: { paddingLeft: 25, backgroundColor: colors.gray, marginVertical: 2 },

  border: {
    borderRadius: 20,
    color: "black",
    backgroundColor: colors.gray,
    marginVertical: 2,
  },
  container: {
    flex: 1,
  },
  modaItem: {
    marginTop: 10,
  },
  helpButton: {
    flex: 1,
    marginLeft: "5%",
    marginRight: "5%",
  },
  helpButtonItem: {
    marginRight: "15%",
    marginBottom: 12,
  },
  loader: {
    marginBottom: 12,
  },
});
