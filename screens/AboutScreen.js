import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutScreen() {
  const openLink = (url) => Linking.openURL(url);

  const skills = {
    Languages: ['C', 'Java', 'Python'],
    Frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'TailwindCSS', 'React Native', 'Bootstrap'],
    Backend: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Firebase', 'FastAPI', 'Flask'],
    Others: ['Git', 'GitHub', 'Figma', 'Postman', 'VS Code', 'Vercel', 'Render'],
  };

  return (
    <ScrollView style={styles.container}>
      {/* 🔥 Avatar */}
      <View style={styles.centered}>
        <Image source={require('../assets/images/avatar2.jpg')} style={styles.avatar} />

        {/* 🧑‍💻 Name + Bio */}
        <Text style={styles.name}>Arihant Jain</Text>
        <Text style={styles.bio}>CS-AI Student | Web Dev | Anime Lover 🚀</Text>
        <LinearGradient
          colors={['#FF3131', '#FFD93D']}
          style={{ height: 2, width: '100%', marginVertical: 10 }}
        />
        <Text style={styles.bio}>
          Hello! I’m Arihant Jain, a dedicated undergraduate in Computer Science and AI at Medi-Caps University in Indore. My passion lies in developing interactive web applications, exploring emerging technologies, and continuously learning to enhance my skills as a software engineer.
        </Text>
        <Text style={styles.bio}>
          I have a solid foundation in HTML, CSS, JavaScript, and React.js, and I am expanding my expertise in Node.js, Express.js, MySQL, MongoDB, FastAPI, and Flask. I take pleasure in transforming ideas into real, functional, and visually appealing projects. My portfolio showcases my journey with hands-on projects, including a Gemini AI clone, a car rental interface, and a full-stack notes application.
        </Text>

        <Text style={styles.bio}>
          Currently, I am honing my skills in Java and Data Structures & Algorithms to prepare for opportunities at leading product-based companies such as Google and Microsoft. I am also deeply interested in creating solutions that address real-world challenges and make a positive impact.
        </Text>

        <Text style={styles.bio}>
          Outside of coding, I enjoy refining my communication skills and working on side projects that blend enjoyment with practicality.
        </Text>

        <Text style={styles.bio}>
          Let’s connect and collaborate to create something extraordinary together!
        </Text>
      </View>

      {/* 🛠 Skills */}
      <View style={{ marginTop: 30 }}>
        {Object.entries(skills).map(([category, items]) => (
          <View key={category} style={styles.skillSection}>
            <Text style={styles.sectionTitle}>{category}</Text>
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <Text style={styles.skill}>{item}</Text>
              )}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))}
      </View>

      {/* 🔗 Socials */}
      <View style={styles.socials}>
        <TouchableOpacity onPress={() => openLink('https://github.com/arihant15109')}>
          <FontAwesome name="github" size={30} color="#FFD93D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/in/arihant15109')}>
          <Entypo name="linkedin" size={30} color="#FFD93D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.instagram.com/')}>
          <Ionicons name="logo-instagram" size={30} color="#FFD93D" />
        </TouchableOpacity>
      </View>

      {/* 💬 Quote */}
      <Text style={styles.quote}>
        “A lesson without pain is meaningless.” – Fullmetal Alchemist ⚔️
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    paddingTop: 60,
  },
  centered: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD93D',
  },
  bio: {
    fontSize: 18,
    color: '#AABBCC',
    lineHeight: 25,
    textAlign: 'center',
    marginVertical: 12,
  },
  skillSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD93D',
    marginBottom: 10,
  },
  skill: {
    backgroundColor: '#271A1A',
    borderColor: '#FFD93D',
    borderWidth: 1,
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    fontWeight: 'bold',
    marginRight: 10,
    textAlign: 'center',
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginVertical: 30,
  },
  quote: {
    color: '#9e9e9e',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingBottom: 40,
  },
});