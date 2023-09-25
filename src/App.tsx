import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { currentUser } from "./services/storage";

import OnboardingScreen from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile";
import { RootStackParamList } from "./types";
import LoadingScreen from "./components/LoadingScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isOnboardingCompleted, setIs] = useState(false);
  const [status, setStatus] = useState<"LOADING" | "IDLE">("LOADING");

  useEffect(() => {
    async function init() {
      const user = await currentUser();

      setIs(user !== undefined);

      setStatus("IDLE");
    }

    init();
  }, []);

  if (status === "LOADING") {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isOnboardingCompleted ? "profile" : "onboarding"}
      >
        <Stack.Screen
          name="onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
