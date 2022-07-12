import { createElement, ReactElement } from "react";
import { appleAuth, AppleButton } from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";

import { SignInProps } from "./SignInProps";

export function AppleSignIn({ onSignIn, style }: SignInProps): ReactElement {
    const onPress = async (): Promise<void> => {
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
        });

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw new Error("Apple Sign-In failed - no identify token returned");
        }

        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

        // Sign the user in with the credential
        const userCredentials = await auth().signInWithCredential(appleCredential);

        onSignIn(identityToken, userCredentials.user);
    };

    const { width, height } = style;

    return (
        <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{ width, height }}
            onPress={onPress}
        />
    );
}
