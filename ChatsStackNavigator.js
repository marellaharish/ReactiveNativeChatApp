import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatsScreen from './Screens/ChatsScreen';

const Stack = createNativeStackNavigator();

const ChatsStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ChatsMain"
                component={ChatsScreen}
                options={{
                    title: "Chats",
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

export default ChatsStackNavigator;
