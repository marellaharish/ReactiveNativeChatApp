import React, { useEffect, useContext, useState } from "react";
import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import FriendRequest from "../components/FriendRequest";

const FriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `https://reactnativechatapp.onrender.com/friend-request/${userId}`
      );
      if (response.status === 200) {
        const friendRequestsData = response.data.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image,
        }));

        setFriendRequests(friendRequestsData);
      }
    } catch (err) {
      console.log("error message", err);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFriendRequests();
  };

  console.log(friendRequests);

  return (
    <View style={{ flex: 1, padding: 10, marginHorizontal: 12 }}>
      <FlatList
        data={friendRequests}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item, index }) => (
          <FriendRequest
            key={index}
            item={item}
            friendRequests={friendRequests}
            setFriendRequests={setFriendRequests}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          friendRequests.length > 0 && <Text>Your Friend Requests!</Text>
        }
      />
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
