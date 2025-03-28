import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function MyMap() {
  return (
    <View style={styles.container}>
      <MapView provider='google' style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
