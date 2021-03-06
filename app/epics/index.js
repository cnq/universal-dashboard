﻿import { combineEpics } from 'redux-observable';
import { initiateSigninEpic, signinRequestEpic, initiateCheckSigninEpic, checkSigninRequestEpic } from './SigninEpic';
import { initiateSignoutEpic, signoutRequestEpic } from './SignoutEpic';
import { loadAppListOnCheckSigninSuccessfulEpic, initializeAppListEpic, startAppListFetchEpic, appListFetchEpic, appListRefreshEpic, appListRefreshStartConstantEpic, appListRefreshSuccessEpic } from './AppListEpic';
import { initializeUserListEpic, startUserListFetchEpic, userListFetchEpic } from './UserListEpic';
import { initializeUserCreateEpic, startUserCreateEpic, userCreateRequestEpic, initializeUserActivateEpic, startUserActivateEpic, userActivateRequestEpic, initializeUserSetupEpic, startUserSetupEpic, userSetupRequestEpic, userSetupSuccessEpic, initializeUserDeleteEpic, startUserDeleteEpic, userDeleteRequestEpic, initializeUserChangePasswordEpic, startUserChangePasswordEpic, userChangePasswordRequestEpic, initializeUserResetPasswordEpic, startUserResetPasswordEpic, userResetPasswordRequestEpic, initializeUserChangeRolesEpic, startUserChangeRolesEpic, userChangeRolesRequestEpic } from './UserEpic';
import { initializeAppCreateEpic, startAppCreateEpic, appCreateRequestEpic, initializeAppDeleteEpic, startAppDeleteEpic, appDeleteRequestEpic } from './AppEpic';
import { initializeConnectionCreateEpic, startConnectionCreateEpic, connectionCreateRequestEpic, initializeConnectionDeleteEpic, startConnectionDeleteEpic, connectionDeleteRequestEpic } from './ConnectionEpic';
import { initializeSubscriptionFetchEpic, startSubscriptionFetchEpic, subscriptionFetchRequestEpic, initializeSubscriptionManageEpic, startSubscriptionManageEpic, subscriptionManageRequestEpic, initializeSubscriptionUpdateEpic, startSubscriptionUpdateEpic, subscriptionUpdateRequestEpic, signinSuccessSubscriptionFetchEpic, checkSigninSuccessSubscriptionFetchEpic } from './SubscriptionEpic';
//import { <TYPE> } from './PATH-TO-REDUCER-WITHOUT-EXTENSION';

export const combinedEpic = combineEpics(
  initiateSigninEpic,
  signinRequestEpic, 
  initiateCheckSigninEpic, 
  checkSigninRequestEpic,
  initiateSignoutEpic, 
  signoutRequestEpic, 
  loadAppListOnCheckSigninSuccessfulEpic,
  initializeAppListEpic,
  startAppListFetchEpic,
  appListFetchEpic,
  appListRefreshEpic,
  appListRefreshStartConstantEpic, 
  appListRefreshSuccessEpic,
  initializeUserListEpic, 
  startUserListFetchEpic, 
  userListFetchEpic,
  initializeUserCreateEpic, 
  startUserCreateEpic,
  userCreateRequestEpic, 
  initializeUserActivateEpic, 
  startUserActivateEpic, 
  userActivateRequestEpic,
  initializeUserSetupEpic, 
  startUserSetupEpic, 
  userSetupRequestEpic,
  userSetupSuccessEpic,
  initializeUserDeleteEpic, 
  startUserDeleteEpic, 
  userDeleteRequestEpic,
  initializeUserChangePasswordEpic, 
  startUserChangePasswordEpic, 
  userChangePasswordRequestEpic, 
  initializeUserResetPasswordEpic, 
  startUserResetPasswordEpic, 
  userResetPasswordRequestEpic, 
  initializeUserChangeRolesEpic, 
  startUserChangeRolesEpic, 
  userChangeRolesRequestEpic,
  initializeAppCreateEpic,
  startAppCreateEpic, 
  appCreateRequestEpic, 
  initializeAppDeleteEpic, 
  startAppDeleteEpic,  
  appDeleteRequestEpic,
  initializeConnectionCreateEpic, 
  startConnectionCreateEpic,  
  connectionCreateRequestEpic, 
  initializeConnectionDeleteEpic, 
  startConnectionDeleteEpic,  
  connectionDeleteRequestEpic,
  initializeSubscriptionManageEpic, 
  startSubscriptionManageEpic, 
  subscriptionManageRequestEpic,
  initializeSubscriptionFetchEpic, 
  startSubscriptionFetchEpic, 
  subscriptionFetchRequestEpic, 
  initializeSubscriptionUpdateEpic, 
  startSubscriptionUpdateEpic, 
  subscriptionUpdateRequestEpic, 
  signinSuccessSubscriptionFetchEpic, 
  checkSigninSuccessSubscriptionFetchEpic

  //LIST HERE
);
