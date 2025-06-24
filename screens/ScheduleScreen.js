import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultSchedule = {
  Monday: ['Math', 'Physics', 'Break', 'English', 'CS'],
  Tuesday: ['English', 'CS', 'Break', 'Physics', 'Math'],
  Wednesday: ['CS', 'Break', 'Math', 'Physics', 'English'],
  Thursday: ['Physics', 'Math', 'Break', 'English', 'CS'],
  Friday: ['Math', 'Break', 'English', 'CS', 'Physics'],
};

export default function ScheduleScreen() {
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDay, setCurrentDay] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    const saved = await AsyncStorage.getItem('schedule');
    if (saved) {
      setSchedule(JSON.parse(saved));
    }
  };

  const saveSchedule = async (updated) => {
    setSchedule(updated);
    await AsyncStorage.setItem('schedule', JSON.stringify(updated));
  };

  const openEditModal = (day, index) => {
    setCurrentDay(day);
    setCurrentIndex(index);
    setNewSubject(schedule[day][index]);
    setModalVisible(true);
  };

  const updateSubject = () => {
    const updated = { ...schedule };
    updated[currentDay][currentIndex] = newSubject;
    saveSchedule(updated);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>📅 Weekly Schedule</Text>
      {Object.keys(schedule).map((day) => (
        <View key={day} style={styles.dayBox}>
          <Text style={styles.dayText}>{day}</Text>
          {schedule[day].map((subject, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.subjectCell}
              onPress={() => openEditModal(day, idx)}
            >
              <Text style={styles.subjectText}>{subject}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* ✏️ Edit Modal */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>✏️ Edit Subject</Text>
            <TextInput
              style={styles.input}
              value={newSubject}
              onChangeText={setNewSubject}
              placeholder="Enter subject"
              placeholderTextColor="#aaa"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={updateSubject} style={styles.btn}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.btn, { backgroundColor: '#FF3131' }]}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1D',
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD93D',
    textAlign: 'center',
    marginBottom: 20,
  },
  dayBox: {
    marginBottom: 16,
  },
  dayText: {
    color: '#FFD93D',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subjectCell: {
    backgroundColor: '#2E2E2E',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  subjectText: {
    color: '#fff',
    fontSize: 15,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#2E2E2E',
    padding: 20,
    borderRadius: 14,
    width: '85%',
  },
  modalTitle: {
    color: '#FFD93D',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1A1A1D',
    padding: 10,
    color: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#00FFB2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnText: {
    fontWeight: 'bold',
    color: '#1A1A1D',
  },
});