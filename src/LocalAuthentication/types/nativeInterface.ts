import { BiometryTypeEnum, BiometryStatus, BiometryType } from './biometry';
import { AuthenticateResponse, AuthenticateOptionsIOS } from './authentication';

export interface LocalAuthenticationNativeModule {
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
     * @param AuthenticateOptionsIOS options
     */
    authenticateAsync: (options: AuthenticateOptionsIOS) => Promise<AuthenticateResponse>;
}

export interface LocalAuthenticationInterface {
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
     * Get Biometry type
     *
     * @returns BiometryType
     */
    getBiometryType: () => BiometryType;

    /**
     * Authenticate user with their biometrics
     *
     * @param AuthenticateOptionsIOS options
     */
    authenticateAsync: (options: AuthenticateOptionsIOS) => Promise<AuthenticateResponse>;
}