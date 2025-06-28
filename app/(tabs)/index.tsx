import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Lightbulb, ArrowRight, Star, Zap } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  interpolate
} from 'react-native-reanimated';

const quotes = [
  "The best time to plant a tree was 20 years ago. The second best time is now. 🌳",
  "Your only limit is your mind. Break through it! 💪",
  "Dream big, work hard, stay focused. ✨",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. 🚀",
  "The future belongs to those who believe in the beauty of their dreams. 🌟",
  "Code is poetry written in logic. 💻",
  "Every expert was once a beginner. Keep learning! 📚"
];

export default function HomeScreen() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 20000 }), -1);
    scale.value = withRepeat(withTiming(1.1, { duration: 2000 }), -1, true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: interpolate(scale.value, [1, 1.1], [1, 1.05]) }
      ],
    };
  });

  const quickLinks = [
    { title: 'Tasks', icon: '📝', route: 'tasks', color: '#f59e0b' },
    { title: 'Notes', icon: '📚', route: 'notes', color: '#10b981' },
    { title: 'Projects', icon: '🚀', route: 'projects', color: '#6366f1' },
    { title: 'Fun Zone', icon: '🎮', route: 'funzone', color: '#ef4444' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <Animated.View style={[styles.avatarContainer, animatedStyle]}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.avatar}
            />
          </Animated.View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.nameText}>Creative Student</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.quoteSection}>
          <View style={styles.quoteHeader}>
            <Lightbulb color="#f59e0b" size={24} />
            <Text style={styles.quoteSectionTitle}>Daily Inspiration</Text>
          </View>
          <Text style={styles.quoteText}>{currentQuote}</Text>
        </View>

        <View style={styles.quickLinksSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickLinksGrid}>
            {quickLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickLinkCard, { borderLeftColor: link.color }]}
              >
                <Text style={styles.quickLinkIcon}>{link.icon}</Text>
                <Text style={styles.quickLinkTitle}>{link.title}</Text>
                <ArrowRight color="#9ca3af" size={16} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Today's Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Star color="#f59e0b" size={24} />
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Tasks Done</Text>
            </View>
            <View style={styles.statCard}>
              <Zap color="#10b981" size={24} />
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Notes Added</Text>
            </View>
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  welcomeText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  nameText: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 24,
    color: '#ffffff',
  },
  content: {
    padding: 24,
  },
  quoteSection: {
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
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quoteSectionTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginLeft: 8,
  },
  quoteText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  quickLinksSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 20,
    color: '#1f2937',
    marginBottom: 16,
  },
  quickLinksGrid: {
    gap: 12,
  },
  quickLinkCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickLinkIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  quickLinkTitle: {
    flex: 1,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: '#1f2937',
  },
  statsSection: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 24,
    color: '#1f2937',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});