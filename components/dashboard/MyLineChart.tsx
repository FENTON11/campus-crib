import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-gifted-charts";

const MyLineChart = () => {
  const data = [
    { value: 50, label: "Jan" },
    { value: 200, label: "Feb" },
    { value: 90, label: "Mar" },
    { value: 1000, label: "Apr" },
    { value: 1000, label: "May" },
    { value: 800, label: "June" },
    { value: 500, label: "July" },
    { value: 800, label: "Aug" },
    { value: 700, label: "Sep" },
    { value: 300, label: "Oct" },
    { value: 400, label: "Nov" },
    { value: 1200, label: "Dec" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revenue analysis</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          areaChart
          spacing={50}
          initialSpacing={20}
          thickness={3}
          color='rgba(134, 65, 244, 1)'
          startFillColor='rgba(134, 65, 244, 0.4)'
          endFillColor='rgba(134, 65, 244, 0.1)'
          startOpacity={0.6}
          endOpacity={0}
          yAxisColor='rgba(0, 0, 0, 0.2)'
          xAxisColor='rgba(0, 0, 0, 0.2)'
          yAxisTextStyle={{ color: "rgba(0, 0, 0, 0.6)" }}
          dataPointsColor='rgba(134, 65, 244, 1)'
          dataPointsRadius={4}
          noOfSections={4}
          rulesType='solid'
          rulesColor='rgba(0, 0, 0, 0.1)'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  chartContainer: {
    width: "100%",
    height: 300, // Adjust the height as needed
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyLineChart;
