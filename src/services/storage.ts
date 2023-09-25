import AsyncStorage from "@react-native-async-storage/async-storage";

export function currentUser(): Promise<CurrentUser>;
export function currentUser(userData: CurrentUser): Promise<undefined>;
export async function currentUser(
  userData?: CurrentUser
): Promise<CurrentUser> | undefined {
  try {
    if (userData) {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      return;
    }

    const userStr = await AsyncStorage.getItem("user");
    if (!userStr) return;

    const user = JSON.parse(userStr);
    return user;
  } catch (error) {
    return;
  }
}

export async function logout() {
  await AsyncStorage.removeItem("user");
}
