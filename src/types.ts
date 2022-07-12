import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export interface SignInStyle {
    width: number;
    height: number;
}

export interface SignInProps {
    onSignIn: (idToken: string, user: FirebaseAuthTypes.User) => void;
    style: SignInStyle;
}
