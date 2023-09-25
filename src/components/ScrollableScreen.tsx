import React from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";

type Props = {
  children: React.ReactNode;
  padding?: boolean;
};
export default function ScrollableScreenComponent(props: Props) {
  const { padding = true } = props;
  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[style.container, style.scrollView, padding && style.padding]}
        contentContainerStyle={[padding && style.paddingContentContainer]}
      >
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  padding: {
    paddingHorizontal: 22,
  },
  paddingContentContainer: {
    paddingVertical: 16,
  },
  scrollView: {
    minHeight: "100%",
  },
});
