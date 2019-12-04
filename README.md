# React Native Local Authentication

The library helps you to authenticate users biometrically natively on both iOS and Android devices.

Inspired by [react-native-fingerprint-scanner](https://github.com/hieuvp/react-native-fingerprint-scanner) and Android [BiometricPrompt](https://developer.android.com/reference/androidx/biometric/BiometricPrompt.html) class that manages a system-provided biometric prompt.

**Under construction**

## Platforms Supported

- [x] iOS
- [x] Android

## Getting Started

Read [Getting Started Guide](docs/Getting-Started.md). If any step seems unclear, please create a detailed issue.

## TOC

- [Getting Started Guide](docs/Getting-Started.md)
- [API](docs/Api-Reference.md)
- [Errors](docs/Errors.md)
- [Versioning](#versioning)
- [Usage](#usage)
- [Hooks](docs/Hooks-Reference.md)

## Versioning

**Breaking History:**

- 0.0.1 - iOS authorization
- 0.0.4 - Android authorization

**Upcoming:**

- [ ] documentation
  - [ ] android installation details
  - [ ] ios examples
  - [ ] android examples

- [ ] may be check faceID permissions

## Usage

*iOS example*

Import `LocalAuthentication` from `rn-local-authentication` and use it like so:

```javascript

import React from 'react';
import { View } from 'react-native';
import LocalAuthentication from 'rn-local-authentication';

// ...
class MyComponent extends React.Component {
  componentDidMount() {
    LocalAuthentication.authenticateAsync({
      reason: "Authorize please!"
    }).then(response => {
      if (response.success) {
        console.log('Authorized successfully!');
      } else {
        console.log(`Something went wrong. Error: ${response.error}`);
      }
    })
  }

  render() {
    return (<View />);
  }

  // ...
}

```

*link to example launch*

## License

MIT
