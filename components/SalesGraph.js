import { View, Text, StyleSheet } from 'react-native'
import { BarChart } from "react-native-gifted-charts";

const SalesGraph = () => {
    const barData = [
        { value: 25000, label: 'Week 1', frontColor: '#eb95ba' },
        { value: 50000, label: 'Week 2', frontColor: '#88c9e9' },
        { value: 74500, label: 'Week 3', frontColor: '#fcb13c' },
        { value: 32000, label: 'Week 4', frontColor: '#d55669' },
        { value: 60000, label: 'Week 5', frontColor: '#92bfba' },
    ];
    return (
        <View style={styles.graph}>
            <BarChart
                barWidth={35}
                noOfSections={6}
                barBorderRadius={0}
                data={barData}
                yAxisThickness={1}
                xAxisThickness={1}
                xAxisColor={'#ccc'}
                yAxisColor={'#ccc'}
                spacing={25}
            />
        </View>
    )
}
export default SalesGraph

const styles = StyleSheet.create({
    graph: {
        marginTop: 25,
        width: "100%",
        paddingHorizontal: 15
    }
})