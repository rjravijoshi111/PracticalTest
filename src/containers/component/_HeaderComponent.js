
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from 'native-base';
import globalsVariables from '@constant/globalsVariables';
import { widthPercentage } from '@config/helper';
import PropTypes from 'prop-types';
import CacheImage from '@component/CacheImage';
import { connect } from 'react-redux';
import colors from '@constant/colors';
import font from '@constant/font';

function _HeaderComponent(props) {
    const { onProfilePress, titleText, subTitleText, profileImageSource, } = props
    /**
     * Main title view
     */
    const headerView = () => {
        return (
            <View style={styles.upperWrapper}>
                <View style={styles.topTitleWrapper}>
                    <Text style={styles.titleText}>
                        {titleText}
                    </Text>
                </View>


                <View style={styles.subTitleWrapper}>
                    <Text style={styles.subTitleTextStyle}>
                        {subTitleText}
                    </Text>

                    <TouchableOpacity onPress={onProfilePress} style={styles.profileImageParent}>
                        <CacheImage
                            source={profileImageSource}
                            imageStyle={styles.profileImg}
                            style={styles.profileImg}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )

    }

    return (
        <Header>
            <View style={styles.containerWrapper}>
                {headerView()}
            </View>
        </Header>
        // <View style={[styles.container, { marginTop: (globalsVariables.OS === 'android') ? 0 : (globalsVariables.isIphoneX) ? 40 : 20 }]}>
        //     <View style={styles.containerWrapper}>
        //         {headerView()}
        //     </View>
        // </View>
    )
}

_HeaderComponent.propTypes = {
    titleText: PropTypes.string,
    subTitleText: PropTypes.string,
    profileImageSource: PropTypes.any,
    onProfilePress: PropTypes.func,
};

_HeaderComponent.defaultProps = {
    titleText: '',
    subTitleText: '',
    profileImageSource: '',
    onProfilePress: () => { },
};

// Connection with redux
const mapStateToProps = state => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(_HeaderComponent);


/**------------------------------------------------------------------------------------------
 * _HeaderComponent Style
 **------------------------------------------------------------------------------------------*/

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.7,
        borderBottomColor: colors.modalBorderColor,
        paddingVertical: globalsVariables.width * 0.030,
        backgroundColor: colors.headerBackgroundColor
    },
    containerWrapper: {
        flex:1,
        paddingHorizontal: globalsVariables.width * 0.055,
    },
    upperWrapper: {
        backgroundColor: colors.headerBackgroundColor
    },
    topTitleWrapper: {
    },
    titleText: {
        color: colors.gray_dark,
        fontSize: font.fontSize_11,
        // fontFamily: font.fontFamily_bold
        fontWeight:'bold'
    },
    subTitleTextStyle: {
        color: colors.black,
        fontSize: font.fontSize_20,
        // fontFamily: font.fontFamily_bold
        fontWeight:'bold'
    },
    subTitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileImageParent: {
        backgroundColor: colors.white,
        borderRadius: widthPercentage(26),
        height: widthPercentage(40),
        width: widthPercentage(40),
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImg: {
        height: '100%',
        width: '100%',
        borderRadius: widthPercentage(26),
    },
})