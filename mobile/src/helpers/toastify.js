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

export function toastfySuccess(Title, Message) {
  Toast.show({
    type: "success",
    position: "top",
    text1: Title,
    text2: Message,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
  });
}

export function toastfyError(Title, Message) {
  Toast.show({
    type: "error",
    position: "top",
    text1: Title,
    text2: Message,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
  });
}

export function toastfyInfo(Title, Message) {
  Toast.show({
    type: "info",
    position: "top",
    text1: Title,
    text2: Message,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
  });
}
