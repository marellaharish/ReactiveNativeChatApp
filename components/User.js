import { StyleSheet, Text, View, Pressable, Image, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { UserType } from "../UserContext";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const User = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(
          `http://192.168.2.185:8000/friend-requests/sent/${userId}`
        );

        const data = await response.json();
        if (response.ok) {
          setFriendRequests(data);
        } else {
          console.log("error", response.status);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchFriendRequests();
  }, []);

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const response = await fetch(`http://192.168.2.185:8000/friends/${userId}`);

        const data = await response.json();

        if (response.ok) {
          setUserFriends(data);
        } else {
          console.log("error retrieving user friends", response.status);
        }
      } catch (error) {
        console.log("Error message", error);
      }
    };

    fetchUserFriends();
  }, []);
  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch("http://192.168.2.185:8000/friend-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selectedUserId }),
      });

      if (response.ok) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log("error message", error);
    }
  };
  console.log("friend requests sent", friendRequests);
  console.log("user friends", userFriends);

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        borderWidth: 0,
        borderColor: "#D0D0D0",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingVertical: 12,
        paddingLeft: 15,
        paddingEnd: 15,
      }}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: 'cover',
          }}
          source={{ uri: item.image }}
        />

      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
      </View>
      {
        userFriends.includes(item._id) ? (
          <Pressable
            style={{
              backgroundColor: "#82CD47",
              padding: 8,
              width: 105,
              borderRadius: 6,
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
          </Pressable>
        ) : requestSent || friendRequests.some((friend) => friend._id === item._id) ? (
          <Pressable
            style={{
              backgroundColor: "gray",
              padding: 8,
              width: 105,
              borderRadius: 6,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
              Request Sent
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => sendFriendRequest(userId, item._id)}
            style={{
              backgroundColor: "#567189",
              padding: 8,
              borderRadius: 6,
              width: 105,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
              Add Friend
            </Text>
          </Pressable>
        )
      }
    </Pressable >
  );
};

export default User;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
    alignItems: 'center',
    position: "relative",
  },
  modalContent: {
    width: 250,
    height: 300,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "white",
    top: 100,
    borderRadius: 8,
    position: "relative",
    overflow: "hidden"
  },
  overlayText: {
    position: 'absolute',
    color: 'white', // Change text color as needed
    fontSize: 16, // Adjust font size as needed
    fontWeight: 'bold', // Adjust font weight as needed 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
    width: "100%",
    textAlign: 'left',
    paddingVertical: 8,
    paddingLeft: 15,
  },
  BottomDiv: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: 50
  }
});
