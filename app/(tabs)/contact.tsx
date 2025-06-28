import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  MessageCircle,
  User,
  AtSign
} from 'lucide-react-native';

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socialLinks = [
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/yourusername',
      color: '#1f2937',
      description: 'Check out my code'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/yourusername',
      color: '#0077b5',
      description: 'Professional network'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/yourusername',
      color: '#1da1f2',
      description: 'Follow my journey'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/yourusername',
      color: '#e4405f',
      description: 'Behind the scenes'
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // In a real app, you would send this to your backend
    Alert.alert(
      'Message Sent!',
      'Thank you for reaching out! I\'ll get back to you soon.',
      [
        {
          text: 'OK',
          onPress: () => {
            setFormData({ name: '', email: '', message: '' });
          }
        }
      ]
    );
  };

  const openSocialLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('Error', 'Could not open link');
    }
  };

  const openEmailClient = () => {
    const email = 'your.email@example.com';
    const subject = 'Hello from MyVirtualSpace App';
    const body = 'Hi there! I found your contact through the MyVirtualSpace app.';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(mailtoUrl).catch(() => {
      Alert.alert('Error', 'Could not open email client');
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Mail color="#ffffff" size={32} />
          <Text style={styles.headerTitle}>Get In Touch</Text>
          <Text style={styles.headerSubtitle}>
            Let's connect and build something amazing together! 🚀
          </Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Send me a message</Text>
          
          <View style={styles.inputContainer}>
            <User color="#9ca3af" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Your name"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputContainer}>
            <AtSign color="#9ca3af" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Your email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputContainer}>
            <MessageCircle color="#9ca3af" size={20} />
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Your message..."
              value={formData.message}
              onChangeText={(value) => handleInputChange('message', value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Send color="#ffffff" size={20} />
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.alternativeSection}>
          <Text style={styles.sectionTitle}>Or reach out directly</Text>
          
          <TouchableOpacity style={styles.emailButton} onPress={openEmailClient}>
            <Mail color="#6366f1" size={24} />
            <View style={styles.emailInfo}>
              <Text style={styles.emailTitle}>Email me directly</Text>
              <Text style={styles.emailAddress}>your.email@example.com</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.sectionTitle}>Connect on social media</Text>
          <View style={styles.socialGrid}>
            {socialLinks.map((social) => (
              <TouchableOpacity
                key={social.id}
                style={[styles.socialCard, { borderLeftColor: social.color }]}
                onPress={() => openSocialLink(social.url)}
              >
                <social.icon color={social.color} size={24} />
                <View style={styles.socialInfo}>
                  <Text style={styles.socialName}>{social.name}</Text>
                  <Text style={styles.socialDescription}>{social.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>Why reach out?</Text>
          <View style={styles.reasonCard}>
            <Text style={styles.reasonText}>
              💼 <Text style={styles.reasonBold}>Collaboration opportunities</Text> - Let's work on exciting projects together
            </Text>
          </View>
          <View style={styles.reasonCard}>
            <Text style={styles.reasonText}>
              🤝 <Text style={styles.reasonBold}>Networking</Text> - Connect with fellow developers and students
            </Text>
          </View>
          <View style={styles.reasonCard}>
            <Text style={styles.reasonText}>
              💡 <Text style={styles.reasonBold}>Ideas & feedback</Text> - Share thoughts on my projects or discuss new concepts
            </Text>
          </View>
          <View style={styles.reasonCard}>
            <Text style={styles.reasonText}>
              📚 <Text style={styles.reasonBold}>Learning together</Text> - Exchange knowledge and grow as developers
            </Text>
          </View>
        </View>

        <View style={styles.responseSection}>
          <Text style={styles.sectionTitle}>Response time</Text>
          <View style={styles.responseCard}>
            <Text style={styles.responseText}>
              I typically respond within <Text style={styles.responseHighlight}>24-48 hours</Text>. 
              For urgent matters, feel free to reach out on multiple platforms! 
            </Text>
            <Text style={styles.responseSubtext}>
              Looking forward to hearing from you! ✨
            </Text>
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
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  formSection: {
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
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  input: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 12,
  },
  messageInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  submitButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#ffffff',
  },
  alternativeSection: {
    marginBottom: 24,
  },
  emailButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emailInfo: {
    marginLeft: 16,
  },
  emailTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 4,
  },
  emailAddress: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#6366f1',
  },
  socialSection: {
    marginBottom: 24,
  },
  socialGrid: {
    gap: 12,
  },
  socialCard: {
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
  socialInfo: {
    marginLeft: 16,
  },
  socialName: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 2,
  },
  socialDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  aboutSection: {
    marginBottom: 24,
  },
  reasonCard: {
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
  reasonText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 22,
  },
  reasonBold: {
    fontFamily: 'Nunito-SemiBold',
    color: '#1f2937',
  },
  responseSection: {
    marginBottom: 24,
  },
  responseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  responseText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 12,
  },
  responseHighlight: {
    fontFamily: 'Nunito-SemiBold',
    color: '#6366f1',
  },
  responseSubtext: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: '#10b981',
    textAlign: 'center',
  },
});