import { Platform } from 'react-native';
import LocalAuthenticationNativeModule from '../LocalAuthentication/nativeModule';
import { BiometryTypeIOSEnum } from '../LocalAuthentication/types';

export interface BiometrySelectSpec<T, F, N, A> {
    touchId?: T,
    faceId?: F,
    none?: N,
    android?: A
}

/**
 * Select value by current biometry type
 *
 * @param spec
 */
function select<T, F, N, A>(spec: BiometrySelectSpec<T, F, N, A>): T | F | N | A | undefined {
    if (Platform.OS === 'android') {
        return spec.android;
    }

    const biometryType = LocalAuthenticationNativeModule.biometryType;
    let key: 'faceId' | 'touchId' | undefined;

    switch (biometryType) {
        case BiometryTypeIOSEnum.FaceID:
            key = 'faceId';
            break;
        case BiometryTypeIOSEnum.TouchID:
            key = 'touchId';
            break;
    }

    return key === undefined ? spec.none : spec[key];
}

export const Biometry = {
    select,
};
