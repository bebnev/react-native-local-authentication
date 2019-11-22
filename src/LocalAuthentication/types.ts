export type BiometryType = 'TouchID' | 'FaceID' | 'Fingerprint' | 'None';

type UnexpectedBiometryStatus = {
    code: string;
    description?: string;
}

export type BiometryStatus = 'BiometryIsAvailable' | 'BiometryNotAvailable' | 'BiometryNotEnrolled' | 'BiometryLockout' | 'SystemCancel' | 'AppCancel' | 'UserFallback' | 'UserCancel' | 'InvalidContext' | 'PasscodeNotSet' | 'AuthenticationFailed' | UnexpectedBiometryStatus;

// interface IsAvailablePromise {
//     status: boolean;
//     error: BiometryError | null
// }

export interface LocalAuthenticationNativeModule {
    /**
     *  Check if device supports biometry
     */
    isSupportedAsync: () => Promise<boolean>;

    /**
     * Check if device scanner is available and has no errors
     */
    isAvailableAsync: () => Promise<boolean>;

    /**
     * Get current biometry status
     */
    getBiometryStatus: () => Promise<BiometryStatus>;
}