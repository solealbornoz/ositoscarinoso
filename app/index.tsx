import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧸 Ositos Cariñosos 🧸</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/juego')}
      >
        <Text style={styles.buttonText}>Jugar</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>
        By: Ariana Terraza y Soledad Albornoz{'\n'}
        IG: @solari_digital
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcce0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#d63384',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ff69b4',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
});
