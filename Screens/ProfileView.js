import { View, Text, Image, Dimensions, Pressable, ScrollView } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ToggleSwitch from 'toggle-switch-react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
const ProfileView = () => {
    const navigation = useNavigation();
    let ScreenHeight = Dimensions.get("window").height;
    const route = useRoute();
    const { name, image, email } = route.params || {};
    navigation.setOptions({
        headerTitle: "",
        headerStyle: {
            backgroundColor: '#fff',
        },
        headerShadowVisible: false,
        headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="arrow-back"
                    size={24}
                    color="black"
                />
            </View>),
        headerRight: () => (
            <Pressable>
                <Entypo name="dots-three-vertical" size={18} color="black" />
            </Pressable>
        )
    })
    return (
        <>
            <ScrollView style={{ backgroundColor: "#fff" }}>
                <View style={{
                    display: 'flex', alignItems: 'center', backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3,
                }}>
                    <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 100, }} />
                    {/* <View style={{ borderWidth: 2, borderColor: "#6DB3EC", borderRadius: 104, padding: 10 }}>
                    <Image source={require('../assets/1.png')} style={{ width: 130, height: 130, borderRadius: 100 }} />
                </View> */}

                    <Text style={{ fontSize: 18, fontWeight: 400, color: "#3b4a54", marginTop: 5 }}>{name}</Text>
                    <Text style={{ fontSize: 12, color: "#667781", marginVertical: 5 }}>{email}</Text>

                    <View style={{ display: "flex", flexDirection: "row", gap: 15, paddingVertical: 20 }}>
                        <View style={{ width: 100, height: 55, paddingVertical: 8, justifyContent: "center", display: "flex", alignItems: "center", borderWidth: 1, borderColor: "#f1f1f1", borderRadius: 8 }} >
                            <Ionicons name="call" size={18} color="#6DB3EC" />
                            <Text style={{ fontSize: 13, marginTop: 2 }}>Audio</Text>
                        </View>
                        <View style={{ width: 100, height: 55, paddingVertical: 8, justifyContent: "center", display: "flex", alignItems: "center", borderWidth: 1, borderColor: "#f1f1f1", borderRadius: 8 }} >
                            <FontAwesome name="video-camera" size={18} color="#6DB3EC" />
                            <Text style={{ fontSize: 13, marginTop: 2 }}>Video</Text>
                        </View>
                        <View style={{ width: 100, height: 55, paddingVertical: 8, justifyContent: "center", display: "flex", alignItems: "center", borderWidth: 1, borderColor: "#f1f1f1", borderRadius: 8 }} >
                            <FontAwesome name="search" size={18} color="#6DB3EC" />
                            <Text style={{ fontSize: 13, marginTop: 2 }}>Search</Text>
                        </View>

                    </View>
                </View>



                <View style={{
                    backgroundColor: "#fff", marginTop: 5, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}>
                    <View style={{ display: 'flex', padding: 15 }}>
                        <Text style={{ fontSize: 14 }}>Life❤️😍</Text>
                        <Text style={{ fontSize: 10 }}>25 Jan 2023</Text>
                    </View>
                </View>
                <View style={{
                    backgroundColor: "#fff", marginTop: 5, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}>

                    <View style={{ display: 'flex' }}>
                        <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingEnd: 15 }}>
                            <Text style={{ fontSize: 10, paddingTop: 8, paddingLeft: 10, color: "#667781" }}>Media, Links, and docs</Text>
                            <Text style={{ fontSize: 11, color: "#667781" }}>328+
                                {/* <FontAwesome5 name="greater-than" size={10} color="#667781" /> */}
                            </Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <Image source={require('../assets/1.png')} style={{ width: 100, resizeMode: "cover", height: 100, borderRadius: 10, margin: 8, marginEnd: 0 }} />
                                <Image source={require('../assets/1.png')} style={{ width: 100, resizeMode: "cover", height: 100, borderRadius: 10, margin: 8, marginEnd: 0 }} />
                                <Image source={require('../assets/1.png')} style={{ width: 100, resizeMode: "cover", height: 100, borderRadius: 10, margin: 8, marginEnd: 0 }} />
                                <Image source={require('../assets/1.png')} style={{ width: 100, resizeMode: "cover", height: 100, borderRadius: 10, margin: 8, marginEnd: 0 }} />
                                <Image source={require('../assets/1.png')} style={{ width: 100, resizeMode: "cover", height: 100, borderRadius: 10, margin: 8, marginEnd: 0 }} />
                                <Image source={require('../assets/1.png')} style={{ width: 100, resizeMode: "cover", height: 100, borderRadius: 10, margin: 8, marginEnd: 0 }} />
                            </ScrollView>
                        </View>
                    </View>
                </View >
                <View style={{
                    backgroundColor: "#fff", marginTop: 5, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingVertical: 15, paddingHorizontal: 15, justifyContent: "space-between" }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 30 }}>
                                <Ionicons name="notifications" size={19} color="#667781" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 15, }}>Mute Notifications</Text>
                            </View>
                        </View>
                        <View>
                            <ToggleSwitch
                                isOn={false}
                                onColor="green"
                                offColor="#ccc"
                                size="small"
                                onToggle={isOn => console.log("changed to : ", isOn)}
                            />
                        </View>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingVertical: 15, paddingHorizontal: 15 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 30 }}>
                                <Ionicons name="musical-note" size={19} color="#667781" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 15 }}>Custom Notifications</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingVertical: 15, paddingHorizontal: 15 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 30 }}>
                                <MaterialIcons name="image" size={19} color="#667781" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 15 }}>Media Visibility</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingVertical: 15, paddingHorizontal: 15 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 30 }}>
                                <AntDesign name="star" size={19} color="#667781" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 15 }}>Starred Messages</Text>
                            </View>
                        </View>
                    </View>
                </View >
                <View style={{
                    backgroundColor: "#fff", marginTop: 5, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingVertical: 15, paddingHorizontal: 15 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 30 }}>
                                <MaterialIcons name="lock" size={19} color="#667781" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 15 }}>Encryption</Text>
                                <Text style={{ fontSize: 13, color: "#667781" }}>Messages and calls are end-to-end encrypted. Tab to verify.</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingVertical: 5, paddingHorizontal: 15, justifyContent: "space-between" }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 30 }}>
                                <MaterialCommunityIcons name="message-text-lock" size={19} color="#667781" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 15 }}>Chat Lock</Text>
                                <Text style={{ fontSize: 13, color: "#667781" }}>Lock and hide this chat onthis device.</Text>
                            </View>
                        </View>

                        <View>
                            <ToggleSwitch
                                isOn={false}
                                onColor="green"
                                offColor="#ccc"
                                size="small"
                                onToggle={isOn => console.log("changed to : ", isOn)}
                            />
                        </View>
                    </View>
                </View>
                <View style={{
                    backgroundColor: "#fff", marginTop: 5, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingVertical: 15, paddingHorizontal: 15 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 30 }}>
                                <Entypo name="block" size={19} color="red" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 15, color: "red" }}>Block {name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingVertical: 15, paddingHorizontal: 15 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 30 }}>
                                <AntDesign name="dislike1" size={19} color="red" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 15, color: "red" }}>Report {name}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}
export default ProfileView