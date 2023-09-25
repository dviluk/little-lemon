import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import { currentUser, logout } from "../services/storage";
import { ScreenProps } from "../types";
import TextInputComponent from "../components/TextInput";
import ScrollableScreenComponent from "../components/ScrollableScreen";
import { useForm } from "../utils";
import LoadingScreen from "../components/LoadingScreen";
import Subtitle from "../components/Subtitle";
import Checkbox from "../components/Checkbox";
import defaultProfileImg from "../assets/profile.png";
import { CurrentUserContext } from "../context/user";

type ProfileScreenProps = ScreenProps["profile"];

export default function ProfileScreen(props: ProfileScreenProps) {
  const { navigation } = props;

  const [user, setUser] = useState<CurrentUser>(undefined);
  const [status, setStatus] = useState<"LOADING" | "IDLE">("LOADING");

  useEffect(() => {
    async function init() {
      const user = await currentUser();
      setUser(user);
      setStatus("IDLE");
    }

    init();
  }, []);

  if (status === "LOADING") {
    return <LoadingScreen />;
  }

  return (
    <ScrollableScreenComponent>
      <Form navigation={navigation} defaultValues={user} />
    </ScrollableScreenComponent>
  );
}

type FormProps = {
  navigation: any;
  defaultValues: CurrentUser;
};
function Form(props: FormProps) {
  const { navigation, defaultValues } = props;

  const { actions: userActions } = useContext(CurrentUserContext);

  const { values, errors, setValue, hasErrors } = useForm<CurrentUser>({
    defaultValues,
    rules: {
      name: [{ onlyLetters: true }],
      last_name: [{ onlyLetters: true }],
      email: [{ email: true }],
      phone_number: [
        {
          validator: (text) => {
            if (text && !/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/.test(text)) {
              return "Phone number not valid";
            }

            return undefined;
          },
        },
      ],
    },
  });

  function handleInput(input: keyof CurrentUser) {
    return (text: string | boolean) => {
      setValue(input, text);
    };
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setValue("profile_picture", uri);
    }
  }

  function removeImage() {
    setValue("profile_picture", undefined);
  }

  function onSubmit() {
    currentUser(values);
    userActions.setUser(values);
    navigation.pop();
  }

  function onDiscard() {
    navigation.pop();
  }

  function onLogout() {
    logout();
    userActions.setUser(undefined);
    navigation.replace("onboarding");
  }

  return (
    <View>
      <Subtitle>Personal information</Subtitle>
      <View style={style.profilePictureContainer}>
        <Image
          source={
            values.profile_picture
              ? { uri: values.profile_picture }
              : defaultProfileImg
          }
          style={style.profilePicture}
        />
        <Button title="Change" onPress={pickImage} />
        <Button title="Remove" theme="primary-ghost" onPress={removeImage} />
      </View>
      <View style={style.form}>
        <TextInputComponent
          label="First name"
          initialValue={values.name}
          error={errors["name"]}
          onChange={handleInput("name")}
        />
        <TextInputComponent
          label="Last name"
          initialValue={values.last_name}
          error={errors["last_name"]}
          onChange={handleInput("last_name")}
        />
        <TextInputComponent
          label="Email"
          initialValue={values.email}
          error={errors["email"]}
          onChange={handleInput("email")}
        />
        <TextInputComponent
          label="Phone number"
          mask="(999) 999-9999"
          initialValue={values.phone_number}
          error={errors["phone_number"]}
          onChange={handleInput("phone_number")}
        />
      </View>
      <Subtitle>Email notifications</Subtitle>
      <View style={style.form}>
        <Checkbox
          label="Order statuses"
          value={values.check_order_statuses}
          onChange={handleInput("check_order_statuses")}
        />
        <Checkbox
          label="Special offers"
          value={values.check_special_offers}
          onChange={handleInput("check_special_offers")}
        />
        <Checkbox
          label="Password changes"
          value={values.check_password_changes}
          onChange={handleInput("check_password_changes")}
        />
        <Checkbox
          label="Newsletter"
          value={values.check_newsletter}
          onChange={handleInput("check_newsletter")}
        />
      </View>
      <View style={{ marginTop: 32 }}>
        <View>
          <Button title="Logout" theme="primary-alt" onPress={onLogout} />
        </View>
        <View
          style={{
            gap: 8,
            flexDirection: "row",
            marginTop: 16,
          }}
        >
          <Button
            title="Discard changes"
            theme="primary-ghost"
            onPress={onDiscard}
            style={{ flex: 1 }}
          />
          <Button
            title="Save changes"
            disabled={hasErrors}
            onPress={onSubmit}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  profilePicture: { borderRadius: 64, width: 64, height: 64 },
  profilePictureContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  form: { gap: 8 },
});
