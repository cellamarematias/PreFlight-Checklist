import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
        headerStyle: {
          backgroundColor: '#C70817',
        },
        headerShadowVisible: false,
        headerTintColor: '#FFFFFF',
        tabBarStyle: {
          position: 'absolute',  // 📌 Hace que la barra sea flotante
          bottom: 0,  // 📌 Separación del borde inferior
          left: 20,
          right: 20,
          backgroundColor: 'rgba(199, 8, 23, 0.4)', // 🔴 Rojo con transparencia
          borderTopWidth: 0, // 🔥 Elimina la línea superior
          elevation: 0, // 🔥 Elimina la sombra en Android
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // href: null, // esto lo saca del botom tab
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="Timer"
        options={{
          title: 'Timer',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="airplane-clock" size={24} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
