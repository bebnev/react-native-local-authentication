export type BiometryTypeIOS = 'TouchID' | 'FaceID' | 'None';

export enum BiometryTypeIOSEnum {
    None = 0,
    TouchID = 1,
    FaceID = 2,
    Unknown = -1
}

export type BiometryStatusDefault = 'BiometryIsAvailable'
    | 'BiometryNotAvailable'
    | 'BiometryNotEnrolled'
    | 'BiometryLockout'
    | 'SystemCancel'
    | 'AppCancel'
    | 'UserFallback'
    | 'UserCancel'
    | 'InvalidContext'
    | 'PasscodeNotSet'
    | 'AuthenticationFailed';

export type BiometryStatusIOS = BiometryStatusDefault;

export type BiometryStatusAndroid = BiometryStatusDefault & ('BiometryTemporaryNotAvailable'
    | 'BiometryTemporaryLockout'
    | 'NoSpace'
    | 'Timeout'
    | 'UnableToProcess'
    | 'UnexpectedVendorError');

export type BiometryStatus = BiometryStatusIOS & BiometryStatusAndroid;
