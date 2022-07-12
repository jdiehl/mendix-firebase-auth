import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ViewStyle } from "react-native";

export type SignInHandler = (identityToken: string, user: FirebaseAuthTypes.User) => void;

export interface SignInProps {
    onSignIn: SignInHandler;
    style: ViewStyle;
}
