import Toast from "react-native-toast-message";

export const toastConfig = {
  success: () => {},
  error: () => {},
  info: () => {},
  warning: (internalState) => {
    <View style={{ height: 40, width: "90%", backgroundColor: "yellow" }}>
      <Text>{internalState.text1}</Text>
    </View>;
  },
};

export function toastfySuccess(Title, Message, topDistance = 45) {
  Toast.show({
    type: "success",
    position: "top",
    text1: Title,
    text2: Message,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: topDistance,
  });
}

export function toastfyError(Title, Message, topDistance = 45) {
  Toast.show({
    type: "error",
    position: "top",
    text1: Title,
    text2: Message,
    visibilityTime: 7000,
    autoHide: true,
    topOffset: topDistance,
  });
}

export function toastfyInfo(Title, Message, topDistance = 45) {
  Toast.show({
    type: "info",
    position: "top",
    text1: Title,
    text2: Message,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: topDistance,
  });
}
