import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>a3</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Press me" />
      <Image source={require("../image/1.jpg")} />
      <Image source={require("../image/1.jpg")} />
      <Image source={require("../image/1.jpg")} />
      <Image source={require("../image/1.jpg")} />
      <Image source={require("../image/1.jpg")} />
      <Image source={require("../image/1.jpg")} />
      <Image source={require("../image/1.jpg")} />
      <Image source={require("../image/1.jpg")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
