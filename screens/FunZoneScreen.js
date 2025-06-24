import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';

export default function FunZoneScreen() {
  const [joke, setJoke] = useState(null);
  const [quote, setQuote] = useState(null);

  const getJoke = async () => {
    try {
      const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
      const data = await res.json();
      setJoke(data.joke);
    } catch (err) {
      setJoke('Could not load joke. 😢');
    }
  };

  const getQuote = async () => {
    try {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      setQuote(`${data.content} — ${data.author}`);
    } catch (err) {
      setQuote('Could not load quote. 😢');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🎮 Welcome to the Fun Zone</Text>

      {/* 🔹 Random Joke */}
      <TouchableOpacity style={styles.button} onPress={getJoke}>
        <FontAwesome5 name="laugh" size={22} color="#1A1A1D" />
        <Text style={styles.buttonText}>Tell Me a Joke</Text>
      </TouchableOpacity>
      {joke && <Text style={styles.result}>{joke}</Text>}

      {/* 🔹 Chill Quote */}
      <TouchableOpacity style={styles.button} onPress={getQuote}>
        <Entypo name="quote" size={22} color="#1A1A1D" />
        <Text style={styles.buttonText}>Show Me a Quote</Text>
      </TouchableOpacity>
      {quote && <Text style={styles.result}>{quote}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 20,
    backgroundColor: '#1A1A1D',
    flexGrow: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD93D',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFD93D',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: '#1A1A1D',
    fontWeight: 'bold',
    fontSize: 16,
  },
  result: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});