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
     * The app-provided reason for requesting authentication, which displays
     * in the authentication dialog presented to the user
     */
    reason: string;
    /**
     * Flag that enable/disable fallback button in the dialog, presented
     * to the user during authentication.
     */
    fallbackEnabled?: boolean;
    /**
     * The localized title for the fallback button in the dialog presented
     * to the user during authentication.
     */
    fallbackTitle?: string;
    /**
     * Fallback user authentication to device passcode
     */
    fallbackToPinCodeAction?: boolean;
    /**
     * The duration for which Touch ID authentication reuse is allowable.
     * Duration in seconds.
     */
    reuseDuration?:number;
}

export type AuthenticateOptionsIOS = AuthenticateOptionsDefault & {
    /**
     * The localized title for the cancel button in the dialog presented
     * to the user during authentication.
     */
    cancelTitle?:string;
};

export type AuthenticateOptionsAndroid = AuthenticateOptionsDefault & {
    /**
     * The app-provided title for biometry dialog. Default is - Biometric Login
     */
    title?: string;
    /**
     * Set the description to display in biometry dialog.
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

export type AuthenticateOptions = AuthenticateOptionsIOS & AuthenticateOptionsAndroid;
