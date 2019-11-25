import LocalAuthenticationNativeModule from './nativeModule';
import { LocalAuthenticationInterface, BiometryType, BiometryTypeEnum } from './types';

const { isSupportedAsync, isAvailableAsync, getBiometryStatusAsync, biometryType, authenticateAsync } = LocalAuthenticationNativeModule;

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

export default {
    isSupportedAsync,
    isAvailableAsync,
    getBiometryStatusAsync,
    getBiometryType,
    authenticateAsync,
} as LocalAuthenticationInterface;
