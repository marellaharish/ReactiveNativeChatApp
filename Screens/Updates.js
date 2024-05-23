import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import DP from "../assets/instagram-stories.png";
import DP1 from "../assets/5.png";

const Updates = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={styles.imageContainer}>
                    <Animated.Image
                        source={DP}
                        style={[
                            styles.image,
                            { transform: [{ rotate: spin }] }
                        ]}
                    />
                    <Image source={DP1} style={styles.image2} />
                    <Text style={{ color: "#FFF", fontWeight: '600' }}>Loading...</Text>
                    <Text style={{ textAlign: 'center', position: 'absolute', top: 480, backgroundColor: "#6DB3EC", padding: 10, borderRadius: 10, color: "#FFF", fontWeight: 800 }}>
                        Will Be Integrated Soon
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Updates;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 35,
        position: 'absolute',
    },
    image2: {
        position: 'absolute', zIndex: -1,
        borderRadius: 100,
        opacity: 0.5,
        width: 125,
        height: 125,
    }
});
