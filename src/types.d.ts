import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  onboarding: undefined;
  profile: undefined;
};

type Screens = keyof RootStackParamList;

export type ScreenProps<NavigatorID extends string | undefined = undefined> = {
  [key in Screens]: NativeStackScreenProps<
    RootStackParamList,
    key,
    NavigatorID
  >;
};
