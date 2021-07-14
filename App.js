import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import useSleepTips from "./hooks/useSleepTips";

export default function App() {
  const { activeTip, addToRead, clearReadTips } = useSleepTips();
  return (
    <View style={styles.container}>
      {activeTip ? (
        <View>
          <Text>{activeTip.title}</Text>
          <Text>{activeTip.content}</Text>
          <Button title="Next tip" onPress={() => addToRead(activeTip.id)} />
        </View>
      ) : null}
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
