import { AppleRequestResponseFullName } from "@invertase/react-native-apple-authentication";

export function nameFromFullName(fullName: AppleRequestResponseFullName): string {
    if (fullName.nickname) {
        return fullName.nickname;
    }
    if (fullName.givenName && fullName.familyName) {
        return `${fullName.givenName} ${fullName.familyName}`;
    }
    if (fullName.givenName) {
        return fullName.givenName;
    }
    if (fullName.familyName) {
        return fullName.familyName;
    }
    return "";
}
