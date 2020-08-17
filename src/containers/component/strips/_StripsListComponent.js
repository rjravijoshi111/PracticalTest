import React from 'react';
import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from '@constant/colors';
import font from '@constant/font';
import globalsVariables from '@constant/globalsVariables';

function _StripsListComponent(props) {
    const { index, item, onColorValueChange, renderColorItem, stripList } = props

    return (
        <View style={[styles.stripMainContainer, { paddingBottom: (stripList) && index === stripList.length - 1 ? 30 : 0 }]}>
            <View style={[styles.sideStripContainer, { borderTopWidth: index == 0 ? 0.5 : 0, borderBottomWidth: (stripList) && index === stripList.length - 1 ? 0.5 : 0 }, index === 0 ? { paddingTop: 50.5, marginTop: 20 } : {}]}>
                <View style={{ backgroundColor: item.colorValue, height: 25, width: 25, marginBottom: globalsVariables.height * 0.029, }} />
            </View>
            <View style={styles.stripItemSubContainer}>
                <View style={styles.itemTitleContainer}>
                    <Text style={styles.valueTitleText}>
                        {item.name}
                        <Text style={styles.unitText}>
                            {' (' + item.unit + ')'}
                        </Text>
                    </Text>
                    <View style={styles.inputTextContainer}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder='0'
                            keyboardType='decimal-pad'
                            value={item.selectedValue}
                            onChangeText={(val) => { onColorValueChange(val, item) }}
                            // onSubmitEditing={() => { onColorValueChange(colorValue, item) }}
                            returnKeyType='done'
                        />
                    </View>
                </View>
                {renderColorItem()}
            </View>
        </View>
    )
}

export default _StripsListComponent;

/**------------------------------------------------------------------------------------------
 * StripsScreen Style
 **------------------------------------------------------------------------------------------*/

const styles = StyleSheet.create({
    valueTitleText: {
        fontSize: font.fontSize_14,
        color: colors.gray_dark,
        fontFamily: font.fontFamily_semi_bold,
    },
    unitText: {
        fontSize: font.fontSize_12,
        fontFamily: font.fontFamily_regular,
    },
    textInputStyle: {
        fontSize: font.fontSize_12,
        color: colors.blueColor,
        fontFamily: font.fontFamily_semi_bold,
        textAlign: 'center'
    },
    stripMainContainer: {
        flexDirection: 'row',
    },
    sideStripContainer: {
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        justifyContent: 'flex-start',
        marginRight: 15,
        borderColor: colors.grayColor,
        paddingTop: 70.5,
    },
    stripItemSubContainer: {
        flex: 1,
        marginTop: 20
    },
    itemTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputTextContainer: {
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 2,
        height: 38,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.gray_light_2
    },
})