import React, { useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../assets/colors";

type Props = {
  children: React.ReactNode;
  onChange?: (value: boolean) => void;
  value?: boolean;
};

export default function Chip(props: Props) {
  const { children, onChange, value } = props;
  const [checked, setChecked] = useState(value || false);

  function onPress() {
    const newStatus = !checked;
    setChecked(newStatus);

    if (onChange) {
      onChange(newStatus);
    }
  }

  return (
    <Pressable
      style={[style.container, checked && style.containerChecked]}
      onPress={onPress}
    >
      <Text style={[style.text, checked && style.textChecked]}>{children}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.light,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  containerChecked: { backgroundColor: Colors.primary },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark,
  },
  textChecked: {
    color: Colors.light,
  },
});
