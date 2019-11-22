import { useState, useEffect } from 'react';
import LocalAuthentication from '../LocalAuthentication/nativeModule';
import { BiometryStatus } from '../LocalAuthentication/types';

export default function useBiometryStatus(): BiometryStatus | undefined {
    const [biometryStatus, setBiometryStatus] = useState<BiometryStatus | undefined>();

    useEffect(() => {
        const fetchStatus = async () => {
            const newStatus: BiometryStatus = await LocalAuthentication.getBiometryStatus();

            if (newStatus !== biometryStatus) {
                setBiometryStatus(newStatus);
            }
        }

        fetchStatus();
    });

    return biometryStatus;
}
