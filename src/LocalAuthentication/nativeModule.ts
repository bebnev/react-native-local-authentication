
import { NativeModules } from 'react-native';
import {
    LocalAuthenticationNativeModule,
} from './types';

const LocalAuthentication: LocalAuthenticationNativeModule = NativeModules.RNLocalAuthentication;

if (!LocalAuthentication) {
    throw new Error('bebnev/rn-local-authentication: NativeModule.RNLocalAuthentication is null');
}

export default LocalAuthentication;
