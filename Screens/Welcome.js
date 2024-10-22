import { useHeaderHeight } from '@react-navigation/elements';
import { Dimensions, Image, Linking, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { welcomeBg } from '../assets';
import { FontSizes, Padding } from '../styles/Global';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');


const Welcome = () => {
    const headerHeight = useHeaderHeight();
    const navigation = useNavigation();
    const handlePrivacyPolicy = () => {
        Linking.openURL('https://your-privacy-policy-link.com');
    };

    const handleTermsOfService = () => {
        Linking.openURL('https://your-terms-of-service-link.com');
    };
    return (
        <View style={[{ paddingTop: headerHeight }, styles.container]}>
            <Image source={welcomeBg} style={[styles.homeImage]} />

            <Text style={[styles.welcomeText1]}>Welocme to{"\n"}
                {/* ShiftChat */}
            </Text>
            <Text style={styles.welcomeText2}>
                Read our
                <Text style={styles.link}> Privacy Policy</Text>
                . Tap "Agree & Continue"
                to accept the
                <Text style={styles.link}> Terms of Service</Text>
            </Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("PhoneNumberScreen")}>
                <Text style={[styles.welcomeText3]}>
                    Agree & Continue
                </Text>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default Welcome;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        height: height,
        backgroundColor: "#FFFFFF"
    },
    homeImage: {
        width: "90%",
        height: 280,
        opacity: 0.6
    },
    welcomeText1: {
        fontSize: FontSizes.large,
        fontWeight: 600,
        padding: Padding.p_2xxl,
        textAlign: "center",
        lineHeight: 45,
        color: "#1e1e1e",
    },
    welcomeText2: {
        paddingHorizontal: 40,
        textAlign: "center",
        fontSize: FontSizes.normal,
        lineHeight: 30,
    },
    welcomeText3: {
        color: "#107ae8",
        fontSize: 26,
        fontWeight: 500,
        textAlign: "center",
        paddingTop: Padding.p_2xxl,
    },
    link: {
        color: "#107ae8",
        fontSize: FontSizes.normal,
    },
});
