import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { useNavigation, useRoute } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  Easing,
} from "react-native";

import { createIconSet } from "react-native-vector-icons";

const glyphMap = require("../assets/customIcons/remixicon.glyphmap.json");
const assetId = require("../assets/customIcons/remixicon.ttf");
const CustomIcon = createIconSet(glyphMap, "remixicon", assetId);

export default function Success() {
  const navigation = useNavigation();
  const route = useRoute();

  const { message } = route.params;

  let opacity = new Animated.Value(0);

  const animate = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const animatedStyles = [
    styles.box,
    {
      alignItems: "center",
      opacity,
      width: size,
      height: size,
    },
  ];

  useEffect(() => {
    animate(Easing.elastic(4));

    setTimeout(() => {
      navigation.navigate("Home");
    }, 1600);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={animatedStyles}>
        <CustomIcon name="checkbox-circle-line" size={100} color="#C7E6C8" />
      </Animated.View>
      <Text style={styles.textSuccessView}>{message}</Text>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
  },
  textSuccessView: {
    color: "#C7E6C8",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: -100,
    textAlign: "center",
  },
});
