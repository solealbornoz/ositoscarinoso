import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>By: Ariana Terraza y Soledad Albornoz</Text>
      <Text style={styles.text}>IG: @solari_digital</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 12,
  },
});
