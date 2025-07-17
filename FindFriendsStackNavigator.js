import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';

const Stack = createNativeStackNavigator();

const FindFriendsStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FindFriendsMain"
                component={HomeScreen}
                options={{
                    title: "Find Friends",
                    headerLargeTitle: true,
                    headerLargeTitleShadowVisible: false,
                    headerTransparent: true,
                    headerBlurEffect: 'regular',
                    headerSearchBarOptions: {
                        placeholder: "Search Friends",
                    },
                    headerShadowVisible: false,
                    headerTitleStyle: { color: '#6DB3EC' },
                }}
            />
        </Stack.Navigator>
    );
};

export default FindFriendsStackNavigator;
