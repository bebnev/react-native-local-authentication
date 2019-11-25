# React Native Local Authentication

The library helps you to authenticate users biometrically

Inspired by [react-native-fingerprint-scanner](https://github.com/hieuvp/react-native-fingerprint-scanner)

**Under construction**

## Platforms Supported

- [x] iOS
- [ ] Android

## Getting Started

Read [Getting Started Guide](docs/Getting-Started.md). If any step seems unclear, please create a detailed issue.

## TOC

- [Getting Started Guide](docs/Getting-Started.md)
- [API](docs/Api-Reference.md)
- [Errors](docs/Errors.md)

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
      * [x] - getBiometryType(): BiometryType
        * [x] - Biometry.select()

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
