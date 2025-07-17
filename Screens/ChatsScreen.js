import { StyleSheet, Text, View, ScrollView, Pressable, RefreshControl, Dimensions } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../components/UserChat";
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const tabs = [
  { label: "All" },
  { label: "Unread" },
  { label: "Favourites" },
  { label: "Groups" },
  { label: "Channels" },
  { label: "+" },
];


const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [loading, setLoading] = useState(false);  // Added loading state
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [overallUnreadCount, setOverallUnreadCount] = useState(0)
  const handlePress = () => {
    navigation.navigate('Newchat');
  };


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
    }
  };



  const acceptedFriendsList = async () => {
    try {
      if (!userId) return;
      setLoading(true);
      const response = await fetch(`http://192.168.2.174:8000/accepted-friends/${userId}`);
      const friends = await response.json();

      if (!response.ok) return;

      const enrichedFriends = await Promise.all(
        friends.map(async (friend) => {
          try {
            const messageRes = await fetch(
              `http://192.168.2.174:8000/messages/${userId}/${friend._id}`
            );
            const messages = await messageRes.json();

            const textMessages = messages.filter(msg => msg.messageType === "text");
            const lastMessage = textMessages[textMessages.length - 1] || null;

            return { ...friend, lastMessage };
          } catch (err) {
            console.log("Error fetching last message for", friend.name, err);
            return { ...friend, lastMessage: null };
          }
        })
      );

      // Sort by lastMessage timestamp descending
      const sorted = enrichedFriends.sort((a, b) => {
        const timeA = a.lastMessage?.timeStamp ? new Date(a.lastMessage.timeStamp).getTime() : 0;
        const timeB = b.lastMessage?.timeStamp ? new Date(b.lastMessage.timeStamp).getTime() : 0;
        return timeB - timeA;
      });

      setAcceptedFriends(sorted);
    } catch (error) {
      console.log("error showing the accepted friends", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    acceptedFriendsList();
  }, [userId]);  // Add userId to dependency array

  console.log("friends", acceptedFriends);


  const onRefresh = () => {
    setIsRefreshing(true);
    acceptedFriendsList();
  };
  let ScreenHeight = Dimensions.get("window").height;


  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = acceptedFriends.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );




  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search Chats",
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
    if (isFocused && userId) {
      acceptedFriendsList();
    }
  }, [isFocused, userId]);



  const handleLogout = async (navigation) => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.replace('Login');
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const fetchOverallUnreadCount = async () => {
    try {
      const response = await fetch(`http://192.168.2.174:8000/overall-unread-count/${userId}`);
      const data = await response.json();

      if (response.ok) {
        console.log("Unread Count: ", data.unreadCount);
        // You can update the state with the unread count to display it
        setOverallUnreadCount(data.unreadCount);
      } else {
        console.log("Error fetching overall unread count");
      }
    } catch (error) {
      console.log("Error fetching overall unread count", error);
    }
  };

  // Call this in useEffect to fetch the count when the component loads
  useEffect(() => {
    fetchOverallUnreadCount();
  }, [navigation, userId]);

  console.log(overallUnreadCount, "setOverallUnreadCount")



  return (
    <>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} style={{ backgroundColor: "#fff" }} keyboardDismissMode="on-drag">

        {/* Tabs for filtering */}
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, marginBottom: 8 }}>
          {tabs.map((tab, index) => (
            <Pressable
              key={index}
              style={{
                paddingHorizontal: 15,
                marginRight: 10,
                paddingVertical: 8,
                backgroundColor: activeTab === tab.label ? "#e7fce3" : "#efefef",
                borderRadius: 50,
              }}
              onPress={() => setActiveTab(tab.label)}
            >
              <Text style={{ fontSize: 13, color: activeTab === tab.label ? "#008069" : "#000" }}>
                {tab.label} {tab.label === "Unread" && overallUnreadCount > 0 && overallUnreadCount}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable>

          <View >
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item, index) => (
                <UserChat key={index} item={item} lastMessage={item.lastMessage} />
              ))
            ) : (
              <Text style={{ fontSize: 18, color: '#999', textAlign: "center", paddingVertical: 15 }}>No results found</Text>
            )}
          </View>
        </Pressable>
      </ScrollView>

      <Pressable onPress={handleLogout}>
        <View style={{ width: 50, height: 50, backgroundColor: "#6DB3EC", position: "absolute", bottom: 30, right: 30, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: 'center' }}>
          <MaterialIcons name="message" size={23} color="#fff" />
        </View>
      </Pressable>
    </>
  );
};

export default ChatsScreen;