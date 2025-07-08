import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { STREAMING_URL, SONG_INFO_URL } from '@env';
import TrackPlayer, { State, Capability, usePlaybackState } from 'react-native-track-player';
import axios from 'axios';

const headphoneImage = require('../assets/headphone.png');
const logoImage = require('../assets/logo.png');
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const RadioPlayer = ({ resetKey, autoPlay }) => {
  const [currentSong, setCurrentSong] = useState('');
  const [currentArtist, setCurrentArtist] = useState('');
  const [cover, setCover] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const playbackState = usePlaybackState();

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [Capability.Play, Capability.Pause],
      compactCapabilities: [Capability.Play, Capability.Pause],
      notificationCapabilities: [Capability.Play, Capability.Pause],
    });
  };

  const startStream = async () => {
    try {
      setError('');
      setIsLoading(true);
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: 'stream',
        url: STREAMING_URL,
        title: currentSong || 'Interligada Hits',
        artist: currentArtist || 'Rádio',
        artwork: cover || 'https://radiointerligada.com/logo.png',
      });
      await TrackPlayer.play();
    } catch (err) {
      console.error('Erro ao iniciar o player:', err);
      setError('Erro ao iniciar o player');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayback = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  useEffect(() => {
    setupPlayer().then(() => {
      if (autoPlay) startStream();
    });

    return () => {
      TrackPlayer.destroy();
    };
  }, [resetKey, autoPlay]);

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
    const intervalId = setInterval(fetchCurrentSong, 10000);
    return () => clearInterval(intervalId);
  }, [resetKey]);

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
          onPress={togglePlayback}
          disabled={isLoading}>
          <Icon
            name={playbackState === State.Playing ? 'stop' : 'play'}
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
    top: -widthScreen * 0.01,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    width: widthScreen * 0.60,
    height: widthScreen * 0.8,
    alignItems: 'center',
    position: 'relative',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'left',
  },
  cover: {
    width: widthScreen * 0.5,
    height: widthScreen * 0.5,
    margin: 10,
    borderRadius: 10,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  songText: {
    marginBottom: 0,
    color: '#FFF',
    fontSize: 13,
    flexWrap: 'wrap',
    paddingStart: 10,
    width: widthScreen * 0.56,
    fontWeight: 'bold',
  },
  artistText: {
    textAlign: 'left',
    color: '#FFF',
    fontSize: 10,
    marginBottom: 45,
    flexWrap: 'wrap',
    paddingStart: 10,
    width: widthScreen * 0.56,
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
    bottom: -widthScreen * 0.09,
    backgroundColor: '#FFDD58',
    borderRadius: 50,
    width: widthScreen * 0.2,
    height: widthScreen * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  headphoneImage: {
    position: 'absolute',
    top: -heightScreen * 0.40,
    width: widthScreen * 1.05,
    height: heightScreen,
    elevation: 9,
    resizeMode: 'contain',
  },
  logoImage: {
    position: 'absolute',
    top: -widthScreen * 0.3,
    width: widthScreen * 0.3,
    height: widthScreen,
    elevation: 15,
    zIndex: 1,
    resizeMode: 'contain',
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
    zIndex: 1,
  },
  indicatorText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#FFF',
  },
});

export default RadioPlayer;
    