import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar
} from "react-native";
import React, { useState, useContext, useEffect, useRef, useLayoutEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from "../UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import io from "socket.io-client";

const ChatMessagesScreen = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState("");
  const route = useRoute();
  const { recepientId } = route.params;
  const [message, setMessage] = useState("");
  const { userId, setUserId } = useContext(UserType);

  const scrollViewRef = useRef(null);
  const socket = useRef(io("https://reactnativechatapp.onrender.com"));

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://reactnativechatapp.onrender.com/messages/${userId}/${recepientId}`
        );
        const data = await response.json();

        if (response.ok) {
          setMessages(data);
        } else {
          console.log("error showing messages", response.status.message);
        }
      } catch (error) {
        console.log("error fetching messages", error);
      }
    };

    fetchMessages();
  }, [userId, recepientId]);

  useEffect(() => {
    const fetchRecepientData = async () => {
      try {
        const response = await fetch(
          `https://reactnativechatapp.onrender.com/user/${recepientId}`
        );

        const data = await response.json();
        setRecepientData(data);
      } catch (error) {
        console.log("error retrieving details", error);
      }
    };

    fetchRecepientData();
  }, [recepientId]);

  useEffect(() => {
    socket.current.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.current.emit("joinRoom", { userId, recepientId });

    return () => {
      socket.current.disconnect();
    };
  }, [userId, recepientId]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://reactnativechatapp.onrender.com/messages/${userId}/${recepientId}`
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

  const handleSend = async (messageType, imageUri) => {
    try {
      if (message.trim() === "") {
        console.log("Empty message. Please enter a message.");
        return;
      }
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recepientId", recepientId);

      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("imageFile", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }

      const response = await fetch(
        "https://reactnativechatapp.onrender.com/messages",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("");
        setSelectedImage("");

        fetchMessages();
        socket.current.emit("sendMessage", {
          senderId: userId,
          recepientId: recepientId,
          messageType: messageType,
          messageText: message,
        });
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };


  console.log("messages", selectedMessages);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: '#6DB3EC',
      },
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="white"
          />

          {selectedMessages.length > 0 ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#fff" }}>
                {selectedMessages.length}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  resizeMode: "cover",
                }}
                source={{ uri: recepientData?.image }}
              />

              <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: "500", color: "#fff" }}>
                {recepientData?.name}
              </Text>
            </View>
          )}
        </View>
      ),
      headerRight: () =>
        selectedMessages.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Ionicons name="md-arrow-redo-sharp" size={20} color="white" />
            <Ionicons name="md-arrow-undo" size={20} color="white" />
            <FontAwesome name="star" size={20} color="white" />
            <MaterialIcons
              onPress={() => deleteMessages(selectedMessages)}
              name="delete"
              size={20}
              color="white"
            />
          </View>
        ) : (<View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <FontAwesome name="video-camera" size={18} color="#fff" />
          <Ionicons name="call" size={18} color="#fff" />
          <Entypo name="dots-three-vertical" size={18} color="#fff" />
        </View>),
    });
  }, [recepientData, selectedMessages]);

  const deleteMessages = async (messageIds) => {
    try {
      // const response = await fetch("https://reactnativechatapp.onrender.com/deleteMessages", {
      const response = await fetch("https://reactnativechatapp.onrender.com/deleteMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: messageIds }),
      });

      if (response.ok) {
        setSelectedMessages((prevSelectedMessages) =>
          prevSelectedMessages.filter((id) => !messageIds.includes(id))
        );

        fetchMessages();
      } else {
        console.log("error deleting messages", response.status);
      }
    } catch (error) {
      console.log("error deleting messages", error);
    }
  };
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      handleSend("image", result.uri);
    }
  };
  const handleSelectMessage = (message) => {
    //check if the message is already selected
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((previousMessages) =>
        previousMessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedMessages((previousMessages) => [
        ...previousMessages,
        message._id,
      ]);
    }
  };
  var width = Dimensions.get('window').width; //full width

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();


  const dateObject = new Date();
  const dateDay = dateObject.getDate();
  const dateMonth = dateObject.getMonth();
  const dateYear = dateObject.getFullYear();

  let displayText;

  if (currentYear === dateYear && currentMonth === dateMonth && currentDay === dateDay) {
    displayText = 'Today';
  } else {
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDay - 1);

    if (yesterday.getDate() === dateDay && yesterday.getMonth() === dateMonth && yesterday.getFullYear() === dateYear) {
      displayText = 'Yesterday';
    } else {
      // Format the date as needed for other days
      displayText = `${dateDay}/${dateMonth + 1}/${dateYear}`;
    }
  }




  return (
    <ImageBackground
      source={require("../assets/ChatBg.jpg")} // replace with the actual path to your background image
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "##efeae2" }}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }} onContentSizeChange={handleContentSizeChange}>
          <StatusBar backgroundColor="#6DB3EC" barStyle="light-content" />
          <View style={{ display: "flex", justifyContent: "center", marginTop: 10, alignItems: "center" }}>
            <Text style={{ textAlign: "center", backgroundColor: "#ffffff", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 }}>{displayText}</Text>
          </View>
          {/* <View style={{ display: "flex", justifyContent: "center", marginTop: 10, alignItems: "center", width: width, backgroundColor: "#ffffff77", paddingVertical: 8 }}>
          <Text style={{ textAlign: "center", backgroundColor: "#ffffff", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 }}>1 Unread Message</Text>
        </View> */}
          {messages.map((item, index) => {
            if (item.messageType === "text") {
              const isSelected = selectedMessages.includes(item._id);
              return (
                <Pressable
                  onLongPress={() => handleSelectMessage(item)}
                  key={index}
                  style={[
                    item?.senderId?._id === userId
                      ?
                      {
                        alignSelf: "flex-end",
                        backgroundColor: "#d9fdd3",
                        padding: 4,
                        maxWidth: "60%",
                        minWidth: 80,
                        borderRadius: 7,
                        margin: 5,
                        paddingLeft: 10,
                        paddingRight: 45,
                        paddingTop: 8,
                        paddingBottom: 8
                      }

                      : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 4,
                        maxWidth: "60%",
                        minWidth: 80,
                        borderRadius: 7,
                        paddingRight: 45,
                        margin: 5,
                        paddingLeft: 10,
                        paddingTop: 8,
                        paddingBottom: 8
                      },

                    isSelected && { Width: "%", backgroundColor: "#F0FFFF" },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      // textAlign: isSelected ? "right" : "left",
                    }}
                  >
                    {item?.message}
                  </Text>
                  <Text style={{ position: "absolute", right: 8, bottom: 5, fontSize: 8 }}>{formatTime(item.timeStamp)}</Text>
                  {/* <Text
                  style={{
                    textAlign: "right",
                    fontSize: 8,
                    color: "gray",
                    marginTop: 0,
                  }}
                >
                  {formatTime(item.timeStamp)}
                </Text> */}
                </Pressable>
              );
            }

            if (item.messageType === "image") {
              const baseUrl =
                "/Users/sujananand/Build/messenger-project/api/files/";
              const imageUrl = item.imageUrl;
              const filename = imageUrl.split("/").pop();
              const source = { uri: baseUrl + filename };
              return (
                <Pressable
                  key={index}
                  style={[
                    item?.senderId?._id === userId
                      ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                      }
                      : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                      },
                  ]}
                >
                  <View>
                    <Image
                      source={source}
                      style={{ width: 200, height: 200, borderRadius: 7 }}
                    />
                    <Text
                      style={{
                        textAlign: "right",
                        fontSize: 9,
                        position: "absolute",
                        right: 10,
                        bottom: 7,
                        color: "white",
                        marginTop: 5,
                      }}
                    >
                      {formatTime(item?.timeStamp)}
                    </Text>
                  </View>
                </Pressable>
              );
            }
          })}
        </ScrollView>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", margin: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 5,
              borderTopColor: "#dddddd",
              backgroundColor: "#ffffff",
              borderRadius: 20,
              minHeight: 50,
              maxHeight: 100,
              width: "89%",
              position: "relative",
              marginRight: 5,
              paddingBottom: showEmojiSelector ? 0 : 15,
            }}
          >
            <View style={{
              position: "absolute",
              width: "98%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              minHeight: 50,
              maxHeight: 100,
            }}>
              <Entypo
                onPress={handleEmojiPress}
                style={{ marginRight: 1, paddingHorizontal: 10 }}
                name="emoji-happy"
                size={20}
                color="gray"
              />
              <TextInput
                value={message}
                onChangeText={(text) => setMessage(text)}
                style={{
                  flex: 1,
                  // borderColor: "#dbdbdb",
                  // borderWidth: 1,
                  height: "100%",
                  overflow: "hidden",
                }}
                placeholder="Message"
              />

              <View>
                <Entypo onPress={pickImage} name="camera" size={24} color="gray" />

                {/* <Feather name="mic" size={24} color="gray" /> */}
              </View>
            </View>
          </View>

          <Pressable
            onPress={() => handleSend("text")}
            style={{
              backgroundColor: "#6DB3EC",
              borderRadius: 50,
              width: 45,
              height: 45,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </Pressable>

        </View>

        {showEmojiSelector && (
          <EmojiSelector
            onEmojiSelected={(emoji) => {
              setMessage((prevMessage) => prevMessage + emoji);
            }}
            style={{ height: 250 }}
          />
        )}
      </KeyboardAvoidingView>

    </ImageBackground>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({});
