import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Award, Calendar, ExternalLink } from 'lucide-react-native';

interface Certificate {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  imageUrl: string;
  type: 'course' | 'achievement' | 'hackathon' | 'certification';
}

export default function CertificatesScreen() {
  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'React Native Fundamentals',
      organization: 'Tech Academy',
      date: '2024-01-15',
      description: 'Completed comprehensive course on React Native development',
      imageUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'course'
    },
    {
      id: '2',
      title: 'First Place - Hackathon 2023',
      organization: 'College Tech Fest',
      date: '2023-11-20',
      description: 'Won first place in mobile app development category',
      imageUrl: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'hackathon'
    },
    {
      id: '3',
      title: 'JavaScript ES6+ Mastery',
      organization: 'CodeAcademy',
      date: '2023-09-10',
      description: 'Advanced JavaScript programming concepts and modern syntax',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'certification'
    },
    {
      id: '4',
      title: 'Best Innovation Award',
      organization: 'University Innovation Challenge',
      date: '2024-03-05',
      description: 'Recognized for innovative problem-solving approach',
      imageUrl: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'achievement'
    },
  ];

  const getTypeColor = (type: Certificate['type']) => {
    switch (type) {
      case 'course':
        return '#6366f1';
      case 'achievement':
        return '#f59e0b';
      case 'hackathon':
        return '#ef4444';
      case 'certification':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getTypeIcon = (type: Certificate['type']) => {
    return <Award color={getTypeColor(type)} size={20} />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const totalCertificates = certificates.length;
  const recentCertificates = certificates.filter(cert => {
    const certDate = new Date(cert.date);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return certDate >= sixMonthsAgo;
  }).length;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Award color="#ffffff" size={32} />
          <Text style={styles.headerTitle}>Certificates & Awards</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalCertificates}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{recentCertificates}</Text>
            <Text style={styles.statLabel}>Recent</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.certificatesSection}>
          <Text style={styles.sectionTitle}>My Achievements</Text>
          {certificates.map((certificate) => (
            <View key={certificate.id} style={styles.certificateCard}>
              <Image
                source={{ uri: certificate.imageUrl }}
                style={styles.certificateImage}
              />
              <View style={styles.certificateContent}>
                <View style={styles.certificateHeader}>
                  <View style={styles.typeContainer}>
                    {getTypeIcon(certificate.type)}
                    <Text style={[styles.typeText, { color: getTypeColor(certificate.type) }]}>
                      {certificate.type.charAt(0).toUpperCase() + certificate.type.slice(1)}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.viewButton}>
                    <ExternalLink color="#6b7280" size={16} />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.certificateTitle}>{certificate.title}</Text>
                <Text style={styles.certificateOrganization}>{certificate.organization}</Text>
                <Text style={styles.certificateDescription}>{certificate.description}</Text>
                
                <View style={styles.certificateFooter}>
                  <View style={styles.dateContainer}>
                    <Calendar color="#6b7280" size={16} />
                    <Text style={styles.certificateDate}>{formatDate(certificate.date)}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Achievement Summary</Text>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>
              You've earned {totalCertificates} certificates and awards, with {recentCertificates} 
              achieved in the last 6 months. Keep up the great work! 🎉
            </Text>
            <View style={styles.categoryBreakdown}>
              <Text style={styles.categoryTitle}>Categories:</Text>
              {Object.entries(
                certificates.reduce((acc, cert) => {
                  acc[cert.type] = (acc[cert.type] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([type, count]) => (
                <View key={type} style={styles.categoryItem}>
                  <View style={[styles.categoryDot, { backgroundColor: getTypeColor(type as Certificate['type']) }]} />
                  <Text style={styles.categoryText}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}: {count}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 28,
    color: '#ffffff',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  statNumber: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 24,
    color: '#ffffff',
  },
  statLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  certificatesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 20,
    color: '#1f2937',
    marginBottom: 16,
  },
  certificateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  certificateImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  certificateContent: {
    padding: 20,
  },
  certificateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  typeText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  viewButton: {
    padding: 4,
  },
  certificateTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 4,
  },
  certificateOrganization: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#6366f1',
    marginBottom: 8,
  },
  certificateDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  certificateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  certificateDate: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#6b7280',
  },
  summarySection: {
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 16,
  },
  categoryTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 8,
  },
  categoryBreakdown: {
    gap: 6,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categoryText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
});