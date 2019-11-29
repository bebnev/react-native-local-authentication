import { BiometryStatus } from './biometry';

export type AuthenticateResponse = {
    /**
     * Status of the authentication request
     */
    success: boolean;
    /**
     * Biometry status in case of error
     */
    error?: BiometryStatus;
    /**
     * Possible warnings
     */
    warning?: string;
};

export type AuthenticateOptionsDefault = {
    /**
     * The app-provided reason (for Android: subtitle) for requesting authentication, which displays
     * in the authentication dialog presented to the user
     */
    reason: string;
    /**
     * Flag that enable/disable fallback button (action in case of Android) in the dialog, presented
     * to the user during authentication.
     */
    fallbackEnabled?: boolean;
    /**
     * Fallback user authentication to device passcode, password
     */
    fallbackToPinCodeAction?: boolean;
    /**
     * The localized title for the cancel button in the dialog presented
     * to the user during authentication.
     */
    cancelTitle?:string;
}

export type AuthenticateOptionsIOS = AuthenticateOptionsDefault & {
    /**
     * The duration for which Touch ID authentication reuse is allowable.
     * Duration in seconds.
     */
    reuseDuration?:number;
    /**
     * The localized title for the fallback button in the dialog presented
     * to the user during authentication.
     */
    fallbackTitle?: string;
};

export type AuthenticateOptionsAndroid = AuthenticateOptionsDefault & {
    /**
     * The app-provided title for biometry dialog. Default is - Biometric Login
     */
    title?: string;
    /**
     * The app-provided description for biometry dialog.
     */
    description?: string;
    /**
     * The localized title for the negative button in the dialog presented
     * to the user during authentication. This would typically be used as a "Cancel" button, but may be also used to
     * show an alternative method for authentication, such as screen that asks for a backup password.
     * Negative button text should not be set if `fallbackToPinCodeAction` is set to true.
     */
    cancelTitle?:string;
};
