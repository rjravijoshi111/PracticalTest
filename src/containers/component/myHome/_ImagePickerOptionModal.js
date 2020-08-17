import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import globalsVariables from '@constant/globalsVariables';
import { widthPercentage } from '@config/helper';
import colors from '@constant/colors';
import PropTypes from 'prop-types';
import Language from '@src/config/localization';
import font from '@constant/font';
import { Icon } from 'native-base';
import Modal from 'react-native-modalbox';

function _ImagePickerOptionModal(props) {
    const { isImageOptionModalVisible, onModalClose, handleProfileOptionPress } = props;
    const { openCameraText, openGalleryText } = Language.myHomeScreen;

    return (
        <Modal
            isOpen={isImageOptionModalVisible}
            onClosed={onModalClose}
            style={styles.modalPopUpStyle}
            position='bottom'
        >
            <View style={styles.imagePopUpParent}>
                <View style={styles.notchView} />
                <View>
                    <TouchableOpacity onPress={() => handleProfileOptionPress(true)} style={styles.rowItemView}>
                        <Text style={styles.optionTextStyle}>{openCameraText}</Text>
                        <Icon name='camera' type='Entypo' style={styles.imageOptionIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleProfileOptionPress(false)} style={[styles.rowItemView, { borderBottomWidth: 0 }]}>
                        <Text style={styles.optionTextStyle}>{openGalleryText}</Text>
                        <Icon name='image' type='FontAwesome' style={styles.imageOptionIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default _ImagePickerOptionModal;

/**
 * Connection with redux
 */
_ImagePickerOptionModal.propTypes = {
    isImageOptionModalVisible: PropTypes.bool,
    handleProfileOptionPress: PropTypes.func,
};

_ImagePickerOptionModal.defaultProps = {
    isImageOptionModalVisible: false,
    handleProfileOptionPress: () => { }

};

/**
 * Style for VideoListingComponent
 */
const styles = StyleSheet.create({
    imagePopUpParent: {
        backgroundColor: colors.white,
        paddingVertical: globalsVariables.width * 0.032,
        paddingBottom: (Platform.OS === 'android') ? 0 : (globalsVariables.isIphoneX) ? 20 : 0,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16
    },
    rowItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: colors.textInputBorderColor,
        borderBottomWidth: 0.7
    },
    optionTextStyle: {
        fontFamily: font.fontFamily_reg,
        fontSize: font.fontSize_14,
        color: colors.blackTextColor,
        padding: 15
    },
    notchView: {
        alignSelf: 'center',
        width: 40,
        height: 4,
        borderRadius: 25,
        backgroundColor: colors.blackTextColor
    },
    modalPopUpStyle: {
        height: null,
        backgroundColor: colors.transparent,
        // justifyContent: 'flex-end',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    imageOptionIcon: {
        color: colors.blueColor,
        marginRight: 20,
        fontSize: widthPercentage(22),
    }
});
