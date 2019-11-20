export type BiometryType = 'TouchID' | 'FaceID' | 'Fingerprint' | 'None';

export interface LocalAuthenticationNativeModule {
    isSupported: () => Promise<boolean>;
    isAvailable: () => Promise<boolean>;
    getBiometryType: () => Promise<BiometryType>;
}
