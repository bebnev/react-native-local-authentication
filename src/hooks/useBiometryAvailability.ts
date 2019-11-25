import { useState, useEffect } from 'react';
import LocalAuthentication from '../LocalAuthentication';

export default function useBiometryAvailability() : boolean | undefined {
    const [isAvailable, setIsAvailable] = useState<boolean | undefined>();

    useEffect(() => {
        const fetchStatus = async () => {
            const availabilityStatus = await LocalAuthentication.isAvailableAsync();

            if (availabilityStatus !== isAvailable) {
                setIsAvailable(availabilityStatus);
            }
        }

        fetchStatus();
    });

    return isAvailable;
}