import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {setupPlayer, addTrack} from '../musicPlayerService';
import MusicPlayer from './screens/MusicPlayer';
import TrackPlayer from 'react-native-track-player';

function App(): JSX.Element {
  const [isPlayerReady, setIsPaylerReady] = useState(false);

  async function setup() {
    try {
      let isSetup = await setupPlayer();
      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTrack();
      }

      setIsPaylerReady(isSetup);
    } catch (error) {
      console.log({error});
    }
  }

  useEffect(() => {
    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="light-content" />
      <MusicPlayer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
