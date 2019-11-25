
import { NativeModules } from 'react-native';
import { LocalAuthenticationNativeModule } from "./types";

const LocalAuthentication: LocalAuthenticationNativeModule | undefined = NativeModules.RNLocalAuthentication;

if (!LocalAuthentication) {
    throw new Error('bebnev/rn-local-authemtication: NativeModule.RNDeviceInfo is null');
}

export default LocalAuthentication as LocalAuthenticationNativeModule;