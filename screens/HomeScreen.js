import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hey! Buddy</Text>

      {/* 🔥 Animated Avatar */}
      <View style={styles.avatarContainer}>
        <LottieView
          source={require('../assets/animations/avatar.json')}
          autoPlay
          loop
          style={styles.avatar}
        />
      </View>

      {/* ⚡ Quick Navigation Buttons */}
      <ScrollView contentContainerStyle={styles.buttonContainer} showsVerticalScrollIndicator={false}>
        <QuickButton icon={<Ionicons name="person-circle" size={26} color="#FFD93D" />} label="About Me" onPress={() => navigation.navigate("About")} />
        <QuickButton icon={<FontAwesome5 name="bullseye" size={24} color="#FFD93D" />} label="My Goals" onPress={() => navigation.navigate("Goals")} />
        <QuickButton icon={<Ionicons name="folder-open" size={24} color="#FFD93D" />} label="Projects" onPress={() => navigation.navigate("Projects")} />
        <QuickButton icon={<MaterialCommunityIcons name="notebook" size={24} color="#FFD93D" />} label="Notes" onPress={() => navigation.navigate("Notes")} />
        <QuickButton icon={<Ionicons name="game-controller" size={24} color="#FFD93D" />} label="Fun Zone" onPress={() => navigation.navigate("FunZone")} />
        <QuickButton icon={<Ionicons name="musical-notes" size={24} color="#FFD93D" />} label="Music Zone" onPress={() => navigation.navigate("MusicZone")} />
        <QuickButton icon={<FontAwesome5 name="tasks" size={24} color="#FFD93D" />} label="Task Manager" onPress={() => navigation.navigate("TaskManager")} />
        <QuickButton icon={<Entypo name="graduation-cap" size={24} color="#FFD93D" />} label="Attendance" onPress={() => navigation.navigate("Attendance")} />
        <QuickButton icon={<MaterialCommunityIcons name="timeline" size={24} color="#FFD93D" />} label="Timeline" onPress={() => navigation.navigate("Timeline")} />
      </ScrollView>
    </View>
  );
}

const QuickButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickButton} onPress={onPress}>
    {icon}
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F9F9F9',
    textAlign: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  quickButton: {
    width: '95%',
    backgroundColor: '#2E2E2E',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderLeftWidth: 3,
    borderColor: '#FF3131',
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
  },
});