import { View, Text } from 'react-native'
import * as React from 'react';
import { NativeScreenContainer } from 'react-native-screens';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './Screens/HomeScreen';
import FriendsScreen from './Screens/FriendsScreen';
import ChatsScreen from './Screens/ChatsScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TopBarNavigation = () => {
    const Tab = createMaterialTopTabNavigator();
    const inset = useSafeAreaInsets();
    return (
        <Tab.Navigator screenOptions={{
            tabBarLabelStyle: { fontSize: 13, textTransform: 'capitalize', color: "#fff" },
            tabBarStyle: { backgroundColor: '#6DB3EC' },
            tabBarIndicatorStyle: {
                borderBottomColor: '#fff',
                borderBottomWidth: 3,
            },
        }} >
            <Tab.Screen name="Chats" component={ChatsScreen} options={{ headerShadowVisible: false }} />
            <Tab.Screen name="Find Friends" component={HomeScreen} options={{ headerShadowVisible: false }} />
            <Tab.Screen name="Requests" component={FriendsScreen} options={{ headerShadowVisible: false }} />
        </Tab.Navigator >
    )
}
export default TopBarNavigation