
import { NativeModules } from 'react-native';
import { LocalAuthenticationNativeModule } from './types';

const LocalAuthentication: LocalAuthenticationNativeModule | undefined = NativeModules.RNLocalAuthentication;

if (!LocalAuthentication) {
    throw new Error('bebnev/rn-local-authentication: NativeModule.RNDeviceInfo is null');
}

export default LocalAuthentication as LocalAuthenticationNativeModule;
