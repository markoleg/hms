"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";

export default function CaptchaProvider({
    children,
    recaptchaKey
}: {
    children: React.ReactNode,
    recaptchaKey?: string
}) {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
            {children}
        </GoogleReCaptchaProvider>
    );
}