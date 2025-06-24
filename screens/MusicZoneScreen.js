import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  TextInput,
  Linking,
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';

const songsList = [
  {
    title: '🌙 Chill Nights',
    // file: require('../assets/music/chill.mp3'),
  },
  {
    title: '🔥 Anime Chill',
    // file: require('../assets/music/anime.mp3'),
  },
];

export default function MusicZoneScreen() {
  const [sound, setSound] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [songs, setSongs] = useState(songsList);
  const [selected, setSelected] = useState(null);
  const [newSong, setNewSong] = useState('');
  const [spotifyLink, setSpotifyLink] = useState('');
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (playing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [playing]);

  const playSound = async (song) => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    const { sound: newSound } = await Audio.Sound.createAsync(song.file);
    setSound(newSound);
    setSelected(song.title);
    await newSound.playAsync();
    setPlaying(true);
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setPlaying(false);
    }
  };

  const resumeSound = async () => {
    if (sound) {
      await sound.playAsync();
      setPlaying(true);
    }
  };

  const addSpotifyLink = () => {
    if (spotifyLink) Linking.openURL(spotifyLink);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View
        style={[
          styles.glowCircle,
          {
            opacity: glowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 0.8],
            }),
          },
        ]}
      />
      <Text style={styles.heading}>🎧 Music Zone</Text>
      <Text style={styles.sub}>Select a track to vibe...</Text>

      {songs.map((song, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => playSound(song)}
        >
          <FontAwesome5 name="play-circle" size={20} color="#FFD93D" />
          <Text style={styles.cardText}>
            {selected === song.title && playing ? '▶️ ' : ''}
            {song.title}
          </Text>
        </TouchableOpacity>
      ))}

      {sound && (
        <View style={styles.controls}>
          {playing ? (
            <TouchableOpacity onPress={pauseSound}>
              <Ionicons name="pause-circle" size={40} color="#FFD93D" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={resumeSound}>
              <Ionicons name="play-circle" size={40} color="#FFD93D" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* ➕ Add Spotify Embed */}
      <View style={styles.spotifySection}>
        <Text style={styles.inputLabel}>🎶 Open Spotify Playlist</Text>
        <TextInput
          style={styles.input}
          placeholder="Paste Spotify link..."
          value={spotifyLink}
          onChangeText={setSpotifyLink}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={addSpotifyLink} style={styles.spotifyBtn}>
          <Entypo name="spotify" size={24} color="#1DB954" />
          <Text style={styles.spotifyText}>Open in Spotify</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 20,
    backgroundColor: '#1A1A1D',
    flexGrow: 1,
    alignItems: 'center',
  },
  glowCircle: {
    position: 'absolute',
    top: 120,
    width: 300,
    height: 300,
    borderRadius: 200,
    backgroundColor: '#FFD93D',
    zIndex: -1,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD93D',
    marginBottom: 10,
    textAlign: 'center',
  },
  sub: {
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#2E2E2E',
    width: '100%',
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
    borderLeftWidth: 5,
    borderColor: '#FF3131',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  spotifySection: {
    width: '100%',
    marginTop: 40,
  },
  inputLabel: {
    color: '#FFD93D',
    marginBottom: 6,
    fontWeight: 'bold',
    fontSize: 15,
  },
  input: {
    backgroundColor: '#2E2E2E',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    marginBottom: 10,
  },
  spotifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#191414',
    padding: 12,
    borderRadius: 10,
  },
  spotifyText: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
});