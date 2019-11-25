# React Native Local Authentication Getting Started Guide

1. Add rn-local-authentication to your dependencies

```sh
yarn add rn-local-authentication
```

or, for npm use

```sh
npm install rn-local-authentication --save
```

2. Link native dependencies

2.1 **react-native >= 0.60**

Autolinking will take care of the link step, but for iOS, don't forget to run `pod install` in `ios/` folder

If you haven't set up cocoapods yet, please refer to [that article](https://engineering.brigad.co/demystifying-react-native-modules-linking-ae6c017a6b4a)

2.2 **react-native < 0.60**

You have to call `link` command manualy:

```sh
react-native link rn-local-authentication
```

*For manual linking*, please refer to:
- [that article](https://engineering.brigad.co/demystifying-react-native-modules-linking-964399ec731b) for Android
- [react-native own tutorial](https://facebook.github.io/react-native/docs/linking-libraries-ios) for iOS

3. Additional step for FaceID devices:

**Important**

Include the `NSFaceIDUsageDescription` key in your app’s `Info.plist` file if your app allows biometric authentication. Otherwise, authorization requests may fail.

4. Import `LocalAuthentication` into your component

Minimal example with `ios`:

```javascript

import React from 'react';
import LocalAuthentication from 'rn-local-authentication';

class MyComponent extends React.Component {
    componentDidMount() {
        LocalAuthentication.authenticateAsync({
            reason: "Please, authenticate!"
        }).then(response => {
            if (response.success) {
                Alert.alert("Authenticated successfully!");
            } else {
                Alert.alert("Something went wrong");
            }
        })
    }

    render() {
        return <AnotherComponent />
    }
}

```

Minimal example with `android`:

*missing android*

Next, check out [Api Reference](Api-Reference.md)
