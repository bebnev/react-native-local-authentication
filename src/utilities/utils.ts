import { BiometryStatus } from '../LocalAuthentication/types';

export const getBiometryStatusDescription = (code: BiometryStatus) => {
    switch (code) {
        case 'BiometryNotAvailable':
            return 'Biometry is not available on the device';
        case 'BiometryNotEnrolled':
            return 'The user has no enrolled biometric identities';
        case 'BiometryLockout':
            return 'Biometry is locked because there were too many failed attempts. Biometric authentication is disabled until the user unlocks with strong authentication (PIN/Pattern/Password)';
        case 'SystemCancel':
            return 'The system canceled authentication';
        case 'AppCancel':
            return 'The app canceled authentication';
        case 'UserFallback':
            return 'The user tapped the fallback button in the authentication dialog, but no fallback is available for the authentication policy';
        case 'UserCancel':
            return 'The user tapped the cancel button in the authentication dialog';
        case 'InvalidContext':
            return 'The context was previously invalidated';
        case 'PasscodeNotSet':
            return 'The device does not have pin, pattern, or password set up.';
        case 'AuthenticationFailed':
            return 'The user failed to provide valid credentials';
        case 'BiometryTemporaryNotAvailable':
            return 'The hardware is unavailable. Try again later.';
        case 'BiometryTemporaryLockout':
            return 'The operation was canceled because the API is locked out due to too many attempts. This occurs after 5 failed attempts, and lasts for 30 second.';
        case 'NoSpace':
            return 'Error state returned for operations like enrollment; the operation cannot be completed because there\'s not enough storage remaining to complete the operation';
        case 'Timeout':
            return 'Error state returned when the current request has been running too long. This is intended to prevent programs from waiting for the biometric sensor indefinitely. The timeout is platform and sensor-specific, but is generally on the order of 30 seconds.';
        case 'UnableToProcess':
            return 'Error state returned when the sensor was unable to process the current image';
        case 'UnexpectedVendorError':
            return 'Hardware vendors may extend this list if there are conditions that do not fall under one of the above categories. Vendors are responsible for providing error strings for these errors. These messages are typically reserved for internal operations such as enrollment, but may be used to express vendor errors not otherwise covered. Applications are expected to show the error message string if they happen, but are advised not to rely on the message id since they will be device and vendor-specific';
        case 'ReasonNotSet':
            return 'Reason for requesting authentication is not specified';
        case 'CancelTitleNotSet':
            return 'Android. Cancel button text must be set and non-empty';
        default:
            return code;
    }
};
