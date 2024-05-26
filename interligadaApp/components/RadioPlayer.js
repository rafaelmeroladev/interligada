import React, { useState, useEffect } from 'react';
import { View, Button, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { STREAMING_URL, SONG_INFO_URL } from '@env';
import axios from 'axios';

const RadioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    const [currentSong, setCurrentSong] = useState('');
    const [cover, setCover] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCurrentSong = async () => {
            try {
                const response = await axios.get(SONG_INFO_URL);
                const songData = response.data.playing.current;
                if (!songData.startsWith('|x|')) {
                    setCurrentSong(songData);
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
    }, []);

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
        <View style={styles.container}>
            {cover ? <Image source={{ uri: cover }} style={styles.cover} /> : null}
            <Text>{currentSong}</Text>
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Button title={isPlaying ? 'Stop' : isLoading ? 'Loading...' : 'Play'} onPress={handlePlayPause} disabled={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cover: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default RadioPlayer;
