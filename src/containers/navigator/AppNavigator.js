import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyHomeNavigator from '@screens/myHome/index'
import StripsNavigator from '@screens/strips/index'
import { Icon } from 'native-base';
import colors from '@constant/colors';
import font from '@constant/font';
import Language from '@src/config/localization';
import { widthPercentage } from '@config/helper';

const Tab = createBottomTabNavigator();

function AppNavigator() {
    const { feedTitle, stripsTitle } = Language.tabBar;

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: colors.red,
                inactiveTintColor: colors.grayTextColor,
                tabStyle: { marginTop: 3 },
                style: {
                    backgroundColor: colors.white,
                    borderTopWidth: 0.5,
                    borderTopColor: colors.modalBorderColor,
                },
                labelStyle: { fontSize: font.fontSize_11, },
            }}
        >
            <Tab.Screen
                name="MyHomeNavigator"
                component={MyHomeNavigator}
                options={{
                    title: feedTitle,
                    tabBarIcon: ({ size, color }) => (
                        <Icon
                            name='feed'
                            type='FontAwesome'
                            style={{ color, fontSize: widthPercentage(24) }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="StripsNavigator"
                component={StripsNavigator}
                options={{
                    title: stripsTitle,
                    tabBarIcon: ({ size, color }) => (
                        <Icon
                            name='color-lens'
                            type='MaterialIcons'
                            style={{ color, fontSize: widthPercentage(24) }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default AppNavigator;