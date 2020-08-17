import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { SkypeIndicator } from 'react-native-indicators';
import colors from '@constant/colors';
import * as GeneralAction from "@general/general.action";
import * as Progress from 'react-native-progress';
import Navigator from "./containers/navigator";

export const navigationRef = React.createRef();

class ReduxNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.props.setNavigationReference(navigationRef);
    }

    render() {
        const { nav, dispatch } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Navigator state={nav} dispatch={dispatch} />
                {this.props.isLoading && <View style={styles.loadingIndicator}>
                    <SkypeIndicator color={colors.primaryColor} animating={this.props.isLoading} size={70} />
                </View>}
                {this.props.showProgressLoader && !this.props.isLoading && <View style={styles.loadingIndicator}>
                    <Progress.Circle
                        size={100}
                        progress={this.props.progress}
                        showsText
                        color={colors.primaryColor}
                        textStyle={styles.progressTextStyle}
                    />
                </View>}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.general.isLoading,
    showProgressLoader: state.general.showProgressLoader,
    progress: state.general.progress,
});

const mapDispatchToProps = dispatch => ({
    setNavigationReference: (data) => dispatch(GeneralAction.setNavigationReference(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigation);

const styles = StyleSheet.create({
    loadingIndicator: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.loadingIndicatorBGColor,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1
    }
})