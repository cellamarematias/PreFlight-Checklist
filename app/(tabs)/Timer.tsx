import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

export default function TimerScreen() {
  useKeepAwake();
  // Estados para tiempo de vuelo e intervalo de cambio (en minutos)
  const [flightTime, setFlightTime] = useState<number>(60);
  const [changeInterval, setChangeInterval] = useState<number>(20);
  // Estado del timer en segundos
  const [timeLeft, setTimeLeft] = useState<number>(flightTime * 60);
  const [alarmTriggered, setAlarmTriggered] = useState<boolean>(false);

  // Cada vez que se modifique el tiempo de vuelo, reiniciamos el timer
  useEffect(() => {
    setTimeLeft(flightTime * 60);
    setAlarmTriggered(false);
  }, [flightTime]);

  // Timer que decrementa el contador cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calcula el tiempo en que debe dispararse la alarma
  useEffect(() => {
    // Alarm triggered when timeLeft equals (flightTime - changeInterval) minutes in seconds.
    const alarmThreshold = (flightTime - changeInterval) * 60;
    if (timeLeft === alarmThreshold && !alarmTriggered) {
      setAlarmTriggered(true);
      // Puedes personalizar la alarma visual (por ejemplo, con un Alert o cambiando estilos)
      Alert.alert('Atención', '¡Es momento de cambiar de tanque de combustible!');
    }
  }, [timeLeft, flightTime, changeInterval, alarmTriggered]);

  // Formateamos el tiempo (mm:ss)
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <ImageBackground
                source={require('../../assets/images/fondo_avion.png')}
                style={styles.background}
                resizeMode="cover"
            >
      <View style={styles.container}>

        {/* Botón para reiniciar el timer (opcional) */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setTimeLeft(flightTime * 60);
            setAlarmTriggered(false);
          }}
        >
          <Text style={styles.buttonText}>Reiniciar Timer</Text>
        </TouchableOpacity>


        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tiempo de vuelo (min):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={flightTime.toString()}
            onChangeText={text => setFlightTime(Number(text))}
          />

          <Text style={styles.label}>Intervalo de cambio (min):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={changeInterval.toString()}
            onChangeText={text => setChangeInterval(Number(text))}
          />
        </View>

        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        {alarmTriggered && <Text style={styles.alarmText}>¡Cambiar el tanque!</Text>}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    marginRight: 10,
  },
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#fff',
    color: '#fff',
    padding: 5,
    width: 60,
    textAlign: 'center',
  },
  timerText: {
    fontSize: 48,
    color: '#fff',
    marginVertical: 20,
  },
  alarmText: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 40,
  },
  buttonText: {
    color: '#25292e',
    fontWeight: 'bold',
  },
});
