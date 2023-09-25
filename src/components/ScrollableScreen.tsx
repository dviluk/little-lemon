import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
  padding?: boolean;
};
export default function ScrollableScreenComponent(props: Props) {
  const { padding = true } = props;
  return (
    <SafeAreaView style={style.container}>
      <ScrollView
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
