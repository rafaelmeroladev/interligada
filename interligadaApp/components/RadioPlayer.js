import { useEffect, useState, useRef } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
  Dimensions, ActivityIndicator, NativeModules, NativeEventEmitter
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';
import axios from 'axios';
import { STREAMING_URL, SONG_INFO_URL } from '@env';

const { RadioServiceModule } = NativeModules;
const radioEmitter = RadioServiceModule ? new NativeEventEmitter(RadioServiceModule) : null;

const headphoneImage = require('../assets/headphone.png');
const logoImage = require('../assets/logo.png');

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const RadioPlayer = ({ resetKey }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('');
  const [currentArtist, setCurrentArtist] = useState('');
  const [cover, setCover] = useState('');
  const [error, setError] = useState('');
  const songRef = useRef({ title: 'Interligada Hits', artist: 'Ao vivo', cover: '' });
  const isPlayingRef = useRef(false);
  const player = useAudioPlayer(STREAMING_URL);

  // Configura áudio e inicia foreground service
  useEffect(() => {
    const setup = async () => {
      try {
        await setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
        });
        player.play();
        isPlayingRef.current = true;
        setIsPlaying(true);
        RadioServiceModule?.startService('Interligada Hits', 'Ao vivo', '', true);
      } catch (e) {
        console.error('Erro ao iniciar o player:', e);
        setError('Erro ao iniciar o player.');
      } finally {
        setIsLoading(false);
      }
    };

    setup();

    // Registra listener para toggle vindo da notificação
    RadioServiceModule?.addListener('onTogglePlayback');
    const sub = radioEmitter?.addListener('onTogglePlayback', () => {
      if (isPlayingRef.current) {
        player.pause();
        isPlayingRef.current = false;
        setIsPlaying(false);
        RadioServiceModule?.updateMetadata(
          songRef.current.title, songRef.current.artist,
          songRef.current.cover, false
        );
      } else {
        player.play();
        isPlayingRef.current = true;
        setIsPlaying(true);
        RadioServiceModule?.updateMetadata(
          songRef.current.title, songRef.current.artist,
          songRef.current.cover, true
        );
      }
    });

    return () => {
      sub?.remove();
      RadioServiceModule?.removeListeners(1);
      RadioServiceModule?.stopService();
    };
  }, [resetKey]);

  // Busca info da música atual
  useEffect(() => {
    const fetchCurrentSong = async () => {
      try {
        const response = await axios.get(SONG_INFO_URL);
        const songData = response.data.playing.current;
        if (!songData.startsWith('|x|')) {
          const [artist, title] = songData.split(' - ');
          const songTitle = title || songData;
          const songArtist = artist || '';
          const coverUrl = response.data.song_data.cover || '';
          setCurrentSong(songTitle);
          setCurrentArtist(songArtist);
          setCover(coverUrl);
          songRef.current = { title: songTitle, artist: songArtist, cover: coverUrl };
          RadioServiceModule?.updateMetadata(songTitle, songArtist, coverUrl, isPlayingRef.current);
        }
      } catch (e) {
        console.error('Erro ao buscar música atual:', e);
      }
    };

    fetchCurrentSong();
    const interval = setInterval(fetchCurrentSong, 10000);
    return () => clearInterval(interval);
  }, [resetKey]);

  const togglePlayback = () => {
    try {
      if (isPlayingRef.current) {
        player.pause();
        isPlayingRef.current = false;
        setIsPlaying(false);
      } else {
        player.play();
        isPlayingRef.current = true;
        setIsPlaying(true);
      }
      RadioServiceModule?.updateMetadata(
        songRef.current.title, songRef.current.artist,
        songRef.current.cover, isPlayingRef.current
      );
    } catch (e) {
      console.error('Erro ao alternar reprodução:', e);
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
          <Image
            source={cover ? { uri: cover } : logoImage}
            style={styles.cover}
          />
          <Text style={styles.songText} numberOfLines={2}>{currentSong || 'Interligada Hits'}</Text>
          <Text style={styles.artistText} numberOfLines={1}>{currentArtist || 'Ao vivo'}</Text>
        </View>
        <TouchableOpacity
          style={styles.playPauseButton}
          onPress={togglePlayback}
          disabled={isLoading}
        >
          <Icon name={isPlaying ? 'stop' : 'play'} size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <Image source={logoImage} style={styles.logoImage} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  container: { justifyContent: 'center', alignItems: 'center' },
  cover: {
    width: widthScreen * 0.48,
    height: widthScreen * 0.48,
    marginBottom: 8,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  songText: {
    marginBottom: 2,
    color: '#FFF',
    fontSize: 13,
    flexWrap: 'wrap',
    textAlign: 'center',
    width: widthScreen * 0.52,
    fontWeight: 'bold',
  },
  artistText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 10,
    marginBottom: 45,
    flexWrap: 'wrap',
    width: widthScreen * 0.52,
    fontWeight: 'bold',
  },
  errorText: { color: 'red', fontSize: 12 },
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
  loadingOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(48, 47, 47, 0.8)',
    borderRadius: 20,
    zIndex: 1,
  },
  indicatorText: { marginBottom: 10, fontSize: 16, color: '#FFF' },
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
});

export default RadioPlayer;
