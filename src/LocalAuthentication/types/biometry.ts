export type BiometryType = 'TouchID' | 'FaceID' | 'Fingerprint' | 'None';

export enum BiometryTypeEnum {
    None = 0,
    TouchID = 1,
    FaceID = 2,
    Unknown = -1
}

export type UnexpectedBiometryStatus = {
    code: string;
    description?: string;
}

export type BiometryStatus = 'BiometryIsAvailable' | 'BiometryNotAvailable' | 'BiometryNotEnrolled' | 'BiometryLockout' | 'SystemCancel' | 'AppCancel' | 'UserFallback' | 'UserCancel' | 'InvalidContext' | 'PasscodeNotSet' | 'AuthenticationFailed' | UnexpectedBiometryStatus;