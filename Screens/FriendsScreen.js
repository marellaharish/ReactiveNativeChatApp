import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import FriendRequest from "../components/FriendRequest";
import { StatusBar } from 'react-native';


const FriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);
  useEffect(() => {
    fetchFriendRequests();
  }, []);

  // const fetchFriendRequests = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://reactnativechatapp.onrender.com/friend-request/${userId}`
  //     );
  //     if (response.status === 200) {
  //       const friendRequestsData = response.data.map((friendRequest) => ({
  //         _id: friendRequest._id,
  //         name: friendRequest.name,
  //         email: friendRequest.email,
  //         image: friendRequest.image,
  //       }));

  //       setFriendRequests(friendRequestsData);
  //     }
  //   } catch (err) {
  //     console.log("error message", err);
  //   }
  // };

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
      console.error("Error:", err);
    }
  };


  console.log(friendRequests);
  return (
    <View style={{ padding: 10, marginHorizontal: 12 }}>
      <StatusBar backgroundColor="#6DB3EC" barStyle="light-content" />
      {friendRequests.length > 0 && <Text>Your Friend Requests!</Text>}

      {friendRequests.map((item, index) => (
        <FriendRequest
          key={index}
          item={item}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
        />
      ))}
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
