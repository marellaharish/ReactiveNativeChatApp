import { LineChart } from "react-native-gifted-charts";

import { View, Text, StyleSheet } from 'react-native'

const LineChartGraph = () => {
    const data = [
        { value: 15, label: 'Mon' },
        { value: 30, label: 'Tue' },
        { value: 23, label: 'Wed' },
        { value: 40, label: 'Thu' },
        { value: 16, label: 'Fri' },
        { value: 40, label: 'Sat' },
    ];
    return (
        <View style={styles.graph}>
            <Text style={styles.graphText}></Text>
            <LineChart
                data={data}
                color={'#177AD5'}
                thickness={2}
                spacing={55}
            />
        </View>
    )
}
export default LineChartGraph

const styles = StyleSheet.create({
    graph: {
        marginTop: 25,
        width: "100%",
        paddingHorizontal: 15
    }
})