import React from "react";
import { StyleSheet, Text } from "react-native";

type Props = { children: React.ReactNode };

export default function Subtitle(props: Props) {
  return <Text style={style.text}>{props.children}</Text>;
}

const style = StyleSheet.create({
  text: { fontSize: 18, marginVertical: 8 },
});
