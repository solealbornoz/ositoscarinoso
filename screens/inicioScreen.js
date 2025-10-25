import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import Footer from "../components/Footer";
import global from "../styles/globalStyles";

export default function InicioScreen({ navigation }) {
  return (
    <View style={global.container}>
      {/* Si querés un logo encima, descomenta y agrega la imagen en assets/images/logo.png */}
      {/* <Image source={require("../../assets/images/logo.png")} style={styles.logo} /> */}

      <Text style={global.titulo}>💖 Ositos Amorosos 💖</Text>
      <Text style={[global.creditos, { marginTop: 14 }]}>
        Atrapa los corazones verdaderos
      </Text>

      <AppButton
        title="🎮 JUGAR"
        style={{ marginTop: 40 }}
        onPress={() => navigation.navigate("Juego")}
      />

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 8,
  },
});
