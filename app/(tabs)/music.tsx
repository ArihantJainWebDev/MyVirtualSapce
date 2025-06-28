import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { Music, Play, Users, Coffee, BookOpen } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Playlist {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  url: string;
}

export default function MusicScreen() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  const playlists: Playlist[] = [
    {
      id: 'study',
      title: 'Study Focus',
      description: 'Instrumental beats for deep focus',
      icon: <BookOpen color="#6366f1" size={24} />,
      color: '#6366f1',
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator&theme=0'
    },
    {
      id: 'lofi',
      title: 'Lo-fi Chill',
      description: 'Relaxing lo-fi hip hop vibes',
      icon: <Coffee color="#f59e0b" size={24} />,
      color: '#f59e0b',
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator&theme=0'
    },
    {
      id: 'party',
      title: 'Study Break',
      description: 'Upbeat music for breaks',
      icon: <Users color="#ef4444" size={24} />,
      color: '#ef4444',
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator&theme=0'
    },
    {
      id: 'relax',
      title: 'Relax & Unwind',
      description: 'Calm music for relaxation',
      icon: <Music color="#10b981" size={24} />,
      color: '#10b981',
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX1s9knjP51Oa?utm_source=generator&theme=0'
    },
  ];

  const renderPlaylistSelection = () => (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Choose Your Vibe 🎵</Text>
      <View style={styles.playlistGrid}>
        {playlists.map((playlist) => (
          <TouchableOpacity
            key={playlist.id}
            style={[styles.playlistCard, { borderLeftColor: playlist.color }]}
            onPress={() => setSelectedPlaylist(playlist)}
          >
            <View style={styles.playlistIcon}>
              {playlist.icon}
            </View>
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistTitle}>{playlist.title}</Text>
              <Text style={styles.playlistDescription}>{playlist.description}</Text>
            </View>
            <Play color={playlist.color} size={20} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Music & Productivity 📚</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            🎧 Listening to instrumental music can improve focus and concentration while studying.
          </Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            🎵 Lo-fi music helps reduce stress and creates a calm environment for learning.
          </Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            ☕ Take music breaks to recharge your mind and maintain productivity!
          </Text>
        </View>
      </View>
    </View>
  );

  const renderMusicPlayer = () => (
    <View style={styles.playerContainer}>
      <View style={styles.playerHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedPlaylist(null)}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.nowPlayingTitle}>{selectedPlaylist?.title}</Text>
        <View style={styles.placeholder} />
      </View>

      <WebView
        source={{ uri: selectedPlaylist?.url || '' }}
        style={styles.webView}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        scalesPageToFit
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Music color="#ffffff" size={32} />
          <Text style={styles.headerTitle}>Music Zone</Text>
          <Text style={styles.headerSubtitle}>
            {selectedPlaylist ? `Now Playing: ${selectedPlaylist.title}` : 'Find your perfect study soundtrack'}
          </Text>
        </View>
      </LinearGradient>

      {selectedPlaylist ? renderMusicPlayer() : renderPlaylistSelection()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 28,
    color: '#ffffff',
    marginTop: 8,
  },
  headerSubtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 20,
    color: '#1f2937',
    marginBottom: 16,
  },
  playlistGrid: {
    gap: 16,
    marginBottom: 32,
  },
  playlistCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  playlistIcon: {
    marginRight: 16,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 4,
  },
  playlistDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  infoSection: {
    marginTop: 16,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 22,
  },
  playerContainer: {
    flex: 1,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    backgroundColor: '#6b7280',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  backButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#ffffff',
  },
  nowPlayingTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 18,
    color: '#1f2937',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 80, // Same width as back button for centering
  },
  webView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});