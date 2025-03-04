import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import Logo from '@/components/logo';
import rawData from '../../checklist.json'; // Ajusta la ruta según la ubicación real

interface ChecklistItem {
    id: number;
    order: number;
    description: string;
    action: string;
    is_section: boolean;
}

interface Aircraft {
    id: number;
    aircraft_name: string;
    checklist: ChecklistItem[];
}

interface ChecklistData {
    aircrafts: Aircraft[];
}


export default function ChecklistDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
    const navigation = useNavigation();
    const checklistData = rawData as ChecklistData;

    useEffect(() => {
        if (!id) return; // Verifica que id exista
        const aircraftId = parseInt(id, 10);
        const selectedAircraft = checklistData.aircrafts.find(aircraft => aircraft.id === aircraftId);
    
        if (selectedAircraft) {
            setChecklist(selectedAircraft.checklist);
    
            // Actualizar el título del header con el nombre del avión
            navigation.setOptions({
                title: `${selectedAircraft.aircraft_name}`,
                headerShown: true,
                headerStyle: {
                    backgroundColor: 'rgb(167, 0, 14)',
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "bold",
                },
            });
        }
    }, [id, navigation]);
    
    // Simulación de llamada a API
    useEffect(() => {
        if (!id) return; // Verifica que id exista
        const aircraftId = parseInt(id, 10);
        const selectedAircraft = checklistData.aircrafts.find(aircraft => aircraft.id === aircraftId);

        if (selectedAircraft) {
            setChecklist(selectedAircraft.checklist);
        }
    }, [id]);

    const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

    const handleCheck = (itemId: number) => {
        const updatedCheckedItems = new Set(checkedItems);
        if (updatedCheckedItems.has(itemId)) {
            updatedCheckedItems.delete(itemId);
        } else {
            updatedCheckedItems.add(itemId);
        }
        setCheckedItems(updatedCheckedItems);
    };

    const renderItem = ({ item }: { item: ChecklistItem }) => {
        if (item.is_section) {
            return (
                <View style={styles.listItemSection}>
                    <Text style={styles.listTextSection}>{item.description}</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => handleCheck(item.id)}
                style={[styles.listItem, checkedItems.has(item.id) && styles.listItemChecked]}
                activeOpacity={0.7} // Efecto al presionar
            >
                <View style={styles.textContainer}>
                    <Text style={[styles.listText, checkedItems.has(item.id) && styles.tachado]}>
                        {item.description}
                    </Text>
                    <Text style={[styles.listTextAction, checkedItems.has(item.id) && styles.tachado]}>
                        {item.action}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground
            source={require('../../assets/images/fondo_avion.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay} />{/* Capa semitransparente */}
            <View style={styles.container}>
                {/* 📌 Logo arriba */}
                <View style={styles.logoContainer}>
                    <Logo height={50} marginTop={0}/>
                </View>
                {/* 📌 Lista de aviones ocupando el espacio restante */}
                <View style={styles.listContainer}>
                    <FlatList
                        data={checklist}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        extraData={checkedItems}
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
        paddingBottom: 20, // Evita que la lista se solape con la navegación
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
        paddingHorizontal: 6,
    },
    listItemSection: {
        backgroundColor: 'rgba(47, 47, 47, 0.5)',
        color: '#fffff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    listTextSection: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    listItem: {
        backgroundColor: 'rgba(199, 8, 23, 0.4)',
        padding: 15,
        marginVertical: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    listItemChecked: {
        backgroundColor: 'rgba(47, 47, 47, 0.5)',
        padding: 15,
        marginVertical: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: "row", // Organiza los elementos en fila
        justifyContent: "space-between", // Separa los textos a los extremos
        alignItems: "flex-start", // Alinea los textos en la parte superior
        width: "100%", // Asegura que ocupe todo el ancho disponible
    },
    listText: {
        fontSize: 15,
        color: '#ffffff',
        width: '65%'
    },
    listTextAction: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    tachado: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
});

