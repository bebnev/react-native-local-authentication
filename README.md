# React Native Local Authentication

The library helps you to authenticate users biometrically

Inspired by [react-native-fingerprint-scanner](https://github.com/hieuvp/react-native-fingerprint-scanner)

**Under construction**

## TODO List

* [x] - project stub
    - [x] - eslint (react-native-community)
    - [x] - prettier (react-native-community)
    - [x] - ios project
    - [ ] - android project
* [x] - typescript
* [ ] - ios authentication (*need detalization*)
    - Basic functions:
      * [x] - isSupportedAsync(): Promise<boolean>
      * [x] - isAvailableAsync(): Promise<boolean>
        * [x] - useBiometryAvailability()
      * [x] - getBiometryStatus(): Promise<BiometryStatus>
        * [x] - useBiometryStatus()
      * [ ] - getBiometryType
        * [ ] - Biometry.select

```javascript

                Biometry.select({
                  touchId: {},
                  faceId: {},
                  fingerprint?: {}
                })

```
  * [ ] authenticate
      - fallback
        - enable/disable
        - change text
      - cancel title
        - change text
      - reuse duration (touchID only)
      - error handling
      - invalidate
* [ ] - android authentication (*need detalization*)
    - authenticate
    - release
    - getBiometryType
    - BiometryPrompt (experimental namespace)
* [ ] - readme
  * [ ] - hooks
  * [ ] - errors
