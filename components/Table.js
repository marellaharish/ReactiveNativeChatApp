import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const getRandomColor = () => {
    const letters = '89ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 8)]; // Using lighter shades by avoiding darker colors
    }
    return color;
}


const Table = () => {
    const randomData = [
        { name: 'John', score1: 12, score2: 15, total: 50 },
        { name: 'Alice', score1: 9, score2: 14, total: 45 },
        { name: 'Bob', score1: 11, score2: 16, total: 47 },
        { name: 'Charlie', score1: 13, score2: 12, total: 44 },
        { name: 'Diana', score1: 10, score2: 18, total: 51 },
    ];
    return (
        <View style={styles.cellContainer}>
            <View style={styles.table}>
                <View style={styles.table_head}>
                    <View style={[styles.cell, { width: "31%" }]}>
                        <Text style={styles.headerText}>Worker Name</Text>
                    </View>
                    <View style={[styles.cell, { width: "23%" }]}>
                        <Text style={styles.headerText}>Stitching</Text>
                    </View>
                    <View style={[styles.cell, { width: "23%" }]}>
                        <Text style={styles.headerText}>Alteration</Text>
                    </View>
                    <View style={[styles.cell, { width: "23%" }]}>
                        <Text style={styles.headerText}>Total</Text>
                    </View>
                </View>

                {randomData.map((item, index) => (
                    <View key={index} style={styles.table_body}>
                        <View style={[styles.cell, { width: "31%", backgroundColor: getRandomColor() }]}>
                            <Text>{item.name}</Text>
                        </View>
                        <View style={[styles.cell, { width: "23%" }]}>
                            <Text style={styles.centerText}>{item.score1}</Text>
                        </View>
                        <View style={[styles.cell, { width: "23%" }]}>
                            <Text style={styles.centerText}>{item.score2}</Text>
                        </View>
                        <View style={[styles.cell, { width: "23%" }]}>
                            <Text style={styles.centerText}>{item.total}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Table;

const styles = StyleSheet.create({
    table: {
        marginTop: 25,
        width: "100%",
        marginHorizontal: 15,
        marginBottom: 15,
        borderColor: "#DBDBDB",
        borderWidth: 2,
    },
    table_head: {
        flexDirection: "row",
    },
    table_body: {
        flexDirection: "row",
    },
    cell: {
        borderColor: "#DBDBDB",
        borderRightWidth: 1,
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    headerText: {
        fontWeight: "600",
        textAlign: 'center',
    },
    centerText: {
        textAlign: 'center',
    },
    cellContainer: {
        paddingHorizontal: 15,
    }
});
