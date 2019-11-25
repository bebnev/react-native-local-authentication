import LocalAuthenticationNativeModule from '../LocalAuthentication/nativeModule';
import { BiometryTypeEnum } from '../LocalAuthentication/types';

export interface BiometrySelectSpec<T, F, N> {
    touchId?: T,
    faceId?: F,
    none?: N
};

/**
 * Select value by current biometry type
 *
 * @param spec
 */
function select<T, F, N>(spec: BiometrySelectSpec<T, F, N>): T | F | N | undefined {
    const biometryType = LocalAuthenticationNativeModule.biometryType;
    let key: 'faceId' | 'touchId' | undefined;

    switch(biometryType) {
        case BiometryTypeEnum.FaceID:
            key = 'faceId';
            break;
        case BiometryTypeEnum.TouchID:
            key = 'touchId';
            break;
    }

    return key === undefined ? spec.none : spec[key];
}

export const Biometry = {
    select
}
