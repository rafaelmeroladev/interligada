// RadioPlayer.js
import { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';
import { useKeepAwake } from 'expo-keep-awake';
import { Button, Text, View } from 'react-native';

export default function RadioPlayer() {
  const sound = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useKeepAwake();

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    });

    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  const togglePlay = async () => {
    if (!sound.current) {
      const { sound: playback } = await Audio.Sound.createAsync(
        { uri: 'https://stream.seuservidor.com/stream' },
        { shouldPlay: true }
      );
      sound.current = playback;
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        await sound.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  return (
    <View>
      <Text>{isPlaying ? 'Tocando 🎵' : 'Pausado ⏸️'}</Text>
      <Button title={isPlaying ? 'Pausar' : 'Tocar'} onPress={togglePlay} />
    </View>
  );
}
