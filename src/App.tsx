import React, { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { currentUser } from "./services/storage";

import OnboardingScreen from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile";
import { RootStackParamList } from "./types";
import LoadingScreen from "./components/LoadingScreen";
import HomeScreen from "./screens/Home";

import Toolbar from "./components/Toolbar";
import { CurrentUserContext } from "./context/user";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [user, setUser] = useState<CurrentUser>(undefined);
  const [status, setStatus] = useState<"LOADING" | "IDLE">("LOADING");

  useEffect(() => {
    async function init() {
      const _user = await currentUser();

      setUser(_user);

      setStatus("IDLE");
    }

    init();
  }, []);

  if (status === "LOADING") {
    return <LoadingScreen />;
  }

  return (
    <CurrentUserContext.Provider value={{ user, actions: { setUser } }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user ? "home" : "onboarding"}
          screenOptions={{
            header: (props) => {
              return <Toolbar {...props} />;
            },
          }}
        >
          <Stack.Screen name="onboarding" component={OnboardingScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CurrentUserContext.Provider>
  );
}
