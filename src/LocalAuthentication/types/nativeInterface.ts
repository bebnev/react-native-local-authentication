import { BiometryTypeEnum, BiometryStatus, BiometryType } from './biometry';
import {
    AuthenticateResponse,
    AuthenticateOptions,
} from './authentication';

export interface LocalAuthenticationNativeModuleDefault {
    /**
     * Type of the biometry available on device
     */
    biometryType: BiometryTypeEnum;

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
     * @param AuthenticateOptions options
     */
    authenticateAsync: (options: AuthenticateOptions) => Promise<AuthenticateResponse>;
}

export interface LocalAuthenticationNativeModuleAndroid extends LocalAuthenticationNativeModuleDefault {
    release: () => void;
}

export type LocalAuthenticationNativeModuleIOS = LocalAuthenticationNativeModuleDefault;

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
     * @returns BiometryType
     */
    getBiometryType: () => BiometryType;

    /**
     * Authenticate user with their biometrics
     *
     * @param AuthenticateOptionsIOS | AuthenticateOptionsAndroid options
     */
    authenticateAsync: (options: AuthenticateOptions) => Promise<AuthenticateResponse>;

    /**
     * Release memory
     */
    release: () => void;
}
