import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import StripsScreen from './StripsScreen';

const Stack = createStackNavigator();

function StripsNavigator() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="StripsScreen" component={StripsScreen} />
        </Stack.Navigator>
    );
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(StripsNavigator);