import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Updates from '../Screens/Updates';
import FriendsScreen from '../Screens/FriendsScreen';

const Stack = createNativeStackNavigator();

const FriendRequestStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Requests"
                component={FriendsScreen}
                options={{
                    title: "Friend Requests",
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

export default FriendRequestStackNavigator;

