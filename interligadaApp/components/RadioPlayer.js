import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { STREAMING_URL, SONG_INFO_URL } from '@env';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import SponsorBanners from './SponsorBanners';

// Importe a imagem do headphone
const headphoneImage = require('../assets/headphone.png');
const logoImage = require('../assets/logo.png');
const  widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const RadioPlayer = ({ resetKey, autoPlay }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    const [currentSong, setCurrentSong] = useState('');
    const [currentArtist, setCurrentArtist] = useState('');
    const [cover, setCover] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCurrentSong = async () => {
            try {
                const response = await axios.get(SONG_INFO_URL);
                const songData = response.data.playing.current;
                if (!songData.startsWith('|x|')) {
                    const [artist, title] = songData.split(' - ');
                    setCurrentSong(title || songData);
                    setCurrentArtist(artist || '');
                    setCover(response.data.song_data.cover);
                }
            } catch (error) {
                console.error('Erro ao buscar a música atual:', error);
            }
        };

        fetchCurrentSong();
        const intervalId = setInterval(fetchCurrentSong, 10000); // Atualiza a cada 10 segundos

        return () => {
            clearInterval(intervalId);
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [resetKey]);

    useEffect(() => {
        const play = async () => {
            setError('');
            setIsLoading(true);

            try {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: STREAMING_URL },
                    { shouldPlay: true }
                );
                setSound(newSound);

                await Audio.setAudioModeAsync({
                    staysActiveInBackground: true,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false,
                });

                setIsPlaying(true);
            } catch (error) {
                console.error('Erro ao carregar o som:', error);
                setError('Erro ao carregar o áudio. Por favor, tente novamente.');
            } finally {
                setIsLoading(false);
            }
        };

        if (autoPlay) {
            play();
        }

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [resetKey, autoPlay]);

    const handlePlayPause = async () => {
        setError('');
        setIsLoading(true);

        try {
            if (isPlaying) {
                await sound.unloadAsync(); // Descarrega o som para recarregar o buffer
                setIsPlaying(false);
                setSound(null);
            } else {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: STREAMING_URL },
                    { shouldPlay: true }
                );
                setSound(newSound);

                await Audio.setAudioModeAsync({
                    staysActiveInBackground: true,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false,
                });

                setIsPlaying(true);
            }
        } catch (error) {
            console.error('Erro ao controlar o som:', error);
            setError('Erro ao carregar o áudio. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <LinearGradient colors={['#FFDD58', '#FFC655']} style={styles.gradient}>
     
            <View style={styles.bgPlayer}>
                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <Text style={styles.indicatorText}>Conectando...</Text>
                        <ActivityIndicator size="small" color="#0000ff" />
                    </View>
                )}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Image source={headphoneImage} style={styles.headphoneImage} />
                <View style={styles.container}>
                    {cover ? <Image source={{ uri: cover }} style={styles.cover} /> : null}
                    <Text style={styles.songText}>{currentSong}</Text>
                    <Text style={styles.artistText}>{currentArtist}</Text>
                </View>
                <TouchableOpacity 
                        style={styles.playPauseButton} 
                        onPress={handlePlayPause} 
                        disabled={isLoading}>
                        <Icon 
                            name={isPlaying ? 'stop' : 'play'} 
                            size={30} 
                            color="#000" 
                        />
                </TouchableOpacity>
            </View>
            <Image source={logoImage} style={styles.logoImage} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgPlayer: {
        backgroundColor: 'rgba(48, 47, 47, 0.95)',
        padding: 20,
        top: -widthScreen*0.01,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        width: widthScreen*0.60, 
        height: widthScreen*0.8,
        alignItems: 'center',
        position: 'relative', // Necessário para posicionamento absoluto
    },
    container: {
        justifyContent: 'center',
        alignItems: 'left',
        
    },
    cover: {
        width: widthScreen*0.5,
        height: widthScreen*0.5,
        margin: 10,
        borderRadius: 10,
        resizeMode: 'covers',
        alignItems:'center',
        justifyContent: 'center',
        position:'flex',
        elevation:0 // Bordas arredondadas para a imagem
    },
    songText: {
        marginBottom: 0,
        color: '#FFF',
        fontSize: 13,
        flexWrap: 'wrap',
        paddingStart:10,
        width: widthScreen*0.56,
        fontWeight: 'bold',
    },
    artistText: {
        textAlign: 'left',
        color: '#FFF',
        fontSize: 10,
        marginBottom: 45,
        flexWrap: 'wrap',
        paddingStart:10,
        width: widthScreen*0.56,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 0,
        marginBottom: 0,
    },
    playPauseButton: {
        position: 'absolute',
        bottom: -widthScreen*0.09, // Ajuste para sobrepor o botão na borda inferior
        backgroundColor: '#FFDD58',
        borderRadius: 50, // Torna o botão redondo
        width: widthScreen*0.2,
        height: widthScreen*0.2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
        
    },
    buttonText: {
        fontSize: 30, // Tamanho da fonte para os caracteres do botão
        color: '#000',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(48, 47, 47, 0.8)',
        borderRadius: 20,
        zIndex: 1, // Garante que o overlay fique acima do conteúdo
    },
    indicatorText: {
        marginBottom: 10,
        fontSize: 16,
        color: '#FFF',
    },
    headphoneImage: {
        position: 'absolute',
        top: -heightScreen*0.40, // Ajuste conforme necessário
        width: widthScreen*1.05,
        height: heightScreen,
        elevation: 9,
        resizeMode: 'contain',
    },
    logoImage: {
        position: 'absolute',
        top: -widthScreen*0.3, // Ajuste conforme necessário
        width: widthScreen*0.3,
        height: widthScreen,
        elevation: 15,
        zIndex: 1, // Garante que a logo fique acima dos outros elementos
        resizeMode: 'contain',
        
    },
});


export default RadioPlayer;
