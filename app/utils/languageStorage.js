import { AsyncStorage } from "@react-native-community/async-storage";

export const getDeviceLanguageFromStorage = async () => {
  try {
    let lang = await AsyncStorage.getItem("lang");
    if (lang && lang.length > 0) return lang;

    return "en";
  } catch (error) {
    return "en";
  }
};

export const updateDeviceLanguageToStorage = (lang) => {
  try {
    AsyncStorage.setItem("lang", lang);
  } catch (error) {}
};
