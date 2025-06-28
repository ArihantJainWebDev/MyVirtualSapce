import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  FolderOpen, 
  ExternalLink, 
  Github, 
  Globe, 
  Code,
  Smartphone,
  Monitor,
  Database
} from 'lucide-react-native';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  type: 'web' | 'mobile' | 'fullstack' | 'backend';
  status: 'completed' | 'in-progress' | 'planned';
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
}

export default function ProjectsScreen() {
  const projects: Project[] = [
    {
      id: '1',
      title: 'MyVirtualSpace Mobile App',
      description: 'A comprehensive personal productivity app built with React Native and Expo. Features task management, attendance tracking, and mini-games.',
      techStack: ['React Native', 'Expo', 'AsyncStorage', 'TypeScript'],
      type: 'mobile',
      status: 'completed',
      githubUrl: 'https://github.com/user/myvirtualspace',
      imageUrl: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Study Buddy Web Platform',
      description: 'A collaborative learning platform where students can form study groups, share notes, and track progress together.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      type: 'fullstack',
      status: 'in-progress',
      githubUrl: 'https://github.com/user/study-buddy',
      liveUrl: 'https://study-buddy-demo.vercel.app',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Campus Event API',
      description: 'RESTful API for managing campus events, student registrations, and notifications. Built with proper authentication and rate limiting.',
      techStack: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
      type: 'backend',
      status: 'completed',
      githubUrl: 'https://github.com/user/campus-events-api',
      imageUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      title: 'Personal Portfolio Website',
      description: 'A modern, responsive portfolio website showcasing my projects and skills. Features smooth animations and dark mode support.',
      techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      type: 'web',
      status: 'completed',
      githubUrl: 'https://github.com/user/portfolio',
      liveUrl: 'https://myportfolio.dev',
      imageUrl: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      title: 'AI Study Assistant',
      description: 'An intelligent study companion that helps students organize notes, generate quizzes, and track learning progress using AI.',
      techStack: ['Python', 'FastAPI', 'OpenAI API', 'React'],
      type: 'fullstack',
      status: 'planned',
      imageUrl: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const getTypeIcon = (type: Project['type']) => {
    switch (type) {
      case 'web':
        return <Globe color="#6366f1" size={20} />;
      case 'mobile':
        return <Smartphone color="#10b981" size={20} />;
      case 'fullstack':
        return <Monitor color="#f59e0b" size={20} />;
      case 'backend':
        return <Database color="#ef4444" size={20} />;
      default:
        return <Code color="#6b7280" size={20} />;
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'in-progress':
        return '#f59e0b';
      case 'planned':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const openUrl = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const completedCount = projects.filter(p => p.status === 'completed').length;
  const inProgressCount = projects.filter(p => p.status === 'in-progress').length;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <FolderOpen color="#ffffff" size={32} />
          <Text style={styles.headerTitle}>My Projects</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{inProgressCount}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{projects.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.projectsSection}>
          <Text style={styles.sectionTitle}>Featured Projects</Text>
          {projects.map((project) => (
            <View key={project.id} style={styles.projectCard}>
              <View style={styles.projectHeader}>
                <View style={styles.projectTypeContainer}>
                  {getTypeIcon(project.type)}
                  <Text style={styles.projectType}>
                    {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
                  <Text style={styles.statusText}>
                    {project.status === 'in-progress' ? 'In Progress' : 
                     project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Text>
                </View>
              </View>

              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>

              <View style={styles.techStackContainer}>
                <Text style={styles.techStackTitle}>Tech Stack:</Text>
                <View style={styles.techStackTags}>
                  {project.techStack.map((tech, index) => (
                    <View key={index} style={styles.techTag}>
                      <Text style={styles.techTagText}>{tech}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.projectActions}>
                {project.githubUrl && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => openUrl(project.githubUrl!)}
                  >
                    <Github color="#ffffff" size={16} />
                    <Text style={styles.actionButtonText}>Code</Text>
                  </TouchableOpacity>
                )}
                {project.liveUrl && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.liveButton]}
                    onPress={() => openUrl(project.liveUrl!)}
                  >
                    <ExternalLink color="#ffffff" size={16} />
                    <Text style={styles.actionButtonText}>Live Demo</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills & Technologies</Text>
          <View style={styles.skillsGrid}>
            {[
              'React Native', 'React', 'TypeScript', 'Node.js', 
              'Python', 'MongoDB', 'PostgreSQL', 'Git', 
              'AWS', 'Docker', 'Next.js', 'Expo'
            ].map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Let's Connect</Text>
          <Text style={styles.contactText}>
            Interested in collaborating or discussing any of these projects? 
            Feel free to reach out through the Contact tab! 🚀
          </Text>
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
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
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
  projectsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 20,
    color: '#1f2937',
    marginBottom: 16,
  },
  projectCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  projectType: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 10,
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  projectTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 8,
  },
  projectDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  techStackContainer: {
    marginBottom: 16,
  },
  techStackTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: '#1f2937',
    marginBottom: 8,
  },
  techStackTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  techTag: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  techTagText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 11,
    color: '#6366f1',
  },
  projectActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveButton: {
    backgroundColor: '#6366f1',
  },
  actionButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: '#ffffff',
  },
  skillsSection: {
    marginBottom: 32,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  skillText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#1f2937',
  },
  contactSection: {
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
  contactText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
});