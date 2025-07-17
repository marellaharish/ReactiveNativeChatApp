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
  const [searchQuery, setSearchQuery] = useState("");


  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search Friends",
        onChangeText: (event) => {
          setSearchQuery(event.nativeEvent.text);
        },
      },
      headerLargeTitle: true,
      headerLargeTitleShadowVisible: false,
      headerTransparent: true,
      headerBlurEffect: 'regular',
      headerShadowVisible: false,
      headerTitleStyle: { color: '#6DB3EC' },
    });
  }, [navigation]);

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
        `http://192.168.2.174:8000/users/${userId}`
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
        contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} style={{ backgroundColor: "#fff" }} keyboardDismissMode="on-drag"
      >
        <View style={{ backgroundColor: "#fff", minHeight: 100 }}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />


          <View >
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item, index) => (
                <User key={index} item={item} />
              ))
            ) : (
              <Text style={{ fontSize: 18, color: '#999', textAlign: "center", paddingVertical: 15 }}>No results found</Text>
            )}
          </View>


        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
