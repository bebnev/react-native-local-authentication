# React Native Local Authentication API Reference

This reference lays out the current public methods for the React Native LocalAuthentication.

## Methods Index

- [`isSupportedAsync`](Api-Reference.md#issupportedasync)
- [`isAvailableAsync`](Api-Reference.md#isavailableasync)
- [`getBiometryStatusAsync`](Api-Reference.md#getbiometrystatusasync)
- [`getBiometryType`](Api-Reference.md#getbiometrytype)
- [`authenticateAsync`](Api-Reference.md#authenticateasync)
- [`isReuseAvailable`](Api-Reference.md#isreuseavailable)

## Utilities

- [`Biometry`](Api-Reference.md#biometry)
  - [`select`](Api-reference.md#select)
- [`getBiometryStatusDescription`](Api-Reference.md#getbiometrystatusdescription)

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


#### `getBiometryType()` (iOS only)

Method returns biometry type available on the device. Method works only for iOS. Android API does not tell work type of biometry you are working with.

This method is safe to call at Android, it will return `null`.

This method is synchronous.

```javascript

type BiometryTypeIOS = 'TouchID' | 'FaceID' | 'None';

LocalAuthentication.getBiometryType(): BiometryType;

```

**Examples**

```javascript

const biometryType = LocalAuthentication.getBiometryType();
// TouchID
// FaceID
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
type AuthenticateOptionsAndroid = {
    reason: string;
    fallbackEnabled?: boolean;
    fallbackTitle?: string;
    fallbackToPinCodeAction?: boolean;
    cancelTitle?:string;
    title?: string;
    description?: string;
}


LocalAuthentication.authenticateAsync(options: AuthenticateOptionsIOS | AuthenticateOptionsAndroid): Promise<AuthenticateResponse>;

```

More detailed Biometry status list is presented at [Errors Reference](Errors.md).

Authentication Request options list:

|key|type|required|description|iOS|Android|
|------|------|------|------|------|------|
|reason|string|yes|The app-provided reason (for Android: subtitle) for requesting authentication, which displays in the authentication dialog presented to the user.|✅|✅|
|fallbackEnabled|boolean|no|Flag that enable/disable fallback button (action in case of Android) in the dialog, presented to the user during authentication.|✅|✅|
|fallbackTitle|boolean|no|The localized title for the fallback button in the dialog presented to the user during authentication.|✅|❌|
|fallbackToPinCodeAction|boolean|no|Fallback user authentication to device passcode, password|✅|✅|
|cancelTitle|string|**iOS** - no<br/>**Android** - yes (if `fallbackToPinCodeAction` is not set to true)|The localized title for the cancel button in the dialog presented to the user during authentication. **Android only** - Cancel title should not be set if `fallbackToPinCodeAction` is set to true.|✅|✅|
|reuseDuration|number|no|The duration for which Touch ID authentication reuse is allowable.|✅|❌|
|title|string|no (Default: Biometric Login)|The app-provided title for biometry dialog. Default is - Biometric Login|❌|✅|
|description|string|no|The app-provided description for biometry dialog.|❌|✅|

Authorization response fields:

|field|type|description|
|------|------|------|
|success|boolean|Flag that shows, whether authorization was successful or not|
|error|string|Authorization Error (optional)|
|errorWarning|string|Last warning from native code(optional)|

`authenticateAsync` Promise could be rejected:
 - **iOS** - when no reason string was set;
 - **Android** - when no reason string was set;
 - **Android** - when nor `cancelTitle` and `fallbackToPinCodeAction` were set (one of them is important)
 - **Android** - when `cancelTitle` and `fallbackToPinCodeAction` (true) were set

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

#### `isReuseAvailable()`

Checks if reuse functions are available. This check only works for ios 9.0+ and only for touch id devices.

This method is synchronous.

```javascript

LocalAuthentication.isReuseAvailable(): boolean;

```

## Utilities

### Biometry

#### `select()`

Chooses something from passed in object by device biometry type.

**Android**

There is no way to determine biometry sensor that was used to authenticate user, so key `android` is used for `select` function.

```javascript

Biometry.select({
    touchId: {
        color: 'red'
    },
    faceId: {
        color: 'blue'
    },
    android: {
      color: 'yellow'
    },
    none: {
        color: 'white'
    }
})

```

### getBiometryStatusDescription()

Get some default description of the biometry status. If description is not found then status is returned back.

**Examples**

```javascript

import LocalAuthentication, {getBiometryStatusDescription} from "rn-local-authentication";

const status = await LocalAuthentication.getBiometryStatusAsync();

const description = getBiometryStatusDescription(status);

```