import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  Modal 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Search, FileText, CreditCard as Edit3, Trash2, X, Calendar, Hash } from 'lucide-react-native';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTags, setNewNoteTags] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const addNote = () => {
    if (!newNoteTitle.trim()) {
      Alert.alert('Error', 'Please enter a title for your note');
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
    };

    const updatedNotes = [newNote, ...notes];
    saveNotes(updatedNotes);
    resetForm();
    setIsAddModalVisible(false);
  };

  const updateNote = () => {
    if (!editingNote || !newNoteTitle.trim()) {
      Alert.alert('Error', 'Please enter a title for your note');
      return;
    }

    const updatedNote: Note = {
      ...editingNote,
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      updatedAt: new Date().toISOString(),
      tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
    };

    const updatedNotes = notes.map(note => 
      note.id === editingNote.id ? updatedNote : note
    );
    saveNotes(updatedNotes);
    resetForm();
    setEditingNote(null);
  };

  const deleteNote = (noteId: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedNotes = notes.filter(note => note.id !== noteId);
            saveNotes(updatedNotes);
          },
        },
      ]
    );
  };

  const resetForm = () => {
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTags('');
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setNewNoteTitle(note.title);
    setNewNoteContent(note.content);
    setNewNoteTags(note.tags.join(', '));
    setIsAddModalVisible(true);
  };

  const closeModal = () => {
    setIsAddModalVisible(false);
    setEditingNote(null);
    resetForm();
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <FileText color="#ffffff" size={32} />
          <Text style={styles.headerTitle}>Notes</Text>
          <Text style={styles.headerSubtitle}>
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search color="#9ca3af" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search notes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddModalVisible(true)}
          >
            <Plus color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.notesContainer}>
          {filteredNotes.length === 0 ? (
            <View style={styles.emptyState}>
              <FileText color="#9ca3af" size={48} />
              <Text style={styles.emptyStateText}>
                {searchQuery ? 'No notes found' : 'No notes yet'}
              </Text>
              <Text style={styles.emptyStateSubtext}>
                {searchQuery ? 'Try a different search term' : 'Tap the + button to create your first note'}
              </Text>
            </View>
          ) : (
            filteredNotes.map((note) => (
              <View key={note.id} style={styles.noteCard}>
                <View style={styles.noteContent}>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  {note.content ? (
                    <Text style={styles.notePreview} numberOfLines={3}>
                      {note.content}
                    </Text>
                  ) : null}
                  
                  {note.tags.length > 0 && (
                    <View style={styles.tagsContainer}>
                      {note.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                          <Hash color="#6366f1" size={12} />
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  
                  <View style={styles.noteFooter}>
                    <View style={styles.dateContainer}>
                      <Calendar color="#9ca3af" size={14} />
                      <Text style={styles.noteDate}>
                        {formatDate(note.updatedAt)}
                      </Text>
                    </View>
                    
                    <View style={styles.noteActions}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => openEditModal(note)}
                      >
                        <Edit3 color="#6366f1" size={16} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => deleteNote(note.id)}
                      >
                        <Trash2 color="#ef4444" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <X color="#6b7280" size={24} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingNote ? 'Edit Note' : 'New Note'}
            </Text>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={editingNote ? updateNote : addNote}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <TextInput
              style={styles.titleInput}
              placeholder="Note title..."
              value={newNoteTitle}
              onChangeText={setNewNoteTitle}
              placeholderTextColor="#9ca3af"
            />
            
            <TextInput
              style={styles.contentInput}
              placeholder="Write your note here..."
              value={newNoteContent}
              onChangeText={setNewNoteContent}
              multiline
              textAlignVertical="top"
              placeholderTextColor="#9ca3af"
            />
            
            <TextInput
              style={styles.tagsInput}
              placeholder="Tags (comma separated)..."
              value={newNoteTags}
              onChangeText={setNewNoteTags}
              placeholderTextColor="#9ca3af"
            />
          </ScrollView>
        </View>
      </Modal>
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
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 12,
  },
  addButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  notesContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateText: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 20,
    color: '#6b7280',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  noteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  noteContent: {
    padding: 20,
  },
  noteTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 8,
  },
  notePreview: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  tagText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#6366f1',
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  noteDate: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#9ca3af',
  },
  noteActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 18,
    color: '#1f2937',
  },
  saveButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#ffffff',
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  titleInput: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 20,
    color: '#1f2937',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  contentInput: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 200,
  },
  tagsInput: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#1f2937',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});