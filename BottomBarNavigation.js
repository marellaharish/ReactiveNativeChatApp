import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import FriendsScreen from './screens/FriendsScreen';
import ChatsScreen from './screens/ChatsScreen';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Updates from './screens/Updates';

const BottomBarNavigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <View style={styles.container}>
            <Tab.Navigator
                swipeEnabled={true}
                tabBarVisible={false}
                lazy={true}
                screenOptions={{
                    headerShadowVisible: false,
                    tabBarLabelStyle: { fontSize: 13, textTransform: 'capitalize', color: "#000" },
                    tabBarStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0, borderTopWidth: 0, height: 60, borderColor: '#F9F9F9' },
                    style: { backgroundColor: '#fff', },
                    // tabBarActiveBackgroundColor: '#f0f0f0', // Background color for the active tab
                    tabBarActiveTintColor: "#6DB3EC",
                }} >
                <Tab.Screen
                    name="Chats"
                    component={ChatsScreen}
                    options={{
                        headerShadowVisible: false,
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text style={{ fontSize: 12, color: color, textAlign: 'center', paddingBottom: 5, fontWeight: 'bold' }}>Chats</Text>
                        ),
                    }}
                />
                <Tab.Screen name="Find Friends" component={HomeScreen} options={{
                    headerShadowVisible: false,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-sharp" size={size} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ fontSize: 12, color: color, textAlign: 'center', paddingBottom: 5, fontWeight: 'bold' }}>Find Friends</Text>
                    ),
                }} />
                <Tab.Screen name="Updates" component={Updates} options={{
                    headerShadowVisible: false,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="update" size={size} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ fontSize: 12, color: color, textAlign: 'center', paddingBottom: 5, fontWeight: 'bold' }}>Updates</Text>
                    ),
                }} />
                <Tab.Screen name="Requests" component={FriendsScreen} options={{
                    headerShadowVisible: false,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="notification" size={size} color={color} />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ fontSize: 12, color: color, textAlign: 'center', paddingBottom: 5, fontWeight: 'bold' }}>Requests</Text>
                    ),
                }} />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default BottomBarNavigation;
