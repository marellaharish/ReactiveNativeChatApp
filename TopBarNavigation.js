import { View, Text } from 'react-native'
import * as React from 'react';
import { NativeScreenContainer } from 'react-native-screens';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './screens/HomeScreen';
import FriendsScreen from './screens/FriendsScreen';
import ChatsScreen from './screens/ChatsScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TopBarNavigation = () => {
    const Tab = createMaterialTopTabNavigator();
    const inset = useSafeAreaInsets();
    return (
        <Tab.Navigator screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            tabBarLabelStyle: { textTransform: 'capitalize' },
            tabBarStyle: { backgroundColor: 'powderblue' },
        }} >
            <Tab.Screen name="Chats Screen" component={ChatsScreen} options={{ headerShadowVisible: false }} />
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShadowVisible: false }} />
            <Tab.Screen name="Requests" component={FriendsScreen} options={{ headerShadowVisible: false }} />
        </Tab.Navigator>
    )
}
export default TopBarNavigation