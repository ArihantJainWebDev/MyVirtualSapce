import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

export default function ProjectsScreen() {
  const projects = [
    {
      title: 'Car Rental Site',
      stack: ['HTML', 'CSS', 'JavaScript'],
      desc: 'Fully responsive site with advanced UI, scroll animations, and bold design.',
      github: 'https://github.com/ArihantJainWebDev/CarRentalWebsite',
      live: 'https://carrentalwebsite-1.onrender.com',
      image: require('../assets/projects/carrental.png'),
    },
    {
      title: 'VirtualR Demo',
      stack: ['React', 'Tailwind CSS'],
      desc: 'Virtual product demo site with translucent navbar, pricing, videos, and full responsiveness.',
      github: 'https://github.com/ArihantJainWebDev/VirtualR',
      live: 'https://virtualr-sepd.onrender.com',
      image: require('../assets/projects/virtualr.png'),
    },
    {
      title: 'Gemini Clone',
      stack: ['React', 'CSS', 'API'],
      desc: 'Chatbot clone with search, typing animation, history, and new chat functionality.',
      github: 'https://github.com/ArihantJainWebDev/GeminiClone',
      live: 'https://gemini-clone-iota-one.vercel.app',
      image: require('../assets/projects/geminiclone.png'),
    },
    {
      title: 'HomeSmart UI',
      stack: ['Tailwind CSS'],
      desc: 'Responsive landing page with modern layout, object hiding, and zero animation.',
      github: 'https://github.com/ArihantJainWebDev/HomeSmart',
      live: 'https://homesmart.onrender.com',
      image: require('../assets/projects/homesmart.png'),
    },
    {
      title: 'Portfolio Website',
      stack: ['React', 'HTML', 'CSS'],
      desc: 'My personal developer portfolio featuring animations, UI/UX, and projects.',
      github: 'https://github.com/ArihantJainWebDev/Portfolio',
      live: 'https://portfolio-q8u1.onrender.com',
      image: require('../assets/projects/portfolio.png'),
    },
  ];

  const openLink = (url) => Linking.openURL(url);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📁 My Projects</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {projects.map((project, index) => (
          <View key={index} style={styles.card}>
            {/* 🖼️ Project Image */}
            <Image source={project.image} style={styles.image} />

            {/* 🔤 Title & Description */}
            <Text style={styles.title}>{project.title}</Text>
            <Text style={styles.desc}>{project.desc}</Text>
            <Text style={styles.stack}>{project.stack.join(' • ')}</Text>

            {/* 🔗 Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => openLink(project.github)}
              >
                <FontAwesome name="github" size={16} color="#1A1A1D" />
                <Text style={styles.buttonText}> Code</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FF3131' }]}
                onPress={() => openLink(project.live)}
              >
                <Feather name="external-link" size={16} color="#fff" />
                <Text style={[styles.buttonText, { color: '#fff' }]}> Live</Text>
              </TouchableOpacity>
            </View>
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
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD93D',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2E2E2E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderColor: '#FF3131',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
    resizeMode: 'cover',
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
    marginBottom: 6,
  },
  stack: {
    color: '#FF8585',
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD93D',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1A1A1D',
  },
});