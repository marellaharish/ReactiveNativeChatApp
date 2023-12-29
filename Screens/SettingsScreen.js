import { View, Text, Image, Dimensions, Pressable, ScrollView } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import DP from "../assets/5.png";
const SettingsScreen = () => {
    const navigation = useNavigation();
    let ScreenHeight = Dimensions.get("window").height;
    navigation.setOptions({
        headerTitle: "",
        headerStyle: {
            backgroundColor: '#6DB3EC',
        },
        headerShadowVisible: false,
        headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="arrow-back"
                    size={24}
                    color="white"
                /><Text style={{ fontSize: 16, color: "white", fontWeight: "500" }}>Profile</Text>
            </View>)
    })
    return (
        <View style={{ width: "100%", flex: 1, backgroundColor: "white" }}>
            <View style={{ display: "flex", alignItems: "center", position: "relative" }}>
                <Image source={DP} style={{ width: 150, height: 150, borderRadius: 100, marginTop: 35, }} />
                <View style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 100, backgroundColor: "#6DB3EC", width: 40, height: 40, position: "absolute", bottom: -5, right: 135 }}>
                    <Entypo name="camera" size={20} color="white" />
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
                            <Text style={{ fontSize: 15, color: "#000" }}>Harish Marella</Text>
                            <MaterialIcons name="edit" size={20} color="#6DB3EC" />
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
                            <Text style={{ fontSize: 15, color: "#000" }}>marellaharish9@gmail.com</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    )
}
export default SettingsScreen