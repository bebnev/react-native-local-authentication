# React Native Local Authentication API Reference

This reference lays out the current public methods for the React Native LocalAuthentication.

## Methods Index

- [`isSupportedAsync`](Api-Reference.md#issupportedasync)
- [`isAvailableAsync`](Api-Reference.md#isavailableasync)
- [`getBiometryStatusAsync`](Api-Reference.md#getbiometrystatusasync)
- [`getBiometryType`](Api-Reference.md#getbiometrytype)
- [`authenticateAsync`](Api-Reference.md#authenticateasync)

## Utilities

- [`Biometry`](Api-Reference.md#biometry)
  - [`select`](Api-reference.md#select)

## Reference

### Methods

#### `isSupportedAsync()`

Checks if device supports biometry.

```javascript

LocalAuthentication.isSupportedAsync(): Promise<boolean>;

```

**Examples**

```javascript

LocalAuthentication.isSupportedAsync().then(status => {
    // true/false
})

```

#### `isAvailableAsync()`

Checks if device scanner is available and has no errors.

```javascript

LocalAuthentication.isAvailableAsync(): Promise<boolean>;

```

**Examples**

```javascript

LocalAuthentication.isAvailableAsync().then(isAvailable => {
    // true/false
})

```

API is available with [`useBiometryAvailability hook`](Hooks-Reference.md#usebiometryavailability)


#### `getBiometryType()`

Gets device Biometry type.

This method is synchronous.

```javascript

type BiometryType = 'TouchID' | 'FaceID' | 'Fingerprint' | 'None';

LocalAuthentication.getBiometryType(): BiometryType;

```

**Examples**

```javascript

const biometryType = LocalAuthentication.getBiometryType();
// TouchID
// FaceID
// Fingerprint
// None

```

#### `getBiometryStatusAsync()`

Get current status of the biometry scanner.

```javascript

LocalAuthentication.getBiometryStatusAsync(): Promise<BiometryStatus>;

```

More detailed Biometry status list is presented at [Errors Reference](Errors.md).

**Examples**

```javascript

const biometryStatus = await LocalAuthentication.getBiometryStatusAsync();
// BiometryIsAvailable
// BiometryNotAvailable
// BiometryLockout
// AuthenticationFailed
// ....

```

API is available with [`useBiometryStatus hook`](Hooks-Reference.md#usebiometrystatus)

#### `authenticateAsync()`

Authenticate user with their biometrics.

```javascript

type AuthenticateResponse = {
    success: boolean;
    error?: BiometryStatus;
    warning?: string;
};

type AuthenticateOptionsIOS = {
    reason: string;
    fallbackEnabled?: boolean;
    fallbackTitle?: string;
    fallbackToPinCodeAction?: boolean;
    cancelTitle?:string;
    reuseDuration?:number;
}

LocalAuthentication.authenticateAsync(options: AuthenticateOptionsIOS): Promise<AuthenticateResponse>;

```

More detailed Biometry status list is presented at [Errors Reference](Errors.md).

Authentication Request options list:

|key|type|required|description|iOS|Android|
|------|------|------|------|------|------|
|reason|string|yes|The app-provided reason for requesting authentication, which displays in the authentication dialog presented to the user|✔️||
|fallbackEnabled|boolean|no|Flag that enable/disable fallback button in the dialog, presented to the user during authentication.|✔️||
|fallbackTitle|boolean|no|The localized title for the fallback button in the dialog presented to the user during authentication.|✔️||
|fallbackToPinCodeAction|boolean|no|Fallback user authentication to device passcode|||
|cancelTitle|string|no|The localized title for the cancel button in the dialog presented to the user during authentication.|✔️||
|reuseDuration|number|no|The duration for which Touch ID authentication reuse is allowable.|✔️||

Authorization response fields:

|field|type|description|
|------|------|------|
|success|boolean|Flag that shows, whether authorization was successful or not|
|error|string|Authorization Error (optional)|
|errorWarning|string|Last warning from native code(optional)|

`authenticateAsync` Promise could be rejected when no reason string was set.

**Examples**

```javascript

const authenticationStatus = await LocalAuthentication.authenticateAsync({
    reason: "Very important reason to authenticate"
});
// {
//      success: true,
//      error: null,
//      warning: null
// }

// ...

const authenticationStatus = await LocalAuthentication.authenticateAsync({
    reason: "Very important reason to authenticate"
});
// {
//      success: false,
//      error: "BiometryLockout",
//      warning: null
// }

// ...

const authenticationStatus = await LocalAuthentication.authenticateAsync({
    reason: "Very important reason to authenticate"
});
// {
//      success: false,
//      error: "SystemCancel",
//      warning: "FaceID is available but has not been configured. To enable FaceID, include //      the NSFaceIDUsageDescription key in your app’s Info.plist file if your app allows
//      biometric authentication. Otherwise, authorization requests may fail."
// }

// ...

const authenticationStatus = await LocalAuthentication.authenticateAsync({
    reason: "Very important reason to authenticate",
    fallbackEnabled: true,
    fallbackTitle: "Enter password",
    cancelTitle: "Cancel",
    reuseDuration: "300"
});
// {
//      success: true,
//      error: null,
//      warning: null
// }

```


## Utilities

### Biometry

#### `select()`

Chooses something from passed in object by device biometry type.

```javascript

Biometry.select({
    touchId: {
        color: 'red'
    },
    faceId: {
        color: 'blue'
    },
    fingerprint: {
        color: 'black'
    },
    none: {
        color: 'white'
    }
})

```