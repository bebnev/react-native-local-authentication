import LocalAuthenticationNativeModule from './nativeModule';
import { LocalAuthenticationInterface, BiometryType, BiometryTypeEnum, AuthenticateOptionsIOS } from './types';

const { isSupportedAsync, isAvailableAsync, getBiometryStatusAsync, biometryType, authenticateAsync: nativeAuthenticateAsync } = LocalAuthenticationNativeModule;

/**
 * Get device supported biometry type
 *
 * @returns BiometryType
 */
function getBiometryType(): BiometryType {
    switch (biometryType) {
        case BiometryTypeEnum.FaceID:
            return 'FaceID';
        case BiometryTypeEnum.TouchID:
            return 'TouchID';
        default:
            return 'None';
    }
}

/**
 * Authenticate user with their biometrics
 *
 * @param options AuthenticateOptionsIOS
 */
async function authenticateAsync(options: AuthenticateOptionsIOS) {
    const response = await nativeAuthenticateAsync(options);

    if (response.warning) {
        console.warn(response.warning);
    }

    return response;
}

export default {
    isSupportedAsync,
    isAvailableAsync,
    getBiometryStatusAsync,
    getBiometryType,
    authenticateAsync,
} as LocalAuthenticationInterface;
