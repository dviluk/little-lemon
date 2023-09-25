import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../assets/colors";

type Props = {
  children: React.ReactNode;
  theme?: "light" | "dark";
  serif?: boolean;
  size?: "small" | "large";
};

export default function Subtitle(props: Props) {
  const { theme, serif, size = "small" } = props;
  return (
    <Text
      style={[
        style.text,
        style[`text-${theme}`],
        style[`text-${size}`],
        serif && style.serif,
      ]}
    >
      {props.children}
    </Text>
  );
}

const style = StyleSheet.create({
  text: { fontSize: 24, marginVertical: 8, fontWeight: "bold" },
  ["text-light"]: {
    color: Colors.light,
  },
  ["text-dark"]: {
    color: Colors.dark,
  },
  serif: {
    fontFamily: "serif",
  },
  ["text-small"]: {
    fontSize: 18,
  },
  ["text-large"]: {
    fontSize: 24,
  },
});
