import React, { useEffect, useContext, useState } from "react";
import { FlatList, StyleSheet, Text, View, RefreshControl, ScrollView } from "react-native";
import io from "socket.io-client";
import { UserType } from "../UserContext";
import FriendRequest from "../components/FriendRequest";

const socket = io("http://192.168.2.174:8000");

const FriendsScreen = () => {
  const { userId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(`http://192.168.2.174:8000/friend-request/${userId}`);
        const data = await response.json();
        setFriendRequests(data);
      } catch (error) {
        console.error("Failed to fetch friend requests", error);
      }
    };

    fetchFriendRequests();
  }, [userId]);


  const onRefresh = () => {
    setRefreshing(true);
    socket.emit("joinRoom", userId);
  };

  console.log(friendRequests, "friendRequests")
  console.log("User ID:", userId);


  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} style={{ backgroundColor: "#fff", paddingHorizontal: 20 }} keyboardDismissMode="on-drag">
      <FlatList
        data={[...friendRequests].reverse()} // Reverse the array
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item, index }) => (
          <FriendRequest
            key={index}
            item={item}
            friendRequests={friendRequests}
            setFriendRequests={setFriendRequests}
          />
        )}
      />
    </ScrollView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
