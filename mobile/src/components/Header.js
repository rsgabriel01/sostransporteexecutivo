import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { createIconSet } from "react-native-vector-icons";

const glyphMap = require("../assets/customIcons/remixicon.glyphmap.json");
const assetId = require("../assets/customIcons/remixicon.ttf");
const CustomIcon = createIconSet(glyphMap, "remixicon", assetId);

export default function Header({ title, showCancel = true }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <CustomIcon name="arrow-left-line" size={23} color="#ffffff" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={navigation.goBack}>
          <CustomIcon name="close-line" size={23} color="#ffffff" />
        </BorderlessButton>
      ) : (
        <View style={styles.viewWhite} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#0F4C82",
    borderBottomWidth: 1,
    borderColor: "#0F4C95",
    paddingTop: 44,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 16,
  },

  viewWhite: {
    height: 19,
    width: 23,
  },
});
