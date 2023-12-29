import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation, useRoute } from "@react-navigation/native";
const DropDownSelect = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownOptions = ['New Group', 'Linked Devices', 'Starred Messages', 'Settings'];
    const navigation = useNavigation();

    const renderDropdownRow = (option, index, isSelected) => {
        return (
            <TouchableOpacity onPress={() => handleDropdownSelect(option)} style={styles.dropdownRow}>
                <Text style={styles.dropdownText}>{option}</Text>
            </TouchableOpacity>
        );
    };

    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
        if (option === 'Settings') {
            navigation.navigate('SettingsScreen'); // Replace 'SettingsScreen' with the name of your screen
        }
    };
    return (
        <View>
            <View style={styles.container}>
                <ModalDropdown
                    options={dropdownOptions}
                    onSelect={(index, option) => handleDropdownSelect(option)}
                    renderRow={renderDropdownRow}
                    textStyle={styles.dropdownButtonText}
                    dropdownStyle={styles.dropdownContainer}
                >
                    <View style={styles.dropdownTrigger}>
                        <Entypo name="dots-three-vertical" size={18} color="#fff" />
                    </View>
                </ModalDropdown>
            </View>
        </View>
    )
}
export default DropDownSelect

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropdownTrigger: {
        paddingHorizontal: 10,
    },
    dropdownContainer: {
        borderRadius: 8,
        marginTop: 8,
        marginLeft: -10,
        height: 'auto', // Set a fixed height based on the number of options
        borderWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 10.22,
        shadowRadius: 12.22,
        elevation: 1,
        borderColor: 'transparent', // Set border color to transparent
        borderWidth: 0, // Set bor 
        backgroundColor: '#fff',

    },
    dropdownRow: {
        padding: 15,
        borderWidth: 0, // Set border width to 0 
        margin: 0
    },
    dropdownText: {
        fontSize: 14,
        color: '#333',
        borderWidth: 0, // Set border width to 0 
    },
    dropdownButtonText: {
        fontSize: 14,
        color: '#333',
        borderWidth: 0, // Set border width to 0 
    },
});