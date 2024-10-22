import React, { useState, useEffect } from "react";
import { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import DropDownSelect from '../components/DropDownSelect';
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import DP from "../assets/5.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { Image } from "react-native";

const MyFriends = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState({});
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            const response = await axios.get(
                `http://192.168.2.185:8000/current_user/${userId}`
            );
            setUsers(response.data);
        } catch (error) {
            console.log("error retrieving users", error);
        }
    };
    console.log(users + "_#_#_#_#_#_#_#_#_#_#_#_#_#_#_#_#_#_#_");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShadowVisible: false, headerStyle: { backgroundColor: '#fff' }, headerTitleStyle: { color: '#6DB3EC', fontSize: 18, fontWeight: "600" }, headerRight: () => (
                <>
                    {/* <TouchableOpacity style={{ marginRight: 10 }} onPress={handleLogout}><MaterialIcons name="logout" size={24} color="black" /></TouchableOpacity> */}
                    <TouchableOpacity style={{ marginRight: 10 }} ><Feather name="search" size={24} color="black" /></TouchableOpacity>
                    <TouchableOpacity><DropDownSelect /></TouchableOpacity>
                </>
            ),

        });
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.SelfImage}>
                    <Image source={{ uri: users.image }} style={{ width: 150, height: 150, borderRadius: 100, marginTop: 35, }} />
                </View>
                <Text style={styles.headtext}>
                    {users.name}
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headtext: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: 500,
        marginTop: 15
    },
    SelfImage: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center"
    }
});
export default MyFriends