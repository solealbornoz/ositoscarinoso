import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Juego() {
  const router = useRouter();
  const [puntos, setPuntos] = useState(0);
  const [corazones, setCorazones] = useState([]);
  const ositoX = useRef(new Animated.Value(width / 2 - 40)).current;

  // Generar corazones
  useEffect(() => {
    const intervalo = setInterval(() => {
      const nuevo = {
        id: Date.now(),
        x: Math.random() * (width - 50),
        y: new Animated.Value(-50),
        activo: true,
      };
      setCorazones((prev) => [...prev, nuevo]);

      Animated.timing(nuevo.y, {
        toValue: height - 180,
        duration: 4000,
        useNativeDriver: false,
      }).start(() => {
        setCorazones((prev) => prev.filter((c) => c.id !== nuevo.id));
      });
    }, 1500);

    return () => clearInterval(intervalo);
  }, []);

  // Detectar colisión estable
  useEffect(() => {
    const intervalo = setInterval(() => {
      corazones.forEach((c) => {
        const yVal = c.y.__getValue();
        const ositoPos = ositoX.__getValue();

        if (
          c.activo &&
          yVal > height - 250 &&
          yVal < height - 150 &&
          Math.abs(c.x - ositoPos) < 60
        ) {
          c.activo = false;
          setPuntos((p) => p + 1);
          setCorazones((prev) => prev.filter((h) => h.id !== c.id));
        }
      });
    }, 100);

    return () => clearInterval(intervalo);
  }, [corazones]);

  // Si gana
  useEffect(() => {
    if (puntos >= 3) {
      // Pequeño delay para ver el último corazón atrapado
      setTimeout(() => {
        router.replace("/ganaste");
      }, 500);
    }
  }, [puntos]);

  const moverOsito = (delta) => {
    const nuevoX = Math.min(Math.max(ositoX.__getValue() + delta, 0), width - 80);
    Animated.timing(ositoX, {
      toValue: nuevoX,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Atrapa 3 corazones para ganar! 💖</Text>
      <Text style={styles.puntos}>Puntos: {puntos}</Text>

      {corazones.map((c) => (
        <Animated.Image
          key={c.id}
          source={require("../../assets/images/corazon_rosa.png")}
          style={[styles.corazon, { left: c.x, top: c.y }]}
        />
      ))}

      <Animated.Image
        source={require("../../assets/images/osito_principal.png")}
        style={[styles.osito, { left: ositoX }]}
      />

      <View style={styles.controles}>
        <TouchableOpacity style={styles.boton} onPress={() => moverOsito(-40)}>
          <Text style={styles.flecha}>⬅️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => moverOsito(40)}>
          <Text style={styles.flecha}>➡️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc0cb",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d63384",
    marginBottom: 10,
  },
  puntos: {
    fontSize: 18,
    color: "#b5005a",
    marginBottom: 10,
  },
  corazon: {
    position: "absolute",
    width: 40,
    height: 40,
  },
  osito: {
    position: "absolute",
    bottom: 100,
    width: 80,
    height: 80,
  },
  controles: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    gap: 20,
  },
  boton: {
    backgroundColor: "#ff66b3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
  },
  flecha: {
    fontSize: 24,
  },
});

