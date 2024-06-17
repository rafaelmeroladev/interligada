import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Alert,FlatList, TouchableOpacity, Text,Linking } from 'react-native';
import axios from 'axios';
import { API_BASE_URL, API_BASE_IMAGE_URL } from '@env';
import { color } from 'react-native-elements/dist/helpers';

const { width } = Dimensions.get('window');

const SponsorBanner = ({resetKey}) => {
    const [sponsors, setSponsors] = useState([]);
    const flatListRef = useRef(null);
    const Header = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      };

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/sponsors`);
                setSponsors(response.data);
            } catch (error) {
                console.error('Erro ao carregar os sponsors:', error.message);
            }
        };

        fetchSponsors();
    }, [resetKey]);

    useEffect(() => {
        if (sponsors.length > 1) {
            let scrollValue = 0;
            const scrollInterval = setInterval(() => {
                scrollValue += width / 2;
                if (scrollValue >= width * sponsors.length / 2) {
                    scrollValue = 0;
                }
                flatListRef.current.scrollToOffset({ animated: true, offset: scrollValue });
            }, 3000); // A cada 3 segundos

            return () => clearInterval(scrollInterval);
        }
    }, [sponsors]);

    const handlePress = async (url) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert('Erro', 'Não foi possível abrir o link:'+url);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível abrir o link:'+url+' - '+error);
        }
    };

    return (
        <View style={styles.bannerContainer}>
            <FlatList
                ref={flatListRef}
                data={sponsors}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                renderItem={({ item }) => (
                    <TouchableOpacity  style={{zIndex:1500}} onPress={() => handlePress(item.link)}>
                        <View style={styles.bannerItem}>
                            <Image
                                source={{ uri: `${API_BASE_IMAGE_URL}/${item.imagem}` }}
                                style={styles.bannerImage}
                            />
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        width: width,
        height: width*0.20,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        marginTop: width*0.05,
        position: 'flex',
        zIndex: 20000
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerItem: {
        width: width / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerImage: {
        width: width * 0.5,
        height: width*0.20,
        resizeMode: 'contain',
    },
    bannerLink: {
        color: '#FFC655',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
    },
    bannerName: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
    },
});

export default SponsorBanner;
