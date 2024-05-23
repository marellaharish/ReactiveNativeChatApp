import { View, Text, StyleSheet } from 'react-native'
import { BarChart } from "react-native-gifted-charts";

const HorizontalBarGraph = () => {
    const barData = [
        {
            value: 250, frontColor: '#36897f',
            topLabelComponent: () => (
                <Text style={{ color: 'blue', fontSize: 18, marginBottom: 6 }}>&#8377; 25000</Text>
            ),
        },
        {
            value: 300, frontColor: '#1fa0e1',
            topLabelComponent: () => (
                <Text style={{ color: 'blue', fontSize: 18, marginBottom: 6 }}>&#8377; 25000</Text>
            ),
        },
    ];
    return (
        <View style={styles.graph}>
            <BarChart
                horizontal
                barWidth={35}
                noOfSections={6}
                frontColor="lightgray"
                data={barData}
                yAxisThickness={1}
                xAxisThickness={1}
            />
        </View>
    )
}
export default HorizontalBarGraph

const styles = StyleSheet.create({
    graph: {
        marginTop: 15,
        width: "100%",
        paddingHorizontal: 15
    }
})