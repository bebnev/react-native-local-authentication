//
//  RNLocalAuthentication.m
//  RNLocalAuthentication
//
//  Created by Anton Bebnev on 20/11/2019.
//  Copyright © 2019 Anton Bebnev. All rights reserved.
//

#import "RNLocalAuthentication.h"

@implementation RNLocalAuthentication

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(isSupportedAsync:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    LAContext *context = [LAContext new];
    NSError *error = nil;
    
    BOOL isAvailable = [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error];
    BOOL isSupported;
    
    if (@available(iOS 11.0, *)) {
        isSupported = isAvailable || error.code != LAErrorBiometryNotAvailable;
    } else {
        isSupported = isAvailable || error.code != LAErrorTouchIDNotAvailable;
    }
    
    resolve(@(isSupported));
}

RCT_EXPORT_METHOD(isAvailableAsync:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    LAContext *context = [LAContext new];
    NSError *error = nil;
    
    BOOL isAvailable = [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error];
    BOOL scannerStatus = isAvailable && error == nil;
    
    resolve(@(scannerStatus));
}

RCT_EXPORT_METHOD(getBiometryStatus:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
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
            NSDictionary *unexpectedError = @{
                @"code": [NSString stringWithFormat:@"%ld", (long) error.code],
                @"description": [NSString stringWithFormat:@"%@", error.localizedDescription]
            };
            
            resolve(unexpectedError);
        }
    }
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
            //return [@"unknown: " stringByAppendingFormat:@"%ld, %@", (long) error.code, error.localizedDescription];
    }
}



@end
