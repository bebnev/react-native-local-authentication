# React Native Local Authentication Error List

*missing android*

|Error Code|Error Description|iOS|Android|
|------|------|------|------|
|BiometryNotAvailable|Biometry is not available on the device|✔️||
|BiometryNotEnrolled|The user has no enrolled biometric identities|✔️||
|BiometryLockout|Biometry is locked because there were too many failed attempts|✔️||
|SystemCancel|The system canceled authentication|✔️|❌|
|AppCancel|The app canceled authentication|✔️|❌|
|UserFallback|The user tapped the fallback button in the authentication dialog, but no fallback is available for the authentication policy|✔️|❌|
|UserCancel|The user tapped the cancel button in the authentication dialog|✔️|❌|
|InvalidContext|The context was previously invalidated|✔️|❌|
|PasscodeNotSet|A passcode isn’t set on the device|✔️|❌|
|AuthenticationFailed|The user failed to provide valid credentials|✔️||

For more, read the [API Reference](docs/Api-Reference.md).