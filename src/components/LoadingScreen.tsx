import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={style.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
