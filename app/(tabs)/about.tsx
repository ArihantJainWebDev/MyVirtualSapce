import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  MapPin, 
  Calendar, 
  Heart, 
  Target, 
  BookOpen,
  Code,
  Coffee,
  Music
} from 'lucide-react-native';

export default function AboutScreen() {
  const interests = [
    { icon: Code, label: 'Coding', color: '#6366f1' },
    { icon: BookOpen, label: 'Reading', color: '#10b981' },
    { icon: Coffee, label: 'Coffee', color: '#f59e0b' },
    { icon: Music, label: 'Music', color: '#ef4444' },
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Started College Journey',
      description: 'Began pursuing Computer Science degree',
      color: '#6366f1'
    },
    {
      year: '2024',
      title: 'First Hackathon',
      description: 'Won 2nd place in college hackathon',
      color: '#10b981'
    },
    {
      year: '2024',
      title: 'Internship',
      description: 'Software development internship',
      color: '#f59e0b'
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>About Me</Text>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400' }}
          style={styles.profileImage}
        />
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>Hey there! 👋</Text>
          <Text style={styles.bioText}>
            I'm a passionate computer science student who loves building cool stuff with code. 
            When I'm not debugging or learning new technologies, you'll find me exploring creative 
            projects, listening to music, or planning my next adventure. I believe in continuous 
            learning and turning ideas into reality through technology.
          </Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <MapPin color="#6366f1" size={20} />
              <Text style={styles.infoText}>College Campus</Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar color="#10b981" size={20} />
              <Text style={styles.infoText}>Sophomore Year</Text>
            </View>
          </View>
        </View>

        <View style={styles.interestsSection}>
          <Text style={styles.sectionTitle}>My Interests</Text>
          <View style={styles.interestsGrid}>
            {interests.map((interest, index) => (
              <View key={index} style={styles.interestCard}>
                <interest.icon color={interest.color} size={24} />
                <Text style={styles.interestLabel}>{interest.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>My Journey</Text>
          {timeline.map((item, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: item.color }]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineYear}>{item.year}</Text>
                <Text style={styles.timelineTitle}>{item.title}</Text>
                <Text style={styles.timelineDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.goalsSection}>
          <Text style={styles.sectionTitle}>Goals & Aspirations</Text>
          <View style={styles.goalCard}>
            <Target color="#6366f1" size={24} />
            <View style={styles.goalContent}>
              <Text style={styles.goalTitle}>Short Term</Text>
              <Text style={styles.goalText}>Master full-stack development and contribute to open source</Text>
            </View>
          </View>
          <View style={styles.goalCard}>
            <Heart color="#ef4444" size={24} />
            <View style={styles.goalContent}>
              <Text style={styles.goalTitle}>Long Term</Text>
              <Text style={styles.goalText}>Build innovative tech solutions that make a positive impact</Text>
            </View>
          </View>
        </View>

        <View style={styles.funFactsSection}>
          <Text style={styles.sectionTitle}>Fun Facts</Text>
          <View style={styles.funFactsGrid}>
            <Text style={styles.funFact}>☕ Drinks 4+ cups of coffee daily</Text>
            <Text style={styles.funFact}>🌙 Night owl - codes best after midnight</Text>
            <Text style={styles.funFact}>🎵 Can't code without music</Text>
            <Text style={styles.funFact}>📚 Reads tech blogs every morning</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 28,
    color: '#ffffff',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    padding: 24,
  },
  bioSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 20,
    color: '#1f2937',
    marginBottom: 12,
  },
  bioText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#6b7280',
  },
  interestsSection: {
    marginBottom: 24,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  interestLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#1f2937',
    marginTop: 8,
  },
  timelineSection: {
    marginBottom: 24,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
    marginRight: 16,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  timelineYear: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 14,
    color: '#6366f1',
    marginBottom: 4,
  },
  timelineTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 4,
  },
  timelineDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  goalsSection: {
    marginBottom: 24,
  },
  goalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  goalContent: {
    flex: 1,
    marginLeft: 12,
  },
  goalTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 4,
  },
  goalText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  funFactsSection: {
    marginBottom: 24,
  },
  funFactsGrid: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  funFact: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 12,
    lineHeight: 22,
  },
});