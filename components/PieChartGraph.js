import { View, Text, StyleSheet } from 'react-native'
import { PieChart } from "react-native-gifted-charts";
const PieChartGraph = () => {
    const pieData = [
        { value: 35, color: '#fa2f5a' },
        { value: 70, color: '#313a37' }
    ];
    return (
        <View style={styles.graph}>
            <PieChart
                donut
                innerRadius={70}
                data={pieData}
                strokeColor="white"
                strokeWidth={6}
            />
        </View>
    )
}
export default PieChartGraph

const styles = StyleSheet.create({
    graph: {
        marginTop: 25,
        width: "100%",
        paddingHorizontal: 15,
        display: "flex",
        alignItems: "center",
    }
})