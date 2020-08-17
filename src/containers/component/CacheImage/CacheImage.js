import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentage } from '@config/helper';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
import { Icon } from 'native-base';
import colors from '@constant/colors';

const CacheImages = createImageProgress(FastImage);

class CacheImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            this.props.source.uri != undefined
                ?
                <CacheImages
                    {...this.props}
                    indicator={Progress.Circle}
                    source={this.props.source}
                />
                :
                <View style={[{ borderRadius: widthPercentage(26) }]}>
                    <Icon style={(this.props.placeHolderIconStyle) ? this.props.placeHolderIconStyle : styles.placeHolderStyle} name='user' type='Feather' />
                </View>
        )
    }
}

export default CacheImage;

/**------------------------------------------------------------------------------------------
 * Cache Image Component Style
 **------------------------------------------------------------------------------------------*/
const styles = StyleSheet.create({
    placeHolderStyle: {
        backgroundColor: colors.transparent,
        borderRadius: widthPercentage(26),
        borderColor: colors.transparent,
        lineHeight: widthPercentage(26),
        fontSize: widthPercentage(26),
    },
})