/**
 * This file was generated from AppleAuth.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";

export interface AppleAuthProps<Style> {
    name: string;
    style: Style[];
    nameAttr?: EditableValue<string>;
    emailAttr?: EditableValue<string>;
    idTokenAttr: EditableValue<string>;
}

export interface AppleAuthPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    onSignIn: {} | null;
    nameAttr: string;
    emailAttr: string;
    idTokenAttr: string;
}
