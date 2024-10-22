import React, { useEffect, useContext, useState } from "react";
import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import io from "socket.io-client";
import { UserType } from "../UserContext";
import FriendRequest from "../components/FriendRequest";

const socket = io("http://192.168.2.185:8000");

const FriendsScreen = () => {
  const { userId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFriendRequests = () => {
    socket.emit("joinRoom", userId);

    socket.on("friendRequests", (friendRequestsData) => {
      const formattedRequests = friendRequestsData.map((friendRequest) => ({
        _id: friendRequest._id,
        name: friendRequest.name,
        email: friendRequest.email,
        image: friendRequest.image,
      }));

      setFriendRequests(formattedRequests);
      setRefreshing(false);
    });

    socket.on("newFriendRequest", (newRequest) => {
      setFriendRequests((prevRequests) => [
        ...prevRequests,
        {
          _id: newRequest._id,
          name: newRequest.name,
          email: newRequest.email,
          image: newRequest.image,
        },
      ]);
    });
  };

  useEffect(() => {
    fetchFriendRequests();

    return () => {
      socket.off("friendRequests");
      socket.off("newFriendRequest");
    };
  }, [userId]);

  const onRefresh = () => {
    setRefreshing(true);
    socket.emit("joinRoom", userId);
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
