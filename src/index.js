import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import globalsVariables from '@src/constant/globalsVariables';
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './reducers';
import ReduxNavigation, { navigationRef } from "./reduxNavigation";

class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true
        }

        NetInfo.addEventListener(state => {
            this.handleFirstConnectivityChange(state.isConnected)
        });

        NetInfo.fetch().then(state => {
            globalsVariables.isInternetConnected = state.isConnected
            this.setState({ isLoading: false })
        });
    }

    /**
     * Handling internet connectivity
     */
    handleFirstConnectivityChange = (isConnected) => {
        globalsVariables.isInternetConnected = isConnected
    }

    render() {

        if (!this.state.isLoading) {
            return (
                <Provider store={store}>
                    <NavigationContainer ref={navigationRef}>
                        <PersistGate loading={null} persistor={persistor}>
                            <ReduxNavigation />
                        </PersistGate>
                    </NavigationContainer>
                </Provider>)
        }
        return <View style={{ width: '100%', height: '100%' }} />
    }
}

export default App;

