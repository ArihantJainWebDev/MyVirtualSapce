import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';

export default function NoteDetailScreen({ route, navigation }) {
  const { note, index } = route.params;

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const saveEdit = async () => {
    const stored = await AsyncStorage.getItem('notes');
    const allNotes = JSON.parse(stored);
    allNotes[index] = { ...allNotes[index], title, content };
    await AsyncStorage.setItem('notes', JSON.stringify(allNotes));
    Alert.alert('Saved!');
    navigation.goBack();
  };

  const deleteNote = async () => {
    const stored = await AsyncStorage.getItem('notes');
    const allNotes = JSON.parse(stored);
    allNotes.splice(index, 1);
    await AsyncStorage.setItem('notes', JSON.stringify(allNotes));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📄 Edit Note</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor="#999"
      />
      <TextInput
        style={[styles.input, { height: 700 }]}
        value={content}
        onChangeText={setContent}
        multiline
        placeholder="Content"
        placeholderTextColor="#999"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={saveEdit} style={styles.saveBtn}>
          <Entypo name="check" size={24} color="#1A1A1D" />
          <Text style={styles.btnText}> Save</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteNote} style={styles.deleteBtn}>
          <Entypo name="trash" size={24} color="#fff" />
          <Text style={[styles.btnText, { color: '#fff' }]}> Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    padding: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 24,
    color: '#FFD93D',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2E2E2E',
    color: '#fff',
    padding: 14,
    fontSize: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  saveBtn: {
    flexDirection: 'row',
    backgroundColor: '#FFD93D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  deleteBtn: {
    flexDirection: 'row',
    backgroundColor: '#FF3131',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});