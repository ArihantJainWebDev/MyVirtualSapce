import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Check, Trash2, Filter } from 'lucide-react-native';

interface Task {
  id: String;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (updatedTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [newTask, ...tasks];
    saveTasks(updatedTasks);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            saveTasks(updatedTasks);
          },
        },
      ]
    );
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Task Manager</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.addTaskSection}>
          <Text style={styles.sectionTitle}>Add New Task</Text>
          <TextInput
            style={styles.input}
            placeholder="Task title..."
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            placeholderTextColor="#9ca3af"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description (optional)..."
            value={newTaskDescription}
            onChangeText={setNewTaskDescription}
            multiline
            numberOfLines={3}
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Plus color="#ffffff" size={20} />
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterSection}>
          <View style={styles.filterHeader}>
            <Filter color="#6b7280" size={20} />
            <Text style={styles.filterTitle}>Filter Tasks</Text>
          </View>
          <View style={styles.filterButtons}>
            {(['all', 'pending', 'completed'] as const).map((filterType) => (
              <TouchableOpacity
                key={filterType}
                style={[
                  styles.filterButton,
                  filter === filterType && styles.filterButtonActive
                ]}
                onPress={() => setFilter(filterType)}
              >
                <Text style={[
                  styles.filterButtonText,
                  filter === filterType && styles.filterButtonTextActive
                ]}>
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.tasksSection}>
          <Text style={styles.sectionTitle}>Your Tasks</Text>
          {filteredTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {filter === 'all' ? 'No tasks yet!' : `No ${filter} tasks`}
              </Text>
              <Text style={styles.emptyStateSubtext}>
                {filter === 'all' ? 'Add your first task above' : 'Try changing the filter'}
              </Text>
            </View>
          ) : (
            filteredTasks.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <TouchableOpacity
                  style={styles.taskContent}
                  onPress={() => toggleTask(task.id)}
                >
                  <View style={[
                    styles.checkbox,
                    task.completed && styles.checkboxCompleted
                  ]}>
                    {task.completed && <Check color="#ffffff" size={16} />}
                  </View>
                  <View style={styles.taskText}>
                    <Text style={[
                      styles.taskTitle,
                      task.completed && styles.taskTitleCompleted
                    ]}>
                      {task.title}
                    </Text>
                    {task.description ? (
                      <Text style={[
                        styles.taskDescription,
                        task.completed && styles.taskDescriptionCompleted
                      ]}>
                        {task.description}
                      </Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteTask(task.id)}
                >
                  <Trash2 color="#ef4444" size={18} />
                </TouchableOpacity>
              </View>
            ))
          )}
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
  headerTitle: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 28,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 24,
    color: '#ffffff',
  },
  statLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  addTaskSection: {
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
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    backgroundColor: '#f9fafb',
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#ffffff',
  },
  filterSection: {
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
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginLeft: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#6366f1',
  },
  filterButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#6b7280',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  tasksSection: {
    marginBottom: 24,
  },
  emptyState: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyStateText: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#9ca3af',
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  taskText: {
    flex: 1,
  },
  taskTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  taskDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  taskDescriptionCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  deleteButton: {
    padding: 8,
  },
});