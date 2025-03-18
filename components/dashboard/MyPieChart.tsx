import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { PieChart } from "react-native-gifted-charts";

const MyPieChart = () => {
  const data = [
    { value: 50, label: "Category 1" },
    { value: 80, label: "Category 2" },
    { value: 90, label: "Category 3" },
    { value: 70, label: "Category 4" },
  ];

  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        donut
        showGradient
        sectionAutoFocus
        radius={80}
        innerRadius={40} // Adjust innerRadius to ensure labels are visible
        showValuesAsLabels
        // valueLabelsTextStyle={{ fontSize: 12, color: "black" }} // Ensure labels are styled correctly
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyPieChart;
