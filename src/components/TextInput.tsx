import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

type Props = {
  label: string;
  initialValue?: string;
  error?: string;
  onChange?: (value: string, rawValue?: string) => void;
  mask?: string;
};
export default function TextInputComponent(props: Props) {
  const { label, initialValue, error, onChange, mask } = props;

  return (
    <View style={style.container}>
      <Text>{label}</Text>
      {mask ? (
        <MaskedTextInput
          mask={mask}
          defaultValue={initialValue}
          style={style.input}
          onChangeText={onChange!}
        />
      ) : (
        <TextInput
          defaultValue={initialValue}
          style={style.input}
          onChangeText={onChange}
        />
      )}
      {error && <Text style={style.error}>{error}</Text>}
    </View>
  );
}

const style = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  error: {
    color: "red",
  },
});
