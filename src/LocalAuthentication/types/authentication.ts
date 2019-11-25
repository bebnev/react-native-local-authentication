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

export type AuthenticateOptionsIOS = {
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
     * The localized title for the cancel button in the dialog presented
     * to the user during authentication.
     */
    cancelTitle?:string;
    /**
     * The duration for which Touch ID authentication reuse is allowable.
     */
    reuseDuration?:number;
}
