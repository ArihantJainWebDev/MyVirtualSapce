import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ProjectsScreen() {
  const projects = [
    {
      title: 'Gemini Clone',
      stack: ['React', 'CSS', 'API'],
      desc: 'A sleek Gemini-style chatbot with search, typing animations & new chat UI.',
      link: 'https://github.com/ArihantJainWebDev/GeminiClone',
    },
    {
      title: 'Car Rental UI',
      stack: ['HTML', 'CSS', 'JavaScript'],
      desc: 'Fully responsive car rental site with animated scroll & clean visuals.',
      link: 'https://github.com/ArihantJainWebDev/CarRentalWebsite',
    },
    {
      title: 'Notes App (Full Stack)',
      stack: ['React', 'Tailwind', 'MongoDB', 'Express'],
      desc: 'CRUD notes app with login/signup, real-time search, backend APIs.',
      link: 'https://github.com/ArihantJainWebDev/NotesApp',
    },
  ];

  const openLink = (url) => Linking.openURL(url);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📁 My Projects</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {projects.map((project, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{project.title}</Text>
            <Text style={styles.desc}>{project.desc}</Text>
            <Text style={styles.stack}>
              {project.stack.join(' • ')}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => openLink(project.link)}
            >
              <FontAwesome name="github" size={16} color="#1A1A1D" />
              <Text style={styles.buttonText}> View Code</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD93D',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2E2E2E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderColor: '#FF3131',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD93D',
    marginBottom: 6,
  },
  desc: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
  stack: {
    color: '#FF8585',
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFD93D',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1A1A1D',
  },
});