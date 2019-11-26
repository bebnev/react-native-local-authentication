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

#### `isAvailableAsync()`

Checks if device scanner is available and has no errors.

```javascript

LocalAuthentication.isAvailableAsync(): Promise<boolean>;

```


#### `getBiometryType()`

Gets device Biometry type.

This method is synchronous.

```javascript

type BiometryType = 'TouchID' | 'FaceID' | 'Fingerprint' | 'None';

LocalAuthentication.getBiometryType(): BiometryType;

```


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

Authentication Request availalble options list:

|key|type|require|description|iOS|Android|
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