# React Native Local Authentication Error List

*missing android*

|Error Code|Error Description|iOS|Android|
|------|------|------|------|
|BiometryNotAvailable|Biometry is not available on the device|✅|✅|
|BiometryTemporaryNotAvailable|The hardware is unavailable. Try again later.|❌|✅|
|BiometryNotEnrolled|The user has no enrolled biometric identities|✅|✅|
|BiometryLockout|Biometry is locked because there were too many failed attempts. Biometric authentication is disabled until the user unlocks with strong authentication (PIN/Pattern/Password)|✅|✅|
|BiometryTemporaryLockout|The operation was canceled because the API is locked out due to too many attempts. This occurs after 5 failed attempts, and lasts for 30 seconds.|❌|✅|
|SystemCancel|The system canceled authentication|✅|✅|
|AppCancel|The app canceled authentication|✅|❌|
|UserFallback|The user tapped the fallback button in the authentication dialog, but no fallback is available for the authentication policy|✅|✅|
|UserCancel|The user tapped the cancel button in the authentication dialog|✅|✅|
|InvalidContext|The context was previously invalidated|✅|❌|
|PasscodeNotSet|The device does not have pin, pattern, or password set up.|✅|✅|
|AuthenticationFailed|The user failed to provide valid credentials|✅|✅|
|NoSpace|Error state returned for operations like enrollment; the operation cannot be completed because there's not enough storage remaining to complete the operation.|❌|✅|
|Timeout|Error state returned when the current request has been running too long. This is intended to<br/>prevent programs from waiting for the biometric sensor indefinitely. The timeout is platform<br/>and sensor-specific, but is generally on the order of 30 seconds.|❌|✅|
|UnableToProcess|Error state returned when the sensor was unable to process the current image.|❌|✅|
|UnexpectedVendorError|Hardware vendors may extend this list if there are conditions that do not fall under one of <br />the above categories. Vendors are responsible for providing error strings for these errors.<br/>These messages are typically reserved for internal operations such as enrollment, but may be<br/>used to express vendor errors not otherwise covered. Applications are expected to show the<br/>error message string if they happen, but are advised not to rely on the message id since they<br/>will be device and vendor-specific|❌|✅|

For more, read the [API Reference](docs/Api-Reference.md).