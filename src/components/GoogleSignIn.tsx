import { createElement, ReactElement } from "react";
import { Text } from "React-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { SignInProps } from "./SignInProps";

export function GoogleSignIn({ onSignIn, style }: SignInProps): ReactElement {
    console.debug(`GoogleSignin: ${GoogleSignin}, onSignIn: ${onSignIn}, style: ${style}`);
    console.warn("Google Authentication is not supported, yet.");
    return <Text>Not supported</Text>;
}
