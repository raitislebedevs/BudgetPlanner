import Toast from "react-native-toast-message";

function ToastMessage(key, textOne, textTwo) {
  switch (key) {
    case "success":
      return Toast.show({
        type: "success",
        text1: textOne,
        text2: `${textTwo} 👋`,
      });
    case "warning":
      return Toast.show({
        type: "warning",
        text1: textOne,
        text2: `${textTwo} 👋`,
      });
    case "error":
      return Toast.show({
        type: "error",
        text1: textOne,
        text2: `${textTwo} 👋`,
      });
    default:
      return Toast.show({
        type: "error",
        text1: "Opps....",
        text2: `Congratulations you broke us! 👋`,
      });
      break;
  }
}

export default ToastMessage;
