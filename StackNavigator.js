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
import BottomBarNavigation from "./BottomBarNavigation";
import { MaterialIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileView from "./screens/ProfileView";
import NewChats from "./screens/NewChats";
import SettingsScreen from "./screens/SettingsScreen";
import DropDownSelect from "./components/DropDownSelect";
import MyFriends from "./screens/MyFriends";
import GraphReports from "./screens/GraphReports";
import Welcome from "./screens/Welcome";
import PhoneNumberScreen from "./screens/PhoneNumberScreen";

const StackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async (navigation) => {
    try {
      await AsyncStorage.removeItem("authToken");
      setIsLoggedIn(false);
      navigation.navigate('Login');
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

            <Stack.Screen name="ShiftChat" component={BottomBarNavigation} options={{
              headerShadowVisible: false, headerStyle: { backgroundColor: '#fff' }, headerTitleStyle: { color: '#6DB3EC', fontSize: 22, fontWeight: "600" }, headerRight: () => (
                <>
                  {/* <TouchableOpacity style={{ marginRight: 10 }} onPress={handleLogout}><MaterialIcons name="logout" size={24} color="black" /></TouchableOpacity> */}
                  <TouchableOpacity style={{ marginRight: 10 }} ><Feather name="search" size={24} color="black" /></TouchableOpacity>
                  <TouchableOpacity><DropDownSelect /></TouchableOpacity>
                </>
              ),
            }} />

            <Stack.Screen name="Friends" component={FriendsScreen} />
            <Stack.Screen name="Chats" component={ChatsScreen} />
            <Stack.Screen name="Messages" component={ChatMessagesScreen} />
            <Stack.Screen name="Profile" component={ProfileView} />
            <Stack.Screen name="Newchat" component={NewChats} />
            <Stack.Screen
              name="Settings"
              options={{ title: 'Settings' }}>
              {(props) => <SettingsScreen {...props} handleLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="MyFriends" component={MyFriends} />
            <Stack.Screen name="GraphReports" component={GraphReports} />

          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PhoneNumberScreen"
              component={PhoneNumberScreen}
            />





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
            <Stack.Screen name="ShiftChat" component={BottomBarNavigation} options={{
              headerShadowVisible: false, headerStyle: { backgroundColor: '#6DB3EC' }, headerTitleStyle: { color: 'white', fontSize: 20, }, headerRight: () => (
                <>
                  <TouchableOpacity style={{ marginRight: 10 }} onPress={handleLogout}><MaterialIcons name="logout" size={24} color="white" /></TouchableOpacity>
                  <TouchableOpacity><DropDownSelect /></TouchableOpacity>
                </>
              ),
            }} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
            <Stack.Screen name="Chats" component={ChatsScreen} />
            <Stack.Screen name="Messages" component={ChatMessagesScreen} />
            <Stack.Screen name="Profile" component={ProfileView} />
            <Stack.Screen name="Newchat" component={NewChats} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="MyFriends" component={MyFriends} />
            <Stack.Screen name="GraphReports" component={GraphReports} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
