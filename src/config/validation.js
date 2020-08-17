// import React from 'react';
import { Alert } from 'react-native';
import Lang from '@src/config/localization';
import APP_CONSTANT from '@constant/appConstant';

const validator = require('validator');
const _ = require('lodash');

const passwordPattern = /^(?=(.*[\d]){1,}).{6,}$/;
const mailPattern = '^[^<>()[\\]\\\\,;:\\%#^\\s@\\"$?&!@]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]+\\.)+[a-zA-Z]{2,}))$';


/**
 * Validate SignUp Details
 * @param {*} param0 
 */
export const validateSignUp = ({ fullName, mobileNumber, emailId, password, confirmPassword, dob }) => {
    const { k_invalid_email } = Lang.signUpScreen;
    const { k_empty_full_name, k_empty_mobile_number, k_empty_password, k_valid_password, k_empty_confirm_password, k_invalid_match_password, k_invalid_mobile_number, k_empty_dob } = Lang.commonMessage;

    if (validator.isEmpty(fullName)) {
        Alert.alert(Lang.appName, k_empty_full_name)
        return false;
    }

    if (validator.isEmpty(mobileNumber)) {
        Alert.alert(Lang.appName, k_empty_mobile_number)
        return false;
    }

    if (mobileNumber.trim().length < 7) {
        Alert.alert(Lang.appName, k_invalid_mobile_number)
        return false;
    }

    if (!validator.isNumeric(mobileNumber)) {
        Alert.alert(Lang.appName, k_invalid_mobile_number)
        return false;
    }

    if (!validator.isEmpty(emailId)) {
        if (!emailId.match(mailPattern)) {
            Alert.alert(Lang.appName, k_invalid_email)
            return false;
        }
    }

    if (validator.isEmpty(password)) {
        Alert.alert(Lang.appName, k_empty_password)
        return false;
    }

    if (!password.match(passwordPattern)) {
        Alert.alert(Lang.appName, k_valid_password)
        return false;
    }

    if (validator.isEmpty(confirmPassword)) {
        Alert.alert(Lang.appName, k_empty_confirm_password)
        return false;
    }

    if (!validator.equals(confirmPassword, password)) {
        Alert.alert(Lang.appName, k_invalid_match_password)
        return false;
    }

    return true;
};

/**
 * Validating SignIn Details
 * @param {String} userName 
 * @param {String} password 
 */
export const validateSignIn = ({ phoneNumber, password }) => {
    const { k_empty_mobile_number, k_empty_password, k_invalid_mobile_number } = Lang.commonMessage;

    if (validator.isEmpty(phoneNumber)) {
        Alert.alert(Lang.appName, k_empty_mobile_number)
        return false;
    }

    if (phoneNumber.trim().length < 7) {
        Alert.alert(Lang.appName, k_invalid_mobile_number)
        return false;
    }

    if (!validator.isNumeric(phoneNumber)) {
        Alert.alert(Lang.appName, k_invalid_mobile_number)
        return false;
    }

    if (validator.isEmpty(password)) {
        Alert.alert(Lang.appName, k_empty_password)
        return false;
    }

    return true;
};

/**
 * Validating  Set New Password
 * @param {String} newPassword 
 * @param {String} confirmNewPassword 
 */
export const validateSetNewPassword = ({ newPassword, confirmNewPassword }) => {
    const { k_empty_new_password, k_invalid_new_password, k_empty_confirm_password } = Lang.setNewPasswordScreen
    const { k_valid_password } = Lang.commonMessage

    if (validator.isEmpty(newPassword)) {
        Alert.alert(Lang.appName, k_empty_new_password)
        return false;
    }

    if (!newPassword.match(passwordPattern)) {
        Alert.alert(Lang.appName, k_invalid_new_password)
        return false;
    }

    if (validator.isEmpty(confirmNewPassword)) {
        Alert.alert(Lang.appName, k_empty_confirm_password)
        return false;
    }

    if (!validator.equals(newPassword, confirmNewPassword)) {
        Alert.alert(Lang.appName, k_valid_password)
        return false;
    }

    return true;
}

/**
 * Validating Change password
 * @param {String} currentPassword 
 * @param {String} newPassword 
 * @param {String} confirmNewPassword 
 */
export const validateChangePassword = ({ currentPassword, newPassword, confirmNewPassword }) => {
    const {
        k_empty_current_password,
        k_empty_new_password,
        k_empty_confirm_new_password,

        k_invalid_current_password,
        k_invalid_new_password,

        k_invalid_match_password } = Lang.changePassword

    if (validator.isEmpty(currentPassword)) {
        Alert.alert(Lang.appName, k_empty_current_password)
        return false;
    }

    if (!currentPassword.match(passwordPattern)) {
        Alert.alert(Lang.appName, k_invalid_current_password)
        return false;
    }

    if (validator.isEmpty(newPassword)) {
        Alert.alert(Lang.appName, k_empty_new_password)
        return false;
    }

    if (!newPassword.match(passwordPattern)) {
        Alert.alert(Lang.appName, k_invalid_new_password)
        return false;
    }

    if (validator.isEmpty(confirmNewPassword)) {
        Alert.alert(Lang.appName, k_empty_confirm_new_password)
        return false;
    }


    if (!validator.equals(newPassword, confirmNewPassword)) {
        Alert.alert(Lang.appName, k_invalid_match_password)
        return false;
    }

    return true;
}