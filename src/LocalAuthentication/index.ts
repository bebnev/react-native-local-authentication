import { Platform } from 'react-native';
import LocalAuthenticationNativeModule from './nativeModule';
import {
    LocalAuthenticationInterface,
    BiometryType,
    BiometryTypeEnum,
    AuthenticateOptionsIOS,
    AuthenticateResponse,
} from './types';

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
 * @return Promise<AuthenticateResponse>
 */
async function authenticateAsync(options: AuthenticateOptionsIOS): Promise<AuthenticateResponse> {
    const response: AuthenticateResponse = await nativeAuthenticateAsync(options);

    if (response.warning) {
        console.warn(response.warning);
    }

    return response;
}

/**
 * Release memory (for android)
 */
function release() {
    if (Platform.OS === 'android') {
        LocalAuthenticationNativeModule.release();
    }

    return null;
}

export default {
    isSupportedAsync,
    isAvailableAsync,
    getBiometryStatusAsync,
    getBiometryType,
    authenticateAsync,
    release,
} as LocalAuthenticationInterface;
