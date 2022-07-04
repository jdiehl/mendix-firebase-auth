import { ReactElement, createElement } from "react";
import { ViewStyle } from "react-native";
import { AppleButton, appleAuth } from "@invertase/react-native-apple-authentication";

import { mergeNativeStyles, Style } from "@mendix/pluggable-widgets-tools";

import { AppleAuthProps } from "../typings/AppleAuthProps";
import { nameFromFullName } from "./helpers";

export interface CustomStyle extends Style {
    button: ViewStyle;
}

const defaultStyles: CustomStyle = {
    button: {
        width: 160,
        height: 45
    }
};

export function AppleAuth({
    nameAttr,
    emailAttr,
    idTokenAttr,
    onSignIn,
    style
}: AppleAuthProps<CustomStyle>): ReactElement {
    const styles = mergeNativeStyles(defaultStyles, style);

    async function onAppleButtonPress(): Promise<void> {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
        });

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated
            const { fullName, email, identityToken } = appleAuthRequestResponse;

            // Forward response to Mendix
            if (nameAttr?.status === "available" && fullName) {
                nameAttr.setValue(nameFromFullName(fullName));
            }
            if (emailAttr?.status === "available" && email) {
                emailAttr.setValue(email);
            }
            if (idTokenAttr.status === "available" && identityToken) {
                idTokenAttr.setValue(identityToken);
            }
            if (onSignIn?.canExecute) {
                onSignIn?.execute();
            }
        }
    }

    return (
        <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.button}
            onPress={onAppleButtonPress}
        />
    );
}
