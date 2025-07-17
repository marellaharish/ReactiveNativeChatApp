import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen';
import FriendsScreen from './Screens/FriendsScreen';
import ChatsScreen from './Screens/ChatsScreen';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Updates from './Screens/Updates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatsStackNavigator from './ChatsStackNavigator';
import FindFriendsStackNavigator from './FindFriendsStackNavigator';
import UpdatesStackNavigator from './stacknavigators/UpdatesStackNavigator';
import SettingsScreen from './Screens/SettingsScreen';
import UserSettingsStackNavigator from './stacknavigators/UserSettingsStackNavigator';
import FriendRequestStackNavigator from './stacknavigators/FriendRequestStackNavigator';

const BottomBarNavigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Tab.Navigator
                    swipeEnabled={true}
                    tabBarVisible={false}
                    screenOptions={{
                        headerShown: false,
                        headerShadowVisible: false,
                        tabBarLabelStyle: { fontSize: 13, textTransform: 'capitalize', color: "#000" },
                        tabBarStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0, borderTopWidth: 0, height: 90, borderColor: '#F9F9F9' },
                        style: { backgroundColor: '#fff', },
                        // tabBarActiveBackgroundColor: '#f0f0f0', // Background color for the active tab
                        tabBarActiveTintColor: "#6DB3EC",
                    }}>
                    <Tab.Screen
                        name="Chats"
                        component={ChatsStackNavigator}
                        options={{
                            headerShown: false, // Let the inner stack control the header
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
                            ),
                            tabBarLabel: ({ focused, color }) => (
                                <Text style={{ fontSize: 12, color: color, textAlign: 'center', paddingBottom: 5, fontWeight: 'bold' }}>Chats</Text>
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="Find Friends"
                        component={FindFriendsStackNavigator}
                        options={{
                            headerShown: false, // The stack will manage the header
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="add-sharp" size={size} color={color} />
                            ),
                            tabBarLabel: ({ focused, color }) => (
                                <Text style={{ fontSize: 12, color: color, textAlign: 'center', paddingBottom: 5, fontWeight: 'bold' }}>Find Friends</Text>
                            ),
                        }}
                    />


                    <Tab.Screen name="Updates" component={UpdatesStackNavigator} options={{
                        headerShadowVisible: false,
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="update" size={size} color={color} />
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ fontSize: 12, color: color, textAlign: 'center', paddingBottom: 5, fontWeight: 'bold' }}>Updates</Text>
                        ),
                    }} />
                    <Tab.Screen name="Requests" component={FriendRequestStackNavigator} options={{
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="notification" size={size} color={color} />
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ fontSize: 12, color: color, textAlign: 'center', paddingBottom: 5, fontWeight: 'bold' }}>Requests</Text>
                        ),
                    }} />
                    <Tab.Screen name="Settings" component={UserSettingsStackNavigator} options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="settings-outline" size={size} color={color} />
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ fontSize: 12, color: color, textAlign: 'center', paddingBottom: 5, fontWeight: 'bold' }}>Settings</Text>
                        ),
                    }} />
                </Tab.Navigator>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default BottomBarNavigation;
