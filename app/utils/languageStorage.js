import * as SecureStore from "expo-secure-store";

export const getDeviceLanguageFromStorage = async () => {
  try {
    let lang = await SecureStore.getItemAsync("lang");
    if (lang && lang.length > 0) return lang;

    return "en";
  } catch (error) {
    return "en";
  }
};

export const updateDeviceLanguageToStorage = (lang) => {
  try {
    SecureStore.setItemAsync("lang", lang);
  } catch (error) {}
};
