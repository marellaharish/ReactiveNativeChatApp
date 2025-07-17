import { Dimensions, Image, Pressable, SectionList, StyleSheet, Text, View, Modal, Animated, Easing } from 'react-native'
import React, { useRef, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';




export const windowWidth = Dimensions.get('window').width;
const DATA = [
    {
        title: 'Status',
        data: [
            { key: 'My Status', description: '1m ago', image: "https://img.freepik.com/free-photo/smiley-teacher-classroom_23-2151696462.jpg?t=st=1745562354~exp=1745565954~hmac=8b21fab80d449c485d11fdb5eab34e081a04f0414e80ef3267b5c87fcb510601&w=2000" },
        ],
    },
    {
        title: 'Recent Updates',
        data: [
            { key: 'Chinna Pandora', description: '3m ago', image: "https://img.freepik.com/premium-photo/family-enjoying-beach-against-sky-during-sunset_1048944-29945983.jpg?size=338&ext=jpg" },
            { key: 'Shiva Pandora', description: '4m ago', image: "https://img.freepik.com/premium-photo/full-shot-woman-soccer-field_23-2150338714.jpg?size=338&ext=jpg" },
        ],
    },
    {
        title: 'Viewed Updates',
        data: [
            { key: 'Vamshi Pandora', description: '5m ago', image: "https://img.freepik.com/premium-photo/beautiful-nature-view-by-`cam`era_1048944-24101695.jpg?size=338&ext=jpg" },
            { key: 'Ben Pandora', description: '5m ago', image: "https://img.freepik.com/premium-photo/low-angle-fish-eye-shot-garden-city-skyscraper-singapore_76964-36271.jpg" },
            { key: 'Syntax Errorss', description: '6m ago', image: "https://img.freepik.com/premium-photo/low-angle-view-windmill-against-sky_1048944-28465286.jpg?size=338&ext=jpg" },
            { key: 'Kowshal Kumar', description: '6m ago', image: "https://img.freepik.com/free-photo/free-time-students-bachelor-s-campus-life-rhythm-five-friendly-students-are-walking_8353-6408.jpg" },
        ],
    },
];

const Updates = () => {
    const navigation = useNavigation();

    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0)).current;



    const renderItem = (item, title) => {

        if (!item || !item.image) {
            console.error('Item or image is undefined:', item);
            return null;  // Early return if item or image is undefined
        }

        const borderColor = title === 'Recent Updates' ? '#4CAF50' : '#CCC';

        return (
            <Pressable onPress={() => {
                setSelectedImage(item.image);
                setModalVisible(true);

                // Animate zoom
                scaleAnim.setValue(0);
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }).start();
            }}>

                <View style={styles.updateItem}>
                    <View
                        style={{
                            width: 65,
                            height: 65,
                            borderRadius: 50,
                            borderWidth: 3,
                            borderColor: borderColor,
                            overflow: 'hidden'
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                padding: 2,
                            }}
                        >
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 45,
                                    resizeMode: 'cover',
                                }}
                                source={{ uri: item.image }}
                            />
                        </View>
                    </View>
                    <View style={[styles.myStatus]}>
                        <View style={[styles.descriptionView]}>
                            <Text style={styles.updateTitle}>{item.key}</Text>
                            <Text style={styles.updateDescription}>{item.description}</Text>
                        </View>

                        {/* Check for "My Status" condition */}
                        {item.key === "My Status" && (
                            <View style={styles.btnContainer}>
                                <Pressable style={[styles.statusaddBtn, { marginRight: 15 }]}>
                                    <Entypo name="camera" size={22} color="black" />
                                </Pressable>
                                <Pressable style={styles.statusaddBtn} onPress={() => navigation.navigate('TypeStatus')}>
                                    <Ionicons name="pencil" size={22} color="black" />
                                </Pressable>

                            </View>
                        )}
                    </View>
                </View>
            </Pressable>
        );
    };


    const renderSectionHeader = ({ section }) => {
        const isRecentUpdates = section.title === 'Status';

        return (
            <View style={[styles.recentUpdatesHeader, isRecentUpdates && styles.header]}>
                <Text style={[styles.recentUpdatesHeaderText, isRecentUpdates && styles.headerText]}>
                    {section.title}
                </Text>
            </View>
        );
    };


    return (
        <>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} style={{ backgroundColor: "#fff", paddingHorizontal: 15 }} keyboardDismissMode="on-drag"
            >
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, section }) => renderItem(item, section.title)}
                    renderSectionHeader={renderSectionHeader}
                />
            </ScrollView>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <BlurView intensity={50} style={StyleSheet.absoluteFill}>
                    <Pressable
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => setModalVisible(false)}
                    >
                        <Animated.View
                            style={{
                                width: 300,
                                height: 300,
                                borderRadius: 150,
                                overflow: 'hidden',
                                transform: [{ scale: scaleAnim }],
                            }}
                        >
                            <Image
                                source={{ uri: selectedImage }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                }}
                            />
                        </Animated.View>
                    </Pressable>
                </BlurView>
            </Modal>

        </>
    )
}

export default Updates

const styles = StyleSheet.create({
    header: {
        paddingVertical: 10
    },
    headerText: {
        fontWeight: '600',
        fontSize: 20,
        color: "#000"
    },
    updateItem: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10
    },
    updateTitle: {
        fontSize: 16,
        fontWeight: "500"
    },
    updateDescription: {
        fontSize: 14,
        color: '#555',
        paddingVertical: 8
    },
    descriptionView: {
        paddingLeft: 20
    },
    recentUpdatesHeader: {
        paddingVertical: 10
    },
    recentUpdatesHeaderText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '400',
    },
    myStatus: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: windowWidth - 110
    },
    btnContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    statusaddBtn: {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ededed",
        borderRadius: 50
    }
});
