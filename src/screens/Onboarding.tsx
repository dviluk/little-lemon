import React, { useContext, useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import Button from "../components/Button";

import { currentUser } from "../services/storage";
import { ScreenProps } from "../types";
import ScrollableScreenComponent from "../components/ScrollableScreen";
import { useForm } from "../utils";
import { CurrentUserContext } from "../context/user";
import { Colors } from "../assets/colors";

type OnboardingScreenProps = ScreenProps["onboarding"];

export default function OnboardingScreen(props: OnboardingScreenProps) {
  const { navigation } = props;

  const { actions: userActions } = useContext(CurrentUserContext);
  const { values, errors, setValue, hasErrors } = useForm<CurrentUser>({
    defaultValues: { name: "", email: "" },
    rules: {
      name: [{ required: true }, { onlyLetters: true }],
      email: [{ email: true }],
    },
  });

  const emailRef = useRef<TextInput>(null);

  async function onSubmit() {
    if (hasErrors) {
      return;
    }

    await currentUser(values);
    userActions.setUser(values);

    navigation.replace("home");
  }

  function handleInput(input: keyof CurrentUser) {
    return (text: string) => {
      setValue(input, text);
    };
  }

  return (
    <ScrollableScreenComponent padding={false}>
      <View style={style.body}>
        <Text style={style.label}>Let us get to know you</Text>

        <Text style={style.label}>
          First Name<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          keyboardType="default"
          value={values.name}
          onChangeText={handleInput("name")}
          style={style.input}
          onSubmitEditing={() => {
            emailRef.current?.focus();
          }}
        />
        {errors.name && <Text style={style.textDanger}>{errors.name}</Text>}
        <Text style={style.label}>
          Email<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          ref={emailRef}
          keyboardType="email-address"
          value={values.email}
          onChangeText={handleInput("email")}
          style={style.input}
          onSubmitEditing={onSubmit}
        />
        {errors.email && <Text style={style.textDanger}>{errors.email}</Text>}
      </View>
      <View style={style.footer}>
        <Button
          title="Submit"
          theme="primary-alt"
          disabled={hasErrors}
          onPress={onSubmit}
        />
      </View>
    </ScrollableScreenComponent>
  );
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    justifyContent: "flex-end",
    padding: 24,
    flexDirection: "row",
  },
  textDanger: {
    color: "red",
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#111",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  label: {
    fontSize: 22,
    marginVertical: 16,
    color: Colors.light,
  },
  button: {
    padding: 16,
    backgroundColor: "#ccc",
  },
});
