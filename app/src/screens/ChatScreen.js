import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import axios from "axios";

// Update this with your WSL IP (172.31.174.126)
const API_BASE_URL = "http://172.31.174.126:5000";  

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]); // Update UI instantly

    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, { message: input });
      const botMessage = { text: response.data.reply, sender: "bot" };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setInput(""); // Clear input field
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={item.sender === "user" ? styles.userText : styles.botText}>
            {item.text}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  input: { borderWidth: 1, padding: 10, marginTop: 10 },
  userText: { alignSelf: "flex-end", padding: 10, backgroundColor: "#D1EDFF", marginVertical: 5 },
  botText: { alignSelf: "flex-start", padding: 10, backgroundColor: "#EAEAEA", marginVertical: 5 },
});

export default ChatScreen;
