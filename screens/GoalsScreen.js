import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function GoalsScreen() {
  const shortTermGoals = [
    '⚡ Master React Native basics',
    '💻 Complete 3 full-stack projects',
    '📚 Finish Apna College Java+DSA playlist',
    '🌐 Improve English speaking skills',
    '🎯 Build strong GitHub profile',
  ];

  const longTermGoals = [
    '👨‍💼 Crack internship at top product-based company',
    '🧠 Master DSA for FAANG-level interviews',
    '🚀 Build an impactful open-source project',
    '🌍 Contribute to GSoC 2026',
    '💰 Secure 20+ LPA placement offer',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🎯 My Goals</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.subHeading}>📅 Short-Term (Next 6 Months)</Text>
        {shortTermGoals.map((goal, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.goalText}>{goal}</Text>
          </View>
        ))}

        <Text style={styles.subHeading}>🌠 Long-Term (1–2 Years)</Text>
        {longTermGoals.map((goal, index) => (
          <View key={index} style={[styles.card, styles.longCard]}>
            <Text style={styles.goalText}>{goal}</Text>
          </View>
        ))}

        <Text style={styles.quote}>
          “For the sake of reaching that dream, I’ll keep moving forward.” — Eren Yeager 🛡️
        </Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD93D',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF9995',
    marginTop: 30,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#2E2E2E',
    borderRadius: 14,
    padding: 16,
    marginVertical: 6,
    borderLeftWidth: 5,
    borderColor: '#FFD93D',
  },
  longCard: {
    borderColor: '#FF3131',
  },
  goalText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  quote: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 30,
    color: '#999',
  },
});