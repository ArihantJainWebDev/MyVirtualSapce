import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function AttendanceScreen({ navigation }) {
  const [subjects, setSubjects] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [attended, setAttended] = useState('');
  const [total, setTotal] = useState('');
  const [target, setTarget] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const saved = await AsyncStorage.getItem('attendance');
    if (saved) setSubjects(JSON.parse(saved));
  };

  const saveData = async (data) => {
    setSubjects(data);
    await AsyncStorage.setItem('attendance', JSON.stringify(data));
  };

  const addSubject = () => {
    if (!newSubject || !attended || !total || !target) return;
    const newSub = {
      name: newSubject,
      attended: parseInt(attended),
      total: parseInt(total),
      target: parseInt(target),
    };
    const updated = [...subjects, newSub];
    saveData(updated);
    setNewSubject('');
    setAttended('');
    setTotal('');
    setTarget('');
    setModalVisible(false);
  };

  const updateAttendance = (index, present = true) => {
    const updated = [...subjects];
    updated[index].total += 1;
    if (present) updated[index].attended += 1;
    saveData(updated);
  };

  const deleteSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    saveData(updated);
  };

  const getColor = (percent, target) => {
    if (percent >= target) return '#00FFB2';
    if (percent >= target - 5) return '#FFD93D';
    return '#FF3131';
  };

  const overall = subjects.reduce(
    (acc, sub) => {
      acc.attended += sub.attended;
      acc.total += sub.total;
      return acc;
    },
    { attended: 0, total: 0 }
  );

  const overallPercent = overall.total === 0 ? 0 : Math.floor((overall.attended / overall.total) * 100);
  const overallTarget = subjects.length > 0 ? Math.floor(subjects.reduce((acc, sub) => acc + sub.target, 0) / subjects.length) : 0;

  const calculateExtraLectures = (sub) => {
    const required = Math.ceil(((sub.target / 100) * sub.total - sub.attended) / (1 - sub.target / 100));
    return required > 0 ? required : 0;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>📊 Attendance Tracker</Text>

      {/* Overall Stats */}
      {subjects.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.subHeading}>📌 Overall Attendance</Text>
          <Text style={[styles.percent, { color: getColor(overallPercent, overallTarget) }]}>
            {overallPercent}% (Target: {overallTarget}%)
          </Text>
          <Text style={styles.counts}>
            Total: {overall.attended} / {overall.total}
          </Text>
        </View>
      )}

      {/* Subject Stats */}
      {subjects.map((subject, index) => {
        const percent = Math.floor((subject.attended / subject.total) * 100 || 0);
        const color = getColor(percent, subject.target);
        const required = calculateExtraLectures(subject);
        return (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <TouchableOpacity onPress={() => deleteSubject(index)}>
                <Entypo name="cross" size={20} color="#FF3131" />
              </TouchableOpacity>
            </View>

            <Text style={[styles.percent, { color }]}>
              {percent}% (Target: {subject.target}%)
            </Text>
            <Text style={styles.counts}>Present: {subject.attended} / Total: {subject.total}</Text>
            <Text style={styles.required}>📈 Need {required} more lectures to reach target</Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.btnPresent} onPress={() => updateAttendance(index, true)}>
                <Text style={styles.btnText}>Present</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAbsent} onPress={() => updateAttendance(index, false)}>
                <Text style={styles.btnText}>Absent</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      {/* ➕ Add Subject */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={36} color="#FFD93D" />
      </TouchableOpacity>

      {/* 📅 Go to Schedule Page */}
      <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('ScheduleScreen')}>
        <Text style={styles.scheduleText}>🗓 View Schedule & Calendar</Text>
      </TouchableOpacity>

      {/* ➕ Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalHeading}>➕ Add Subject</Text>
            <TextInput style={styles.input} placeholder="Subject" placeholderTextColor="#aaa" value={newSubject} onChangeText={setNewSubject} />
            <TextInput style={styles.input} placeholder="Attended" placeholderTextColor="#aaa" keyboardType="numeric" value={attended} onChangeText={setAttended} />
            <TextInput style={styles.input} placeholder="Total" placeholderTextColor="#aaa" keyboardType="numeric" value={total} onChangeText={setTotal} />
            <TextInput style={styles.input} placeholder="Target %" placeholderTextColor="#aaa" keyboardType="numeric" value={target} onChangeText={setTarget} />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={addSubject}><Entypo name="check" size={28} color="#FFD93D" /></TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}><Entypo name="cross" size={28} color="#FF3131" /></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1A1A1D', padding: 20, paddingTop: 60, paddingBottom: 100 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#FFD93D', marginBottom: 15, textAlign: 'center' },
  subHeading: { fontSize: 16, fontWeight: 'bold', color: '#FFD93D', marginBottom: 6 },
  card: { backgroundColor: '#2E2E2E', borderRadius: 14, padding: 16, marginBottom: 18, borderLeftWidth: 5, borderColor: '#FF3131' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  subjectName: { color: '#FFD93D', fontWeight: 'bold', fontSize: 18 },
  percent: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  counts: { color: '#ccc', fontSize: 14 },
  required: { color: '#FFD93D', fontSize: 13, marginTop: 6 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  btnPresent: { backgroundColor: '#00FFB2', padding: 10, borderRadius: 10, width: '48%', alignItems: 'center' },
  btnAbsent: { backgroundColor: '#FF3131', padding: 10, borderRadius: 10, width: '48%', alignItems: 'center' },
  btnText: { fontWeight: 'bold', color: '#1A1A1D' },
  fab: { position: 'absolute', bottom: 30, right: 30 },
  scheduleButton: { backgroundColor: '#FFD93D', padding: 10, borderRadius: 10, marginTop: 10 },
  scheduleText: { color: '#1A1A1D', fontWeight: 'bold', textAlign: 'center' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: '#2E2E2E', padding: 20, borderRadius: 14, width: '90%' },
  modalHeading: { color: '#FFD93D', fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  input: { backgroundColor: '#1A1A1D', padding: 10, color: '#fff', borderRadius: 8, marginBottom: 10 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
});