/* eslint-disable react-native/no-color-literals */
/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Alert, Dimensions } from "react-native";
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import colors from '@constant/colors';
import Language from '@src/config/localization';
import font from '@constant/font';
import * as StripeService from '@stripes/stripes.service';
import * as StripeAction from '@stripes/stripes.action';

import globalsVariables from '@constant/globalsVariables';
import _StripsListComponent from '@component/strips/_StripsListComponent';
import _ColorListView from '@component/strips/_ColorListView';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';

import _ from 'lodash'

const { height, width }= Dimensions.get('screen');


class StripsScreen extends Component {
    /**
     * Constructor
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {

        }
        props.getStripesList()
    }

    /**
     * Select item and selected value update
     * 
     * @param {*} item 
     * @param {*} itemStripe 
     * @param {*} arrValues 
     */
    onColorItemPress = (item, itemStripe, arrValues) => {
        const { stripesList } = this.props;

        let tempArrValues = arrValues;
        let tempStripItem = itemStripe;
        let tempColorItem = item;
        let mainResponse = stripesList
        let index = _.findIndex(mainResponse, tempStripItem);

        tempArrValues.map((element) => {
            if (element.value === tempColorItem.value) {
                element.isSelected = true
                tempStripItem.selectedValue = tempColorItem.value
            } else {
                element.isSelected = false
            }
        })

        tempStripItem.values = tempArrValues
        mainResponse[index] = tempStripItem
        this.props.setStripeListItems(mainResponse)
        this.setState({})
    }

    /**
     * Render Stripe list view
     */
    renderStripeListView = ({ item, index }) => {
        const { stripesList } = this.props
        return (
            <_StripsListComponent
                item={item}
                index={index}
                onColorValueChange={(val, item) => this.onColorValueChange(val, item)}
                stripList={stripesList}
                renderColorItem={() => {
                    return (
                        <_ColorListView
                            values={item.values}
                            onColorItemPress={(item, itemStripe, values) => this.onColorItemPress(item, itemStripe, values)}
                            itemStripe={item}
                        />
                    )
                }}
            />
        )
    }

    /**
     * Update text
     * @param {*} val 
     * @param {*} item 
     */
    onColorValueChange = (val, item) => {
        const { stripesList } = this.props;

        let mainResponse = stripesList
        let index = _.findIndex(mainResponse, item);

        mainResponse[index].selectedValue = val
        mainResponse[index].values.forEach(element => {
            if (item.selectedValue === element.value) {
                element.isSelected = true
            } else {
                element.isSelected = false
            }
        });
        this.props.setStripeListItems(mainResponse)
        this.setState({})
    }

    /**
     * Select color value
     * @param {*} item 
     */
    onColorSelected = (item) => {
        const { stripesList } = this.props;

        let mainResponse = stripesList
        let index = _.findIndex(mainResponse, item);

        mainResponse[index].values.map((element) => {
            if (item.selectedValue === element.value) {
                element.isSelected = true
            } else {
                element.isSelected = false
            }
        })
        this.props.setStripeListItems(mainResponse)
        this.setState({})
    }

    /**
    * ListEmptyComponent  
    */
    listEmptyComponent = () => {
        const { noData } = Language;
        return (
            <View style={styles.noDataWrapper}>
                {!this.props.isLoading && <Text style={styles.rowTitleStyle}>{noData}</Text>}
            </View>
        )
    }

    /**
    * Pull to refresh
    */
    onRefresh = () => {
        this.props.getStripesList()
    }

    /**
     * Show alert with selected values
     */
    onNextPressed = () => {
        const { stripesList } = this.props;

        let arrSelected = stripesList.map((item) => {
            let obj = {
                name: item.name,
                value: item.selectedValue != '' ? item.selectedValue : '-'
            }
            return obj
        })

        let selectedValueString = ''
        arrSelected.map((item) => {
            selectedValueString = `${selectedValueString} ${item.name}: ${item.value} \n`
        })
        Alert.alert(Language.appName, selectedValueString)
    }

    /**
     * Render Method
     */
    render() {
        const { title, next } = Language.stripsScreen;
        const { stripesList } = this.props;
        return (
            <Container style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.contentContainerStyle}>
                        <View>
                            <View style={styles.nextBtnContainer}>
                                <TouchableOpacity style={styles.nextBtn} onPress={this.onNextPressed}>
                                    <Text style={styles.nextBtnTitle}>
                                        {next}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.titleText}>
                                {title}
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <FlatList
                                data={stripesList}
                                showsVerticalScrollIndicator={false}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderStripeListView}
                                ListEmptyComponent={this.listEmptyComponent}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Container>
        )
    }
}

/**
 * Connection with Redux
 */
const mapStateToProps = state => ({
    stripesList: state.stripes.stripesList,
    isLoading: state.general.isLoading,
});

const mapDispatchToProps = dispatch => ({
    getStripesList: () => dispatch(StripeService.getStripesList()),
    setStripeListItems: (props) => dispatch(StripeAction.setStripeListItems(props))
});

export default connect(mapStateToProps, mapDispatchToProps)(StripsScreen);

/**------------------------------------------------------------------------------------------
 * StripsScreen Style
 **------------------------------------------------------------------------------------------*/

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white
    },
    contentContainerStyle: {
        height: window.height,
        paddingHorizontal: 20,
        paddingTop: 20,
        flex:1
    },
    nextBtnContainer: {
        alignSelf: 'flex-end',
        width : width * .15,
        marginTop:20
    },
    nextBtn: {
        backgroundColor: colors.grayColor,
        borderRadius: 11,
        paddingHorizontal: 10,
        paddingVertical: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextBtnTitle: {
        color: colors.white,
        fontSize: font.fontSize_12,
        fontFamily: font.fontFamily_bold
    },
    titleText: {
        color: colors.titleTextColor,
        fontSize: font.fontSize_20,
        fontWeight: 'bold'
    },
    noDataWrapper: {
        height: globalsVariables.height * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowTitleStyle: {
        fontSize: font.fontSize_14,
        color: colors.black,
        fontFamily: font.fontFamily_semi_bold,
    },
})