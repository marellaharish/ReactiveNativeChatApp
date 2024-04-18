import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";
import DropDownSelect from "../components/DropDownSelect";


const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setUserId(null);
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false, headerStyle: { backgroundColor: '#fff' }, headerTitleStyle: { color: '#6DB3EC', fontSize: 22, fontWeight: "600" }, headerRight: () => (
        <>
          {/* <TouchableOpacity style={{ marginRight: 10 }} onPress={handleLogout}><MaterialIcons name="logout" size={24} color="black" /></TouchableOpacity> */}
          <TouchableOpacity style={{ marginRight: 10 }} ><Feather name="search" size={24} color="black" /></TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}><DropDownSelect /></TouchableOpacity>
        </>
      ),

    });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      const response = await axios.get(
        `https://reactnativechatapp.onrender.com/users/${userId}`
      );
      setUsers(response.data);
    } catch (error) {
      console.log("error retrieving users", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ backgroundColor: "#fff", minHeight: 100 }}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <View >
            {users.map((item, index) => (
              <User key={index} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
