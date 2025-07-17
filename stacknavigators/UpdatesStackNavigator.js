import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Updates from '../Screens/Updates';

const Stack = createNativeStackNavigator();

const UpdatesStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="updates"
                component={Updates}
                options={{
                    title: "Updates",
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

export default UpdatesStackNavigator;

