//
//  RNLocalAuthentication.h
//  RNLocalAuthentication
//
//  Created by Anton Bebnev on 20/11/2019.
//  Copyright © 2019 Anton Bebnev. All rights reserved.
//

#if __has_include("React/RCTBridgeModule.h") // React Native >= 0.40
#import <React/RCTBridgeModule.h>
#else // React Native < 0.40
#import "RCTBridgeModule.h"
#endif

#if __has_include(<React/RCTUtils.h>) // React Native >= 0.40
#import <React/RCTUtils.h>
#else // React Native < 0.40
#import "RCTUtils.h"
#endif

#import <LocalAuthentication/LocalAuthentication.h>

@interface RNLocalAuthentication : NSObject <RCTBridgeModule>
@property (class, nonatomic) NSInteger biometryType;
@end
