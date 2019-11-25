import { useState, useEffect } from 'react';
import LocalAuthentication from '../LocalAuthentication';
import { BiometryStatus } from '../LocalAuthentication/types';

export default function useBiometryStatus(): BiometryStatus | undefined {
    const [biometryStatus, setBiometryStatus] = useState<BiometryStatus | undefined>();

    useEffect(() => {
        const fetchStatus = async () => {
            const newStatus: BiometryStatus = await LocalAuthentication.getBiometryStatusAsync();

            if (newStatus !== biometryStatus) {
                setBiometryStatus(newStatus);
            }
        }

        fetchStatus();
    });

    return biometryStatus;
}
