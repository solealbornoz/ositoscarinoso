import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import Footer from "../components/Footer";
import global from "../styles/globalStyles";

const { width, height } = Dimensions.get("window");

export default function JuegoScreen({ navigation }) {
  const [corazones, setCorazones] = useState([]); // {id, x, anim, tipo}
  const [puntos, setPuntos] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [running, setRunning] = useState(true);

  const ositoX = useRef(new Animated.Value(width / 2 - 50)).current;
  const soundRef = useRef(null);
  const intervalRef = useRef(null);
  const idRef = useRef(0);

  useEffect(() => {
    // cargar sonido
    (async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/sounds/item-pick-up-agarra.mp3")
        );
        soundRef.current = sound;
      } catch (e) {
        console.log("Error cargando sonido:", e);
      }
    })();

    // generar corazones cada 900ms
    intervalRef.current = setInterval(() => {
      if (running) generarCorazon();
    }, 900);

    return () => {
      clearInterval(intervalRef.current);
      soundRef.current?.unloadAsync();
    };
  }, [running]);

  function generarCorazon() {
    const id = idRef.current + 1;
    idRef.current = id;
    const x = Math.random() * (width - 60);
    const tipo = Math.random() < 0.8 ? "rosa" : "negro";
    const anim = new Animated.Value(0);
    const nuevo = { id, x, anim, tipo };
    setCorazones((p) => [...p, nuevo]);

    // animar caída (4s)
    Animated.timing(anim, {
      toValue: height,
      duration: 3800 + Math.random() * 1200,
      useNativeDriver: false,
    }).start(() => {
      // cuando termina la animación, chequeamos colisión por si no fue atrapado
      setCorazones((prev) => prev.filter((c) => c.id !== id));
    });
  }

  // mover osito (izq/der)
  function moverOsito(delta) {
    Animated.timing(ositoX, {
      toValue: Math.max(0, Math.min(width - 100, ositoX._value + delta)),
      duration: 120,
      useNativeDriver: false,
    }).start();
  }

  // chequeo simple de colisiones cada 120ms
  useEffect(() => {
    const t = setInterval(() => {
      setCorazones((prev) => {
        let nuevos = [...prev];
        nuevos.forEach((c) => {
          // acceder a valor actual de anim
          const y = c.anim._value ?? 0;
          const centerX = c.x + 20;
          const ositoCenter = (ositoX._value ?? width / 2);
          // si está bajando cerca del osito y con distancia X pequeña -> colisión
          if (y > height - 220 && Math.abs(centerX - ositoCenter - 50) < 60) {
            // colisionó
            if (c.tipo === "rosa") {
              setPuntos((p) => p + 10);
              soundRef.current?.replayAsync();
            } else {
              setVidas((v) => v - 1);
            }
            nuevos = nuevos.filter((item) => item.id !== c.id);
          }
        });
        return nuevos;
      });
    }, 120);
    return () => clearInterval(t);
  }, []);

  // fin de juego
  useEffect(() => {
    if (vidas <= 0) {
      setRunning(false);
      // mostrar pantalla de fin simple (volver al inicio)
      setTimeout(() => {
        navigation.replace("Inicio");
      }, 1200);
    }
  }, [vidas]);

  return (
    <View style={styles.container}>
      {/* fondo */}
      <Image source={require("../../assets/images/f")} style={styles.fondo} />

      {/* corazones animados */}
      {corazones.map((c) => (
        <Animated.Image
          key={c.id}
          source={
            c.tipo === "rosa"
              ? require("../../assets/images/corazon_rosa.png")
              : require("../../assets/images/corazon_negro.png")
          }
          style={[
            styles.corazon,
            {
              left: c.x,
              top: c.anim,
            },
          ]}
        />
      ))}

      {/* osito */}
      <Animated.Image
        source={require("../../assets/images/ositocorazon.png")}
        style={[styles.osito, { left: ositoX }]}
      />

      {/* info */}
      <View style={styles.info}>
        <Text style={styles.infoText}>Puntos: {puntos}</Text>
        <Text style={styles.infoText}>Vidas: {vidas}</Text>
      </View>

      {/* controles */}
      <View style={styles.controles}>
        <TouchableOpacity onPress={() => moverOsito(-60)} style={styles.controlBtn}>
          <Text style={styles.controlText}>⬅️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moverOsito(60)} style={styles.controlBtn}>
          <Text style={styles.controlText}>➡️</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD6E8",
  },
  fondo: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  osito: {
    position: "absolute",
    bottom: 90,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  corazon: {
    position: "absolute",
    width: 42,
    height: 42,
    resizeMode: "contain",
  },
  info: {
    position: "absolute",
    top: 50,
    left: 18,
    right: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  controles: {
    position: "absolute",
    bottom: 18,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  controlBtn: {
    backgroundColor: "#FF69B4",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 40,
    marginHorizontal: 12,
  },
  controlText: {
    fontSize: 24,
    color: "#fff",
  },
});

