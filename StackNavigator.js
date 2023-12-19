import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import FriendsScreen from "./screens/FriendsScreen";
import ChatsScreen from "./screens/ChatsScreen";
import ChatMessagesScreen from "./screens/ChatMessagesScreen";
import TopBarNavigation from "./TopBarNavigation";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileView from "./screens/ProfileView";

const StackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="ShiftChat" component={TopBarNavigation} options={{
              headerShadowVisible: false, headerStyle: { backgroundColor: '#6DB3EC' }, headerTitleStyle: { color: 'white', fontSize: 20, }, headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={handleLogout}><MaterialIcons name="logout" size={24} color="white" /></TouchableOpacity>),
            }} />

            <Stack.Screen name="Friends" component={FriendsScreen} />
            <Stack.Screen name="Chats" component={ChatsScreen} />
            <Stack.Screen name="Messages" component={ChatMessagesScreen} />
            <Stack.Screen name="Profile" component={ProfileView} />

          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ShiftChat" component={TopBarNavigation} options={{
              headerShadowVisible: false, headerStyle: { backgroundColor: '#6DB3EC' }, headerTitleStyle: { color: 'white', fontSize: 20, }, headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={handleLogout}><MaterialIcons name="logout" size={24} color="white" /></TouchableOpacity>),
              }} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
            <Stack.Screen name="Chats" component={ChatsScreen} />
            <Stack.Screen name="Messages" component={ChatMessagesScreen} />
            <Stack.Screen name="Profile" component={ProfileView} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
