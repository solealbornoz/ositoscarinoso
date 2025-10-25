import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Ganaste() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Ganaste! 💖</Text>
      <Image
        source={require("../../assets/images/osito_principal.png")}
        style={styles.osito}
      />
      <Text style={styles.text}>¡Genial atrapaste los 3 corazones! 💘</Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => router.replace("/juego")}
      >
        <Text style={styles.botonText}>Jugar de nuevo 🔁</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.botonText}>Volver al inicio 🏠</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffb6c1",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#b5005a",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#8b0046",
    textAlign: "center",
    marginBottom: 40,
  },
  osito: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#ff66b3",
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  botonVolver: {
    backgroundColor: "#ff4081",
    padding: 15,
    borderRadius: 20,
  },
  botonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
