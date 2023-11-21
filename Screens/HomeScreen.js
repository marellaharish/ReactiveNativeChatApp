import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { UserType } from "../UserContext";
const HomeScreen = () => {
    const navigation = useNavigation();
    const { userId, setUserId } = useContext(UserType);
    const [users, setUsers] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>
            ),
            headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="black" />
                    <MaterialIcons
                        // onPress={() => navigation.navigate("Friends")}
                        name="people-outline"
                        size={24}
                        color="black"
                    />
                </View>
            ),
        });
    }, []);
    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}
export default HomeScreen
const styles = StyleSheet.create({})