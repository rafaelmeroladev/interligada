import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });

  // Se quiser adicionar "next" e "previous":
  // TrackPlayer.addEventListener('remote-next', () => {...});
  // TrackPlayer.addEventListener('remote-previous', () => {...});
};
