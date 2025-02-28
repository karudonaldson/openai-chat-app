import React from "react";
import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Chat App</Text>
      <Stack.Screen name="Chat" component={require("./src/screens/ChatScreen").default} />
    </View>
  );
}