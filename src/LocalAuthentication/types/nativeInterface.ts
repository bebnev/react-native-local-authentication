import { BiometryTypeIOSEnum, BiometryStatus, BiometryTypeIOS } from './biometry';
import {
    AuthenticateResponse, AuthenticateOptionsIOS, AuthenticateOptionsAndroid,
} from './authentication';

export interface LocalAuthenticationNativeModuleDefault {
    /**
     * Check if device supports biometry
     *
     * @returns Promise<boolean>
     */
    isSupportedAsync: () => Promise<boolean>;

    /**
     * Check if device scanner is available and has no errors
     *
     * @returns Promise<boolean>
     */
    isAvailableAsync: () => Promise<boolean>;

    /**
     * Get current biometry status
     *
     * @returns Promise<BiometryStatus>
     */
    getBiometryStatusAsync: () => Promise<BiometryStatus>;

    /**
     * Authenticate user with their biometrics
     *
     * @param AuthenticateOptionsIOS | AuthenticateOptionsAndroid options
     */
    authenticateAsync: (options: AuthenticateOptionsIOS | AuthenticateOptionsAndroid) => Promise<AuthenticateResponse>;
}

export interface LocalAuthenticationNativeModuleAndroid extends LocalAuthenticationNativeModuleDefault {
    release: () => void;
}

export interface LocalAuthenticationNativeModuleIOS extends LocalAuthenticationNativeModuleDefault {
    /**
     * Type of the biometry available on device
     */
    biometryType: BiometryTypeIOSEnum;

    /**
     * Flag that indicates whether reuse is available with Touch ID
     */
    isReuseAvailable: boolean;
}

export type LocalAuthenticationNativeModule = LocalAuthenticationNativeModuleIOS & LocalAuthenticationNativeModuleAndroid;

export interface LocalAuthenticationInterface {
    /**
     * Checks if device supports biometry
     *
     * @returns Promise<boolean>
     */
    isSupportedAsync: () => Promise<boolean>;

    /**
     * Checks if device scanner is available and has no errors
     *
     * @returns Promise<boolean>
     */
    isAvailableAsync: () => Promise<boolean>;

    /**
     * Get current biometry status
     *
     * @returns Promise<BiometryStatus>
     */
    getBiometryStatusAsync: () => Promise<BiometryStatus>;

    /**
     * Get Biometry type
     *
     * @returns BiometryTypeIOS | null
     */
    getBiometryType: () => BiometryTypeIOS | null;

    /**
     * Authenticate user with their biometrics
     *
     * @param AuthenticateOptionsIOS | AuthenticateOptionsAndroid options
     */
    authenticateAsync: (options: AuthenticateOptionsIOS | AuthenticateOptionsAndroid) => Promise<AuthenticateResponse>;

    /**
     * Release memory
     */
    release: () => void;

    /**
     * Check if reuse is available on the device
     *
     * @returns boolean
     */
    isReuseAvailable: () => boolean
}
