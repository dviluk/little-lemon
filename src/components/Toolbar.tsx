import React, { useContext } from "react";
import { Pressable, View, Image } from "react-native";

import Logo from "../assets/Logo.png";
import DefaultProfilePicture from "../assets/profile.png";
import { CurrentUserContext } from "../context/user";
import Button from "./Button";

type Props = {
  navigation: any;
  route: any;
  back?: { title: string };
};
export default function Toolbar(props: Props) {
  const { navigation, route, back } = props;

  const { user } = useContext(CurrentUserContext);

  return (
    <View
      style={{
        alignItems: "center",
        height: 64,
        flexDirection: "row",
        paddingLeft: 22,
      }}
    >
      {back && (
        <View
          style={{
            position: "absolute",
            left: 22,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            title="< Back"
            onPress={() => {
              navigation.pop();
            }}
          />
        </View>
      )}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={Logo} style={{ marginRight: user ? 26 : 0 }} />
      </View>
      {user && (
        <View
          style={{
            position: "absolute",
            right: 22,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            android_ripple={{ foreground: true, color: "#ccc" }}
            style={{
              borderRadius: 32,
              overflow: "hidden",
            }}
            onPress={() => {
              if (route.name === "profile") {
                return;
              }

              navigation.push("profile");
            }}
          >
            <Image
              source={
                user.profile_picture
                  ? { uri: user.profile_picture }
                  : DefaultProfilePicture
              }
              style={{ width: 42, height: 42 }}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}
