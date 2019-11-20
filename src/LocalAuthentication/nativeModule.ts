import { NativeModules } from 'react-native';
import { LocalAuthenticationNativeModule } from './types';

const LocalAuthentication: LocalAuthenticationNativeModule | undefined = NativeModules.RNLocalAuthentication;

export default LocalAuthentication as LocalAuthenticationNativeModule;
