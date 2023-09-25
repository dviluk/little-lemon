import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpoCheckbox from "expo-checkbox";

type Props = {
  label: string;
  value?: boolean;
  onChange: (value: boolean) => void;
};
export default function Checkbox(props: Props) {
  const { value, onChange, label } = props;

  return (
    <View style={style.container}>
      <ExpoCheckbox
        value={value}
        onValueChange={onChange}
        style={style.checkbox}
      />
      <Text>{label}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: { flexDirection: "row" },
  checkbox: { marginRight: 8 },
});
