import React, { useContext } from "react";
import { Pressable, View, Image } from "react-native";

import Logo from "../assets/Logo.png";
import DefaultProfilePicture from "../assets/profile.png";
import { CurrentUserContext } from "../context/user";

type Props = {
  navigation: any;
  route: any;
};
export default function Toolbar(props: Props) {
  const { navigation, route } = props;

  const { user } = useContext(CurrentUserContext);

  return (
    <View
      style={{
        alignItems: "center",
        height: 64,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={Logo} style={{ marginLeft: user ? 58 : 0 }} />
      </View>
      {user && (
        <View
          style={{
            paddingRight: 16,
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
