import { StyleSheet, Text, View, Pressable, Image, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import { Ionicons } from '@expo/vector-icons';
const UserChat = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [messages, setMessages] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigation = useNavigation();
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://reactnativechatapp.onrender.com/messages/${userId}/${item._id}`
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.log("error showing messags", response.status.message);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  console.log(messages);

  const getLastMessage = () => {
    const userMessages = messages.filter(
      (message) => message.messageType === "text"
    );

    const n = userMessages.length;

    return userMessages[n - 1];
  };
  const lastMessage = getLastMessage();
  console.log(lastMessage);
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  let ScreenHeight = Dimensions.get("window").height;

  const fetchLatestMessagesCount = async () => {
    try {
      const response = await fetch(
        `https://reactnativechatapp.onrender.com/messages/count/${userId}/${item._id}`
      );
      const data = await response.json();

      if (response.ok) {
        setNotificationCount(data.count);
      } else {
        console.log("Error fetching message count", response.status.message);
      }
    } catch (error) {
      console.log("Error fetching message count", error);
    }
  };

  useEffect(() => {
    fetchLatestMessagesCount();
  }, []);

  const clearNotificationCount = () => {
    // Clear the notification count when the chat is opened
    setNotificationCount(0);
  };

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Messages", {
          recepientId: item._id,
          clearNotificationCount, // Pass the function to clear the count
        });
        clearNotificationCount(); // Also clear the count when pressed
      }}

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
      }}
    >
      <Image
        style={{ width: 45, height: 45, borderRadius: 25, resizeMode: "cover" }}
        source={{ uri: item?.image }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
        {lastMessage && (
          <Text style={{ marginTop: 2, color: "gray", fontWeight: "500" }}>
            <Ionicons name="checkmark-done" size={15} color="#8696a0" />
            {lastMessage?.message}
          </Text>
        )}
      </View>

      <View style={{ display: 'flex', alignItems: "flex-end", marginEnd: 15 }}>
        <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
          {lastMessage && formatTime(lastMessage?.timeStamp)}
        </Text>
        {notificationCount > 0 && (
          <View style={{ width: 18, height: 18, backgroundColor: "#6DB3EC", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 5 }}>
            <Text style={{ color: "#fff", fontWeight: 500 }}>
              {notificationCount}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
