import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import GoalsScreen from './screens/GoalsScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import NotesScreen from './screens/NotesScreen';
import NoteDetailScreen from './screens/NoteDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Goals" component={GoalsScreen} />
        <Stack.Screen name="Projects" component={ProjectsScreen} />
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
        {/* Add more screens later */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}