import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import MyHomeScreen from './MyHomeScreen';

const Stack = createStackNavigator();

function MyHomeNavigator(props) {
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            DeviceEventEmitter.emit('UPDATE_DRAWER', 'MyHomeNavigator')
        });

        return unsubscribe;
    }, [props.navigation]);
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="MyHomeScreen" component={MyHomeScreen} />
        </Stack.Navigator>
    );
}

/**
 *  Connect with redux
 */
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MyHomeNavigator);