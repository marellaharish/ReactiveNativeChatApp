import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
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

const StackNavigator = () => {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setUserId(null);
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };;


  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ShiftChat" component={TopBarNavigation} options={{
          headerShadowVisible: false, headerStyle: { backgroundColor: '#6DB3EC' }, headerTitleStyle: { color: 'white', fontSize: 20, }, headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => { handleLogout }}><MaterialIcons name="logout" size={24} color="white" /></TouchableOpacity>),
        }} />
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


        <Stack.Screen name="Friends" component={FriendsScreen} />

        <Stack.Screen name="Chats" component={ChatsScreen} />

        <Stack.Screen name="Messages" component={ChatMessagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
