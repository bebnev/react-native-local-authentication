//
//  RNLocalAuthentication.m
//  RNLocalAuthentication
//
//  Created by Anton Bebnev on 20/11/2019.
//  Copyright © 2019 Anton Bebnev. All rights reserved.
//

#import "RNLocalAuthentication.h"

typedef NS_ENUM(NSInteger, RNLocalAuthenticationBiometry) {
    RNLocalAuthenticationBiometryNone = 0,
    RNLocalAuthenticationBiometryTouchID = 1,
    RNLocalAuthenticationBiometryFaceID = 2,
};

@implementation RNLocalAuthentication

static NSInteger _biometryType = -1;

@dynamic biometryType;

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

RCT_EXPORT_METHOD(isSupportedAsync:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self isSupported]));
}

RCT_EXPORT_METHOD(isAvailableAsync:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    LAContext *context = [LAContext new];
    NSError *error = nil;

    BOOL isAvailable = [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error];
    BOOL scannerStatus = isAvailable && error == nil;

    resolve(@(scannerStatus));
}

RCT_EXPORT_METHOD(getBiometryStatusAsync:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    LAContext *context = [LAContext new];
    NSError *error = nil;

    BOOL isAvailable = [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error];

    if (isAvailable) {
        resolve(@"BiometryIsAvailable");
    } else {
        NSString *errorDescription = [self convertErrorCode:error];

        if (errorDescription != nil) {
            resolve(errorDescription);
        } else {
            resolve([NSString stringWithFormat:@"%ld - %@", (long) error.code, error.localizedDescription]);
        }
    }
}

RCT_EXPORT_METHOD(authenticateAsync:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    // TODO: may be move warning to error codes ??? We have to decide whether missing reason is enough to fall into error state
    NSString *warningMessage;
    NSString *reason = options[@"reason"];
    BOOL fallbackEnabled = [options[@"fallbackEnabled"] boolValue];
    BOOL fallbackToPinCodeAction = [options[@"fallbackToPinCodeAction"] boolValue];

    // TODO: may be create authorization response type, same as for resolve ???
    if (reason == nil || [reason length] == 0) {
        return reject(@"ReasonNotSet", @"Reason for requesting authentication is not specified", nil);
    }

    // TODO: check this out
    // TODO: May be reject method ???
    if ([self isDeviceWithFaceID]) {
        NSString *usageDescription = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"NSFaceIDUsageDescription"];

        if (!usageDescription) {
            warningMessage = @"FaceID is available but has not been configured. To enable FaceID, include the NSFaceIDUsageDescription key in your app’s Info.plist file if your app allows biometric authentication. Otherwise, authorization requests may fail.";
        }
    }

    LAContext *context = [LAContext new];

    // fallback handling
    if (fallbackEnabled) {
        NSString *fallbackTitle = options[@"fallbackTitle"];

        if (fallbackTitle != nil && [fallbackTitle length] > 0) {
            context.localizedFallbackTitle = fallbackTitle;
        }
    } else {
        context.localizedFallbackTitle = @"";
    }

    // cancel button handling
    if (@available(iOS 10, *)) {
        NSString *cancelTitle = options[@"cancelTitle"];

        if (cancelTitle != nil && [cancelTitle length] > 0) {
            context.localizedCancelTitle = cancelTitle;
        }
    }

    // reuse duration for ios
    if (@available(iOS 9, *)) {
        if ([self isDeviceWithTouchID]) {
            double reuseDuration = [[options objectForKey:@"reuseDuration"] doubleValue];

            if (reuseDuration && reuseDuration > 0) {
                if (reuseDuration > LATouchIDAuthenticationMaximumAllowableReuseDuration) {
                    warningMessage = @"You have set reuse duration more than allowed. Default maximum duration will be used instead.";

                    reuseDuration = LATouchIDAuthenticationMaximumAllowableReuseDuration;
                }

                context.touchIDAuthenticationAllowableReuseDuration = reuseDuration;
            }
        }
    }

    LAPolicy policy = LAPolicyDeviceOwnerAuthenticationWithBiometrics;

    if (fallbackToPinCodeAction) {
        policy = LAPolicyDeviceOwnerAuthentication;
    }

    [context evaluatePolicy:policy
            localizedReason:reason
            reply:^(BOOL success, NSError *error) {
                resolve(
                    [self makeAuthorizationResponse:success withError:error withWarning:warningMessage]
                );
         }
    ];
}

