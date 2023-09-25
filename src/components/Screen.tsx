import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
  padding?: boolean;
};
export default function Screen(props: Props) {
  const { padding = true } = props;

  return (
    <SafeAreaView style={style.container}>
      <View style={[style.container, style.screen, padding && style.padding]}>
        {props.children}
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: { flex: 1 },
  padding: {
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  screen: {
    backgroundColor: "#fff",
  },
});
