import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from '@constant/colors';
import font from '@constant/font';

function _ColorListView(props) {
    const { values, onColorItemPress, itemStripe } = props
    return (
        <View style={styles.colorViewContainer}>
            {values.map((item, index) => {
                return (
                    <TouchableOpacity style={styles.colorView} onPress={() => { onColorItemPress(item, itemStripe, values) }} key={index}>
                        <View style={{ borderColor: colors.greenBorderColor, borderWidth: item.isSelected ? 1.5 : 0, borderRadius: 6 }}>
                                <View style={[styles.colorItemView, { backgroundColor: item.color, margin: 1, height: 21 }]} />
                            </View>
                        <Text style={[styles.valueTitleText, { textAlign: 'center', fontSize: font.fontSize_12 }]}>
                            {item.value}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default _ColorListView;

/**------------------------------------------------------------------------------------------
 * StripsScreen Style
 **------------------------------------------------------------------------------------------*/

const styles = StyleSheet.create({
    valueTitleText: {
        fontSize: font.fontSize_14,
        color: colors.gray_dark,
        fontFamily: font.fontFamily_semi_bold,
    },
    colorViewContainer: {
        flexDirection: 'row',
        marginTop: 15
    },
    colorView: {
        flex: 1,
        marginRight: 5,
        justifyContent: 'center'
    },
    colorItemView: {
        height: 25,
        borderRadius: 5
    }
})