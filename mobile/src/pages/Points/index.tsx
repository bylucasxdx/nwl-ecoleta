import React, { useState, useEffect} from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { SvgUri } from 'react-native-svg';
import MapView, { Marker } from 'react-native-maps';

import { styles } from './styles';
import api from '../../services/api';

interface Item {
    id: number;
    title: string;
    image: string;
}

const Points = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const navigation = useNavigation();

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNaviageteToDetail() {
        navigation.navigate('Detail');
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb7a" />
                </TouchableOpacity>

                <Text style={styles.title}>Bem vindo.</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

                <View style={styles.mapContainer}>
                    <MapView 
                        style={styles.map} 
                        initialRegion={{
                            latitude: -19.8461443,
                            longitude: -45.4066893,
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,
                        }}
                    >
                        <Marker 
                            style={styles.mapMarker}
                            onPress={handleNaviageteToDetail}
                            coordinate={{
                                latitude: -19.8461443,
                                longitude: -45.4066893,
                            }}
                        >
                            <View style={styles.mapMarkerContainer}>
                                <Image 
                                    style={styles.mapMarkerImage}
                                    source={{ uri: "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" }} 
                                />
                                <Text style={styles.mapMarkerTitle}>
                                    Mercado
                                </Text>
                            </View>
                        </Marker>
                    </MapView>
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 20
                    }}
                >
                    {items.map(item => (
                        <TouchableOpacity 
                            key={String(item.id)} 
                            style={[
                                styles.item,
                                selectedItems.includes(item.id) ? styles.selectedItem : {}
                            ]} 
                            onPress={() => handleSelectItem(item.id)}
                            activeOpacity={0.6}
                        >
                            <SvgUri width={42} height={42} uri={item.image} />
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    );
}

export default Points;