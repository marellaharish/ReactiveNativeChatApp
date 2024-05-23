import React, { useState, useEffect, useRef } from "react";
import { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, useWindowDimensions, Pressable, ScrollView } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import DropDownSelect from '../components/DropDownSelect';
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";
import SalesGraph from "../components/SalesGraph";
import Table from "../components/Table";
import PieChartGraph from "../components/PieChartGraph";
import LineChartGraph from "../components/LineChartGraph";
import HorizontalBarGraph from "../components/HorizontalBarGraph";
const GraphReports = () => {
    const navigation = useNavigation();

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


    const [darkmode, setDarkmode] = useState(false);
    const [device, setDevice] = useState(false);
    const { width } = useWindowDimensions();
    const [theme, setTheme] = useState("dim");
    const [isOpen, setIsOpen] = useState(false);

    const bottomSheetModalRef = useRef(null);

    const snapPoints = ["35%", "35%"];

    function handlePresentModal() {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
            setIsOpen(true);
        }, 100);
    }

    function handleCloseModal() {
        bottomSheetModalRef.current?.close();
        setIsOpen(false);
    }

    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
            dateFormat: "dayofweek day month"
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };





    return (

        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.reportingMonth}>
                            <Text style={styles.reportingMonthText}>
                                Reporting Month
                            </Text>
                            <Pressable onPress={showDatepicker} style={styles.datepicker}>
                                <Text style={styles.datepickerText}>
                                    January 2024
                                </Text>
                                <MaterialIcons name="date-range" size={24} color="black" />
                            </Pressable>
                            <SafeAreaView>
                                {/* <Text>selected: {date.toLocaleString()}</Text> */}
                            </SafeAreaView>
                        </View>

                        <View style={styles.paymentsRow}>
                            <View style={styles.paymentContainer}>
                                <Text style={[styles.paymentText, styles.amountpending]}>
                                    &#8377; 25000
                                </Text>
                                <Text style={styles.paymentSubText}>Amount Recived</Text>
                            </View>
                            <View style={styles.paymentContainer}>
                                <Text style={[styles.paymentText, styles.amountrecived]}>
                                    &#8377; 25000
                                </Text>
                                <Text style={styles.paymentSubText}>Amount Pending</Text>
                            </View>
                        </View>
                        <View style={styles.statusRow}>
                            <View style={styles.statusContainer}>
                                <Text style={styles.textOne}>Active</Text>
                                <Text style={[styles.textAmount, styles.active]}>09</Text>
                            </View>
                            <View style={styles.statusContainer}>
                                <Text style={styles.textOne}>Completed</Text>
                                <Text style={[styles.textAmount, styles.complted]}>05</Text>
                            </View>
                            <View style={styles.statusContainer}>
                                <Text style={styles.textOne}>Delivered</Text>
                                <Text style={[styles.textAmount, styles.delevired]}>08</Text>
                            </View>
                        </View>
                        <View style={styles.reportsHead}>
                            <Text style={styles.headTxt}>
                                Sales Report
                            </Text>
                        </View>

                        <SalesGraph />

                        <View style={styles.reportsHead}>
                            <Text style={styles.headTxt}>
                                Employee Report
                            </Text>
                        </View>

                        <Table />


                        <View style={styles.reportsHead}>
                            <Text style={styles.headTxt}>
                                Sales Split
                            </Text>
                        </View>

                        <PieChartGraph />
                        <View style={styles.reportsHead}>
                            <Text style={styles.headTxt}>
                                Year Sales
                            </Text>
                        </View>
                        <LineChartGraph />

                        <View style={styles.reportsHead}>
                            <Text style={styles.headTxt}>
                                Prediction
                            </Text>
                        </View>
                        <View style={{ width: "100%" }}>
                            <HorizontalBarGraph />
                        </View>





























                        <Button title="Present Modal" onPress={handlePresentModal} />
                    </View>


                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        backgroundStyle={{
                            borderRadius: 20, shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 12,
                            },
                            shadowOpacity: 10,
                            shadowRadius: 4.65,

                            elevation: 8,
                        }}
                        onDismiss={handleCloseModal}
                        onClose={handleCloseModal}
                    >
                        <View style={styles.contentContainer}>
                            <View style={styles.headtextIcon}>
                                <Text style={[styles.title, { width: "100%" }]}>Filter by</Text>
                                <Pressable onPress={handleCloseModal}>
                                    <Ionicons name="close" size={24} color="black" />
                                </Pressable>
                            </View>

                            <Pressable style={styles.row} onPress={() => setTheme("mostrecent")}>
                                <Text style={styles.subtitle}>Most Recent</Text>
                                {theme === "mostrecent" ? (
                                    <AntDesign name="checkcircle" size={24} color="#4A98E9" />
                                ) : (
                                    <Entypo name="circle" size={24} color="#56636F" />
                                )}
                            </Pressable>
                            <Pressable
                                style={styles.row}
                                onPress={() => setTheme("oldest")}
                            >
                                <Text style={styles.subtitle}>Oldest</Text>
                                {theme === "oldest" ? (
                                    <AntDesign name="checkcircle" size={24} color="#4A98E9" />
                                ) : (
                                    <Entypo name="circle" size={24} color="#56636F" />
                                )}
                            </Pressable>
                            <Pressable
                                style={styles.row}
                                onPress={() => setTheme("highestamount")}
                            >
                                <Text style={styles.subtitle}>Highest Amount</Text>
                                {theme === "highestamount" ? (
                                    <AntDesign name="checkcircle" size={24} color="#4A98E9" />
                                ) : (
                                    <Entypo name="circle" size={24} color="#56636F" />
                                )}
                            </Pressable>
                            <Pressable
                                style={styles.row}
                                onPress={() => setTheme("leastamount")}
                            >
                                <Text style={styles.subtitle}>Least Amount</Text>
                                {theme === "leastamount" ? (
                                    <AntDesign name="checkcircle" size={24} color="#4A98E9" />
                                ) : (
                                    <Entypo name="circle" size={24} color="#56636F" />
                                )}
                            </Pressable>


                        </View>
                    </BottomSheetModal>
                </ScrollView>

            </BottomSheetModalProvider>
        </GestureHandlerRootView >
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
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
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 35,

    },
    row: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
    },
    title: {
        fontWeight: "900",
        letterSpacing: 0.5,
        fontSize: 16,
        marginVertical: 8,
    },
    subtitle: {
        color: "#101318",
        fontSize: 14,
    },
    headtextIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 6,
        marginBottom: 10,
    },
    reportingMonth: {
        display: "flex",
        alignItems: "center",

    },
    reportingMonthText: {
        fontSize: 16,
        fontWeight: "400",
    },
    datepicker: {
        paddingHorizontal: 15,
        backgroundColor: "white",
        paddingVertical: 5,
        marginVertical: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    datepickerText: {
        marginEnd: 10,
        fontSize: 14,
        fontWeight: "600",
        color: "#36897f"
    },
    paymentsRow: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%"
    },
    statusRow: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginTop: 25
    },
    paymentContainer: {
        borderColor: "#DBDBDB",
        borderRadius: 8,
        borderWidth: 2,
        width: "40%",
        display: "flex",
        alignItems: "center",
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        backgroundColor: "white"
    },
    paymentText: {
        fontSize: 22,
        fontWeight: "800",
    },
    paymentSubText: {
        fontSize: 16
    },
    amountpending: {
        color: "#36897f"
    },
    amountrecived: {
        color: "#8c0d18"
    },
    statusContainer: {
        width: "30%",
        display: "flex",
        alignItems: "center",
    },
    textOne: {
        fontSize: 16,
    },
    textAmount: {
        fontSize: 20,
        fontWeight: "800"
    },
    active: {
        color: "#8c0d18"
    },
    complted: {
        color: "#166fa9"
    },
    delevired: {
        color: "#379324"
    },
    reportsHead: {
        width: "100%",
        paddingVertical: 6,
        backgroundColor: "#e2ebe8",
        marginTop: 25
    },
    headTxt: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "800",

    }
});
export default GraphReports