- (NSDictionary *)makeAuthorizationResponse:(BOOL)success withError:(NSError *)error withWarning:(NSString *)warning
{
    NSString *errorDescription;

    if (error != nil) {
        errorDescription = [self convertErrorCode:error];

        if (errorDescription == nil) {
            errorDescription = [NSString stringWithFormat:@"%ld: %@", (long) error.code, error.localizedDescription];
        }
    }

    return @{
        @"success": [NSNumber numberWithBool:success],
        @"error": RCTNullIfNil(errorDescription),
        @"warning": RCTNullIfNil(warning)
    };
}

- (BOOL)isSupported
{
    return [self isSupportedWithContext:nil];
}

- (BOOL)isSupportedWithContext:(LAContext *)withContext
{
    LAContext *context = nil;
    NSError *error = nil;

    if (withContext != nil) {
        context = withContext;
    } else {
        context = [LAContext new];
    }

    BOOL isAvailable = [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error];
    BOOL isSupported;

    if (@available(iOS 11.0, *)) {
        isSupported = isAvailable || error.code != LAErrorBiometryNotAvailable;
    } else {
        isSupported = isAvailable || error.code != LAErrorTouchIDNotAvailable;
    }

    return isSupported;
}

- (NSString *)convertErrorCode:(NSError *)error
{
    if (@available(iOS 11.0, *)) {
        if (error.code == LAErrorBiometryNotAvailable) {
            return @"BiometryNotAvailable";
        } else if (error.code == LAErrorBiometryNotEnrolled) {
             return @"BiometryNotEnrolled";
        } else if (error.code == LAErrorBiometryLockout) {
            return @"BiometryLockout";
        }
    }

    switch (error.code) {
        case LAErrorSystemCancel:
            return @"SystemCancel";
        case LAErrorAppCancel:
            return @"AppCancel";
        case LAErrorTouchIDLockout:
            return @"BiometryLockout";
        case LAErrorUserFallback:
            return @"UserFallback";
        case LAErrorUserCancel:
            return @"UserCancel";
        case LAErrorTouchIDNotAvailable:
            return @"BiometryNotAvailable";
        case LAErrorInvalidContext:
            return @"InvalidContext";
        case LAErrorTouchIDNotEnrolled:
            return @"BiometryNotEnrolled";
        case LAErrorPasscodeNotSet:
            return @"PasscodeNotSet";
        case LAErrorAuthenticationFailed:
            return @"AuthenticationFailed";
        default:
            return nil;
    }
}

- (NSInteger)biometryType
{
    if (_biometryType == -1) {

        LAContext *context = [LAContext new];

        BOOL isSupported = [self isSupportedWithContext:context];

        if (isSupported) {
            if (@available(iOS 11.0, *)) {
                if (context.biometryType == LABiometryTypeFaceID) {
                    _biometryType = RNLocalAuthenticationBiometryFaceID;
                } else {
                    _biometryType = RNLocalAuthenticationBiometryTouchID;
                }
            } else {
                _biometryType = RNLocalAuthenticationBiometryTouchID;
            }
        } else {
            _biometryType = RNLocalAuthenticationBiometryNone;
        }
    }

    return _biometryType;
}

- (BOOL)isDeviceWithFaceID {
    return [self biometryType] == RNLocalAuthenticationBiometryFaceID;
}

- (BOOL)isDeviceWithTouchID {
    return [self biometryType] == RNLocalAuthenticationBiometryTouchID;
}

- (NSDictionary *)constantsToExport
{
  return @{ @"biometryType": [NSNumber numberWithInteger:[self biometryType]] };
}

@end
