import { ReactElement, createElement } from "react";
import { NativeModules, ViewStyle } from "react-native";
import { Style, mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { FirebaseAuthProps } from "../typings/FirebaseAuthProps";
import { SignInHandler } from "./components/SignInProps";
import { AppleSignIn } from "./components/AppleSignIn";
import { GoogleSignIn } from "./components/GoogleSignIn";

export interface CustomStyle extends Style {
    button: ViewStyle;
}

const defaultStyles: CustomStyle = {
    button: {
        width: 160,
        height: 45
    }
};

let warningShowed = false;

export function FirebaseAuth(props: FirebaseAuthProps<CustomStyle>): ReactElement | null {
    const { signinType, uidAttr, nameAttr, emailAttr, photoUrlAttr, idTokenAttr, style } = props;

    // module is not supported
    if (!NativeModules.RNFBAuthModule) {
        if (!warningShowed) {
            console.warn("Missing native dependencies for FirebaseAuth.");
            warningShowed = true;
        }
        return null;
    }

    // Mendix styles
    const styles = mergeNativeStyles(defaultStyles, style);

    // on signin handler
    const onSignIn: SignInHandler = (identityToken, user) => {
        const { displayName, email, photoURL, uid } = user;
        // Forward response to Mendix
        if (uidAttr?.status === "available") {
            uidAttr.setValue(uid);
        }
        if (nameAttr?.status === "available" && displayName) {
            nameAttr.setValue(displayName);
        }
        if (emailAttr?.status === "available" && email) {
            emailAttr.setValue(email);
        }
        if (photoUrlAttr?.status === "available" && photoURL) {
            photoUrlAttr.setValue(photoURL);
        }
        if (idTokenAttr.status === "available" && identityToken) {
            idTokenAttr.setValue(identityToken);
        }
    };

    switch (signinType) {
        case "apple":
            return <AppleSignIn style={styles.button} onSignIn={onSignIn} />;
        case "google":
            return <GoogleSignIn style={styles.button} onSignIn={onSignIn} />;
        default:
            return null;
    }
}
