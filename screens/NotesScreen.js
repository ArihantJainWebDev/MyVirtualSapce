import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotes();
    });
    return unsubscribe;
  }, [navigation]);

  const loadNotes = async () => {
    const saved = await AsyncStorage.getItem('notes');
    if (saved) setNotes(JSON.parse(saved));
  };

  const saveNotes = async (updatedNotes) => {
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const addNote = () => {
    const newNote = {
      title: newTitle || 'New Note',
      content: newContent || 'This is a fresh note! Write your thoughts here...',
      tag: newTitle.toLowerCase().includes('react') ? '💻 Dev' : '🧠 Misc',
    };
    const updatedNotes = [...notes, newNote];
    saveNotes(updatedNotes);
    setNewTitle('');
    setNewContent('');
    setVisible(false);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📝 My Notes</Text>

      {/* 🔍 Search */}
      <TextInput
        placeholder="Search notes..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {/* 🗒️ Notes (Only Title Shown) */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredNotes.map((note, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              navigation.navigate('NoteDetail', {
                note,
                index,
              })
            }
          >
            <View style={styles.rowBetween}>
              <Text style={styles.title}>{note.title}</Text>
              <Text style={styles.tag}>{note.tag}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {notes.length === 0 && (
          <Text style={styles.quote}>“A note written is knowledge retained.” ✍️</Text>
        )}
      </ScrollView>

      {/* ➕ Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setVisible(true)}>
        <Ionicons name="add-circle" size={30} color="#FFD93D" />
      </TouchableOpacity>

      {/* ✍️ Add Modal */}
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add New Note</Text>

            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newTitle}
              onChangeText={setNewTitle}
              placeholderTextColor="#888"
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              multiline
              placeholder="Content"
              value={newContent}
              onChangeText={setNewContent}
              placeholderTextColor="#888"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={addNote}>
                <Entypo name="check" size={28} color="#FFD93D" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Entypo name="cross" size={28} color="#FF3131" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD93D',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#2E2E2E',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#2E2E2E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 5,
    borderColor: '#FF3131',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFD93D',
  },
  content: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  tag: {
    fontSize: 13,
    color: '#FF8585',
    fontStyle: 'italic',
  },
  quote: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#999',
    fontSize: 13,
    marginTop: 30,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#2E2E2E',
    borderRadius: 14,
    width: '90%',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: '#FFD93D',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1A1A1D',
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});