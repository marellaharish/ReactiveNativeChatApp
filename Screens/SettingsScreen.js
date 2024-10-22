import { View, Text, Image, Dimensions, Pressable, ScrollView, StyleSheet, Modal, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import DP from "../assets/5.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";


const SettingsScreen = ({ navigation, handleLogout }) => {
    const [users, setUsers] = useState({});
    let ScreenHeight = Dimensions.get("window").height;
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


    navigation.setOptions({
        headerTitle: "",
        headerStyle: {
            backgroundColor: '#FFF',
        },
        headerShadowVisible: false,
        headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="arrow-back"
                    size={24}
                    color="black"
                /><Text style={{ fontSize: 16, color: "#000", fontWeight: "500" }}>Profile</Text>
            </View>)
    })

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('Initial Name');

    const handleEditIconPress = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Save the edited name
        setIsEditing(false);
        // You can perform any save operation here, such as sending it to a server
    };

    const handleCloseModal = () => {
        setIsEditing(false);
    };




    return (
        <View style={styles.container}>
            <View>
                <View style={{ display: "flex", alignItems: "center", position: "relative" }}>
                    <Image source={{ uri: users.image }} style={{ width: 150, height: 150, borderRadius: 100, marginTop: 25, }} />
                    <View style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 100, backgroundColor: "#6DB3EC", width: 40, height: 40, position: "absolute", bottom: -5, right: 135 }}>
                        <Entypo name="camera" size={18} color="white" />
                    </View>
                </View>


                <View style={{ marginTop: 50 }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", paddingStart: 25 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                            <View style={{ width: 40, }}>
                                <FontAwesome5 name="user-alt" size={20} color="#667781" />
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 13, color: "#667781" }}>Name</Text>
                            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", width: 310 }}>
                                <Text style={{ fontSize: 15, color: "#000" }}>{users.name}</Text>
                                <TouchableOpacity onPress={handleEditIconPress}>
                                    <MaterialIcons name="edit" size={20} color="#6DB3EC" />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 12, color: "#667781", marginEnd: 50, marginTop: 5 }}>This is not your username or pin. This name will be visible to your WhatsApp contacts</Text>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", paddingStart: 25, marginTop: 30 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                            <View style={{ width: 40, }}>
                                <Octicons name="info" size={20} color="#667781" />
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 13, color: "#667781" }}>About</Text>
                            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", width: 310 }}>
                                <Text style={{ fontSize: 15, color: "#000" }}>My Lyf 😎 Dad Rules ❤️✨</Text>
                                <MaterialIcons name="edit" size={20} color="#6DB3EC" />
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", paddingStart: 25, marginTop: 30 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                            <View style={{ width: 40, }}>
                                <Entypo name="email" size={20} color="#667781" />
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 13, color: "#667781" }}>Email</Text>
                            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", width: 310 }}>
                                <Text style={{ fontSize: 15, color: "#000" }}>{users.email}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Pressable style={styles.LogoutButton} onPress={() => handleLogout(navigation)}>
                <Text style={{ color: "#FFF" }}>Logout</Text>
            </Pressable>

            <Modal
                visible={isEditing}
                animationType="slide"
                transparent={true}
                onRequestClose={handleCloseModal}
            >
                <TouchableWithoutFeedback onPress={handleCloseModal}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <TouchableWithoutFeedback>
                            <View style={{ backgroundColor: '#FFF', padding: 20, borderRadius: 10, width: '80%' }}>
                                <Text>Edit Name</Text>
                                <TextInput
                                    style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginTop: 10 }}
                                    value={users.name}
                                    onChangeText={setEditedName}
                                />
                                <TouchableOpacity onPress={handleSave} style={{ backgroundColor: '#6DB3EC', padding: 10, borderRadius: 5, marginTop: 10 }}>
                                    <Text style={{ color: '#FFF', textAlign: 'center' }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>


        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 25
    },
    LogoutButton: {
        backgroundColor: "#EF5350",
        marginHorizontal: 15,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 10,
        borderRadius: 8,
        marginBottom: 25,
        width: "100%",
    }
})
export default SettingsScreen