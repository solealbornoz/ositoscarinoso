import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
  },
});
