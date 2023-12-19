import { View, Text, Image, Dimensions } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';

const ProfileView = () => {
    const navigation = useNavigation();
    let ScreenHeight = Dimensions.get("window").height;
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
            </View>)
    })
    return (
        <>
            <View style={{
                display: 'flex', alignItems: 'center', backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3,
            }}>
                <Image source={require('../assets/1.png')} style={{ width: 150, height: 150, borderRadius: 100, }} />
                {/* <View style={{ borderWidth: 2, borderColor: "#6DB3EC", borderRadius: 104, padding: 10 }}>
                    <Image source={require('../assets/1.png')} style={{ width: 130, height: 130, borderRadius: 100 }} />
                </View> */}

                <Text style={{ fontSize: 18, fontWeight: 400, color: "#3b4a54" }}>Harish Marella</Text>
                <Text style={{ fontSize: 12, color: "#667781" }}>marellaharish9@gmail.com</Text>
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
        </>
    )
}
export default ProfileView