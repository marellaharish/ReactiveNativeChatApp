import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../components/UserChat";
import { MaterialIcons } from '@expo/vector-icons';

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [loading, setLoading] = useState(true);  // Added loading state
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();

  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        if (!userId) {
          // userId is not set, return or handle accordingly
          return;
        }

        const response = await fetch(
          `https://reactnativechatapp.onrender.com/accepted-friends/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setAcceptedFriends(data);
        }
      } catch (error) {
        console.log("error showing the accepted friends", error);
      } finally {
        setLoading(false);  // Set loading to false whether successful or not
      }
    };

    acceptedFriendsList();
  }, [userId]);  // Add userId to dependency array

  console.log("friends", acceptedFriends);

  if (loading) {
    return <Text>Loading...</Text>;  // Display a loading indicator
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#fff" }}>
        <Pressable>
          {acceptedFriends.map((item, index) => (
            <UserChat key={index} item={item} />
          ))}
        </Pressable>
      </ScrollView>
      <View style={{ width: 45, height: 45, backgroundColor: "#6DB3EC", position: "absolute", bottom: 30, right: 30, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: 'center' }}>
        <MaterialIcons name="message" size={20} color="#fff" />
      </View>
    </>
  );
};

export default ChatsScreen;