import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from 'react-native-vector-icons'; // Make sure to install this library
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { flexBox, FontSizes, Padding } from '../styles/Global';
import { useHeaderHeight } from '@react-navigation/elements';

const { width, height } = Dimensions.get('window');

const PhoneNumberScreen = () => {
    const navigation = useNavigation();
    const headerHeight = useHeaderHeight();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.headerTitle}>Enter your phone number</Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                    <Ionicons name="chevron-back" size={30} color="#066f9e" />
                </TouchableOpacity>
            ),
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#f3f2f7' },
            headerBackVisible: false,
            headerRight: () => (
                <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={30} color="#066f9e" style={styles.icon} />
            ),
        });
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView>
                <Text style={[styles.text]}>
                    WhatsApp will need to verify your account. Carrier charges may apply.
                </Text>


                <View style={[flexBox.colBetween]}>

                    <View style={[styles.CountryCodesView]}>
                        <View style={[styles.Country]}>
                            <Text style={[{ color: "#0b749e" }]}>India</Text>
                            <MaterialIcons name="arrow-forward-ios" size={15} color="#c2c2c2" />
                        </View>
                        <View style={[styles.phNum]}>
                            <Text>+91</Text>
                            <TextInput placeholder='your phone number' style={[styles.input]} placeholderTextColor="#e3e3e3" />
                        </View>
                    </View>


                    <TouchableOpacity style={[styles.touchableOpacity]}>
                        <Text style={[styles.btnText]}>Next</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default PhoneNumberScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f2f7",
        height: height,
        paddingHorizontal: Padding.p_xxl
    },
    headerTitle: {
        color: '#000002',
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
    },
    icon: {
        marginRight: 16
    },
    text: {
        color: "#828187",
        fontSize: FontSizes.small
    },
    touchableOpacity: {
        // backgroundColor: "#e4e3e8",
        backgroundColor: "#066f9e",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 15
    },
    btnText: {
        // color: "#b0afb5",
        color: "#FFF",
        fontSize: 16
    },
    CountryCodesView: {
        backgroundColor: "#FFF",
        padding: 15,
        marginVertical: 25,
        borderRadius: 15
    },
    Country: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 5,
        paddingBottom: 15,
        borderBottomColor: "#c2c2c2",
        borderBottomWidth: 0.75,
    },
    phNum: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        padding: 5,
        paddingTop: 10,
    },
    input: {
        marginStart: 10
    }
});
