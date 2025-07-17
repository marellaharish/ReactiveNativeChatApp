import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import FriendsScreen from "./Screens/FriendsScreen";
import ChatsScreen from "./Screens/ChatsScreen";
import ChatMessagesScreen from "./Screens/ChatMessagesScreen";
import TopBarNavigation from "./TopBarNavigation";
import BottomBarNavigation from "./BottomBarNavigation";
import { MaterialIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileView from "./Screens/ProfileView";
import NewChats from "./Screens/NewChats";
import SettingsScreen from "./Screens/SettingsScreen";
import DropDownSelect from "./components/DropDownSelect";
import MyFriends from "./Screens/MyFriends";
import Welcome from "./Screens/Welcome";
import PhoneNumberScreen from "./Screens/PhoneNumberScreen";
import TypeStatus from "./Screens/TypeStatus";

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

            <Stack.Screen name="ShiftChat" component={BottomBarNavigation} options={{ headerShown: false }} />

            <Stack.Screen name="Friends" component={FriendsScreen} />



            <Stack.Screen name="Messages" component={ChatMessagesScreen} />
            <Stack.Screen name="Profile" component={ProfileView} />
            <Stack.Screen name="Newchat" component={NewChats} />
            <Stack.Screen
              name="Settings"
              options={{ title: 'Settings' }}>
              {(props) => <SettingsScreen {...props} handleLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="MyFriends" component={MyFriends} />
            <Stack.Screen name="TypeStatus" component={TypeStatus} options={{ headerShown: false }} />

          </>
        ) : (
          <>
            {/* <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PhoneNumberScreen"
              component={PhoneNumberScreen}
            />
 */}




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
            <Stack.Screen name="Messages" component={ChatMessagesScreen} />
            <Stack.Screen name="Profile" component={ProfileView} />
            <Stack.Screen name="Newchat" component={NewChats} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="MyFriends" component={MyFriends} />
            <Stack.Screen name="TypeStatus" component={TypeStatus} options={{ headerShown: false }} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
