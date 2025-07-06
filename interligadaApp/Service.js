// service.js
import TrackPlayer, { Event, State, Capability } from 'react-native-track-player';

export default async function () {
  TrackPlayer.addEventHandler(async (event) => {
    switch (event.type) {
      case Event.RemotePlay:
        await TrackPlayer.play();
        break;

      case Event.RemotePause:
        await TrackPlayer.pause();
        break;

      case Event.RemoteStop:
        await TrackPlayer.stop();
        break;

      default:
        break;
    }
  });
}
