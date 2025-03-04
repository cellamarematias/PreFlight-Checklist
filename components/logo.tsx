import React from 'react';
import { Image, StyleSheet, View, ImageSourcePropType } from 'react-native';

interface LogoProps {
  height?: number;
  marginTop?: number;
}

export default function Logo({ height = 50, marginTop = 20 }: LogoProps) {
  // Obtenemos la fuente de la imagen y sus dimensiones originales
  const logoSource: ImageSourcePropType = require('../assets/images/icon.png');
  const { width: originalWidth, height: originalHeight } = Image.resolveAssetSource(logoSource);

  // Calculamos el ancho proporcional
  const calculatedWidth = (height / originalHeight) * originalWidth;

  return (
    <View style={styles.container}>
      <Image
        source={logoSource}
        style={[styles.logo, { height, width: calculatedWidth, marginTop: marginTop }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain', // Mantiene la proporción
  },
});
