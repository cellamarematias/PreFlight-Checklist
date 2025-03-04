import Logo from '@/components/logo';
import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, ImageBackground, FlatList, TouchableOpacity } from 'react-native';

export default function Index() {
  // Simulación de lista de aviones
  const aviones = [
    { id: '1', nombre: 'Tecnam P2002 LV - S028' },
    { id: '2', nombre: 'AL3 LV - S147' },
  ];

  const router = useRouter();


  return (
    <ImageBackground
      source={require('../../assets/images/fondo_avion.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} /> {/* Capa semitransparente */}
      <View style={styles.container}>
        {/* 📌 Logo arriba */}
        <View style={styles.logoContainer}>
          <Logo height={50} marginTop={40}/>
        </View>
        {/* 📌 Subtítulo debajo del logo */}
        <Text style={styles.subtitle}>Seleccioná el avión</Text>
        {/* 📌 Lista de aviones ocupando el espacio restante */}
        <View style={styles.listContainer}>
          <FlatList
            data={aviones}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => router.push(`/checklist/${encodeURIComponent(item.id)}`)}
              >
                <View style={styles.listItem}>
                  <Text style={styles.listText}>{item.nombre}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40, // Espacio para el logo
    paddingBottom: 80, // Evita que la lista se solape con la navegación
  },
  logoContainer: {
    marginBottom: 20, // Espacio entre el logo y el subtítulo
  },
  subtitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 20, // Espacio antes de la lista
  },
  listContainer: {
    flex: 1, // Ocupa el espacio restante
    width: '100%',
    paddingHorizontal: 16,
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    marginVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  listText: {
    color: '#fff',
    fontSize: 18,
  },
});
