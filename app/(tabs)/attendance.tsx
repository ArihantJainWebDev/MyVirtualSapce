import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle, Circle as XCircle, Calendar as CalendarIcon } from 'lucide-react-native';

interface AttendanceData {
  [key: string]: { marked: boolean; dotColor: string; selectedColor: string; present: boolean };
}

export default function AttendanceScreen() {
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({});
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const storedAttendance = await AsyncStorage.getItem('attendance');
      if (storedAttendance) {
        setAttendanceData(JSON.parse(storedAttendance));
      }
    } catch (error) {
      console.error('Error loading attendance:', error);
    }
  };

  const saveAttendance = async (newAttendanceData: AttendanceData) => {
    try {
      await AsyncStorage.setItem('attendance', JSON.stringify(newAttendanceData));
      setAttendanceData(newAttendanceData);
    } catch (error) {
      console.error('Error saving attendance:', error);
    }
  };

  const markAttendance = (date: string, present: boolean) => {
    const updatedAttendance = {
      ...attendanceData,
      [date]: {
        marked: true,
        dotColor: present ? '#10b981' : '#ef4444',
        selectedColor: present ? '#10b981' : '#ef4444',
        present: present,
      },
    };
    saveAttendance(updatedAttendance);
  };

  const onDayPress = (day: DateData) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);

    Alert.alert(
      'Mark Attendance',
      `Mark attendance for ${day.day}/${day.month}/${day.year}`,
      [
        {
          text: 'Present',
          onPress: () => markAttendance(dateString, true),
        },
        {
          text: 'Absent',
          onPress: () => markAttendance(dateString, false),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const calculateStats = () => {
    const totalDays = Object.keys(attendanceData).length;
    const presentDays = Object.values(attendanceData).filter(day => day.present).length;
    const absentDays = totalDays - presentDays;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    return { totalDays, presentDays, absentDays, attendancePercentage };
  };

  const stats = calculateStats();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <CalendarIcon color="#ffffff" size={32} />
          <Text style={styles.headerTitle}>Attendance Tracker</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.attendancePercentage}%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.presentDays}</Text>
            <Text style={styles.statLabel}>Present</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.absentDays}</Text>
            <Text style={styles.statLabel}>Absent</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>Tap a date to mark attendance</Text>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={attendanceData}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#6b7280',
                selectedDayBackgroundColor: '#6366f1',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#6366f1',
                dayTextColor: '#1f2937',
                textDisabledColor: '#d1d5db',
                dotColor: '#6366f1',
                selectedDotColor: '#ffffff',
                arrowColor: '#6366f1',
                monthTextColor: '#1f2937',
                indicatorColor: '#6366f1',
                textDayFontFamily: 'Nunito-Regular',
                textMonthFontFamily: 'Baloo2-SemiBold',
                textDayHeaderFontFamily: 'Nunito-SemiBold',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
            />
          </View>
        </View>

        <View style={styles.legendSection}>
          <Text style={styles.sectionTitle}>Legend</Text>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <CheckCircle color="#10b981" size={24} />
              <Text style={styles.legendText}>Present</Text>
            </View>
            <View style={styles.legendItem}>
              <XCircle color="#ef4444" size={24} />
              <Text style={styles.legendText}>Absent</Text>
            </View>
          </View>
        </View>

        {stats.totalDays > 0 && (
          <View style={styles.insightsSection}>
            <Text style={styles.sectionTitle}>Insights</Text>
            <View style={styles.insightCard}>
              <Text style={styles.insightText}>
                You've tracked attendance for {stats.totalDays} days.
              </Text>
              {stats.attendancePercentage >= 75 ? (
                <Text style={styles.insightPositive}>
                  Great job maintaining good attendance! 🎉
                </Text>
              ) : (
                <Text style={styles.insightWarning}>
                  Try to improve your attendance rate. 📚
                </Text>
              )}
            </View>
          </View>
        )}
      </View>
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
  calendarSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  calendarContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  legendSection: {
    marginBottom: 24,
  },
  legendContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 12,
  },
  insightsSection: {
    marginBottom: 24,
  },
  insightCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  insightText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 12,
    lineHeight: 24,
  },
  insightPositive: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: '#10b981',
  },
  insightWarning: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: '#f59e0b',
  },
});