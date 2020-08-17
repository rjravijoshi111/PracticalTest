import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ActivityIndicator
} from 'react-native';
import globalsVariables from '@constant/globalsVariables';
import { widthPercentage } from '@config/helper';
import colors from '@constant/colors';
import PropTypes from 'prop-types';
import font from '@constant/font';
import Video from 'react-native-video';
import { Icon } from 'native-base';
import CacheImage from '../CacheImage';

function _VideoListingComponent(props) {
    const { data, onLongPress, onPlayButtonPress } = props;
    const [isVideoBuffering, setIsVideoBuffering] = useState(true);
    const [paused, setPaused] = useState(false);
    return (
        <Pressable style={styles.container} onLongPress={onLongPress}>
            <View style={styles.innerContainer}>
                <View style={styles.coverImageContainer}>
                    {
                        (data.isVideoPlaying)
                            ?
                            <Video
                                source={{ uri: data?.video_url }}
                                ref={(ref) => { this.player = ref }}
                                resizeMode='cover'
                                onBuffer={({ isBuffering }) => setIsVideoBuffering(isBuffering)}
                                onLoad={() => setIsVideoBuffering(false)}
                                onError={(e) => console.log("E: " + JSON.stringify(e))}
                                paused={paused}
                                style={styles.backgroundVideo}
                            /> :
                            <CacheImage
                                source={{ uri: (data?.thumbnail_url) ? data.thumbnail_url : undefined }}
                                imageStyle={styles.coverImageStyle}
                                style={styles.coverImageStyle}
                                resizeMode="cover"
                            />
                    }

                    <View style={styles.playIconWrapper}>
                        {

                            (!data.isVideoPlaying)
                                ?
                                <Icon name='play-circle' type='Feather' onPress={onPlayButtonPress} style={styles.playIcon} />
                                :
                                (isVideoBuffering) ?
                                    <ActivityIndicator size={widthPercentage(24)} color={colors.black} animating={isVideoBuffering} />
                                    :
                                    (paused) ?
                                        <Icon name='play-circle' type='Feather' onPress={() => setPaused(!paused)} style={styles.playIcon} />
                                        :
                                        <Icon name='pause-circle' type='Feather' onPress={() => setPaused(!paused)} style={styles.playIcon} />
                        }
                    </View>

                    <View style={styles.titleWrapper}>
                        <View style={styles.newTitleWrapper}>
                            <Text style={styles.newText}>New</Text>
                            <Text style={styles.timeText}>{data.time} hr ago</Text>
                        </View>
                        <Text style={styles.videoTitleText}>{data.title}</Text>
                        <Text style={styles.artistTitleText}>{data.artist}</Text>
                    </View>
                </View>

            </View>
        </Pressable>
    );
}

export default _VideoListingComponent;

/**
 * Connection with redux
 */
_VideoListingComponent.propTypes = {
    onPlayButtonPress: PropTypes.func,
    onLongPress: PropTypes.func,
};

_VideoListingComponent.defaultProps = {
    onPlayButtonPress: () => { },
    onLongPress: () => { },

};

/**
 * Style for VideoListingComponent
 */
const styles = StyleSheet.create({
    container: {
        // marginHorizontal: globalsVariables.width * 0.032,
        marginTop: globalsVariables.width * 0.032,
        borderRadius: 10,
        shadowColor: colors.cardShadowColor,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        position: 'relative',
        marginBottom: 15,
        backgroundColor: colors.white,
        zIndex: 111,
        // flex: 1,
        paddingBottom: widthPercentage(40)
    },
    innerContainer: {

    },
    titleWrapper: {
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: -40,
        borderRadius: 10,
        width: '100%',
        padding: widthPercentage(10)
    },

    newTitleWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    newText: {
        fontSize: font.fontSize_10,
        color: colors.tabSelectedBlueColor,
        fontFamily: font.fontFamily_semi_bold,
    },
    timeText: {
        fontSize: font.fontSize_10,
        color: colors.gray_dark,
        fontFamily: font.fontFamily_semi_bold,
    },
    videoTitleText: {
        marginTop: 5,
        fontSize: font.fontSize_15,
        color: colors.black,
        fontFamily: font.fontFamily_bold,
    },
    artistTitleText: {
        fontSize: font.fontSize_10,
        color: colors.gray_dark,
        fontFamily: font.fontFamily_bold,
    },
    playIconWrapper: {
        position: 'absolute',
        zIndex: 999,
        // backgroundColor: colors.white,
        // height: widthPercentage(40),
        // width: widthPercentage(40),
        borderRadius: widthPercentage(20),
        alignSelf: 'center',
        top: widthPercentage(90)
    },
    playIcon: {
        color: colors.black,
        fontSize: widthPercentage(40),
        marginRight: 2
    },
    coverImageContainer: {
    },
    coverImageStyle: {
        height: widthPercentage(220),
        borderRadius: 10,
        width: '100%'
    },
    backgroundVideo: {
        height: widthPercentage(220),
        borderRadius: 10,
        width: '100%'
    },
});
