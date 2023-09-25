import React from "react";
import { StyleSheet, Text } from "react-native";

type Props = { children: React.ReactNode; theme?: "primary-alt" };

export default function Title(props: Props) {
  const { theme = "primary-alt" } = props;
  return (
    <Text style={[style.text, style[`text-${theme}`]]}>{props.children}</Text>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 42,
    marginVertical: 8,
    fontFamily: "serif",
    fontWeight: "bold",
  },
  ["text-primary-alt"]: {
    color: "#F4CE14",
  },
});
