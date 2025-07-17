import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserSettings from '../Screens/UserSettings';

const Stack = createNativeStackNavigator();

const UserSettingsStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserSettings"
                component={UserSettings}
                options={{
                    title: "Settings",
                    headerLargeTitle: true,
                    headerLargeTitleShadowVisible: false,
                    headerTransparent: true,
                    headerBlurEffect: 'regular',
                    headerSearchBarOptions: {
                        placeholder: "Search",
                    },
                    headerShadowVisible: false,
                    headerTitleStyle: { color: '#6DB3EC' },
                }}
            />
        </Stack.Navigator>
    );
};

export default UserSettingsStackNavigator;

