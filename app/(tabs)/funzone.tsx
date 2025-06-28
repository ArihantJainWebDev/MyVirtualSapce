import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TowerControl as GameController2, Trophy, RotateCcw, Play } from 'lucide-react-native';

type TicTacToeCell = 'X' | 'O' | null;
type GameMode = 'menu' | 'ticTacToe' | 'memoryMatch';

export default function FunZoneScreen() {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  
  // Tic Tac Toe State
  const [ticTacToeBoard, setTicTacToeBoard] = useState<TicTacToeCell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [ticTacToeWinner, setTicTacToeWinner] = useState<string | null>(null);

  // Memory Match State
  const [memoryCards, setMemoryCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);

  const games = [
    {
      id: 'ticTacToe',
      title: 'Tic Tac Toe',
      description: 'Classic strategy game',
      icon: '⭕',
      color: '#6366f1'
    },
    {
      id: 'memoryMatch',
      title: 'Memory Match',
      description: 'Test your memory',
      icon: '🧠',
      color: '#10b981'
    },
  ];

  // Tic Tac Toe Logic
  const checkTicTacToeWinner = (board: TicTacToeCell[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleTicTacToeMove = (index: number) => {
    if (ticTacToeBoard[index] || ticTacToeWinner) return;

    const newBoard = [...ticTacToeBoard];
    newBoard[index] = currentPlayer;
    setTicTacToeBoard(newBoard);

    const winner = checkTicTacToeWinner(newBoard);
    if (winner) {
      setTicTacToeWinner(winner);
      Alert.alert('Game Over', `Player ${winner} wins! 🎉`);
    } else if (newBoard.every(cell => cell !== null)) {
      setTicTacToeWinner('tie');
      Alert.alert('Game Over', "It's a tie! 🤝");
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetTicTacToe = () => {
    setTicTacToeBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setTicTacToeWinner(null);
  };

  // Memory Match Logic
  const initializeMemoryGame = () => {
    const symbols = ['🎮', '🎯', '🎨', '🎵', '🎪', '🎭', '🎲', '🎰'];
    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    setMemoryCards(cards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMemoryMoves(0);
  };

  const handleMemoryCardPress = (index: number) => {
    if (flippedCards.length === 2 || matchedCards.includes(index) || flippedCards.includes(index)) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMemoryMoves(prev => prev + 1);
      setTimeout(() => {
        if (memoryCards[newFlippedCards[0]] === memoryCards[newFlippedCards[1]]) {
          setMatchedCards(prev => [...prev, ...newFlippedCards]);
          if (matchedCards.length + 2 === memoryCards.length) {
            Alert.alert('Congratulations!', `You won in ${memoryMoves + 1} moves! 🎉`);
          }
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  const renderGameMenu = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.gamesGrid}>
        {games.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={[styles.gameCard, { borderLeftColor: game.color }]}
            onPress={() => {
              setGameMode(game.id as GameMode);
              if (game.id === 'memoryMatch') {
                initializeMemoryGame();
              }
            }}
          >
            <Text style={styles.gameIcon}>{game.icon}</Text>
            <View style={styles.gameInfo}>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gameDescription}>{game.description}</Text>
            </View>
            <Play color={game.color} size={20} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.funFactsSection}>
        <Text style={styles.sectionTitle}>Gaming Tips 🎯</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            🧠 Playing games can improve problem-solving skills and memory!
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            🎮 Take breaks between games to stay focused and have more fun.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderTicTacToe = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.gameHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setGameMode('menu')}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetTicTacToe}>
          <RotateCcw color="#ffffff" size={16} />
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ticTacToeContainer}>
        <Text style={styles.currentPlayerText}>
          Current Player: <Text style={styles.playerHighlight}>{currentPlayer}</Text>
        </Text>
        
        <View style={styles.ticTacToeBoard}>
          {ticTacToeBoard.map((cell, index) => (
            <TouchableOpacity
              key={index}
              style={styles.ticTacToeCell}
              onPress={() => handleTicTacToeMove(index)}
            >
              <Text style={styles.ticTacToeCellText}>{cell}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderMemoryMatch = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.gameHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setGameMode('menu')}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={initializeMemoryGame}>
          <RotateCcw color="#ffffff" size={16} />
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.memoryContainer}>
        <Text style={styles.movesText}>Moves: {memoryMoves}</Text>
        
        <View style={styles.memoryBoard}>
          {memoryCards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.memoryCard,
                matchedCards.includes(index) && styles.memoryCardMatched,
                flippedCards.includes(index) && styles.memoryCardFlipped
              ]}
              onPress={() => handleMemoryCardPress(index)}
            >
              <Text style={styles.memoryCardText}>
                {flippedCards.includes(index) || matchedCards.includes(index) ? card : '?'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <GameController2 color="#ffffff" size={32} />
          <Text style={styles.headerTitle}>Fun Zone</Text>
          <Text style={styles.headerSubtitle}>Take a break and play! 🎮</Text>
        </View>
      </LinearGradient>

      {gameMode === 'menu' && renderGameMenu()}
      {gameMode === 'ticTacToe' && renderTicTacToe()}
      {gameMode === 'memoryMatch' && renderMemoryMatch()}
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
  gamesGrid: {
    gap: 16,
    marginBottom: 24,
  },
  gameCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gameIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 4,
  },
  gameDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  funFactsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Baloo2-SemiBold',
    fontSize: 20,
    color: '#1f2937',
    marginBottom: 16,
  },
  tipCard: {
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
  tipText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 22,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#6b7280',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  backButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#ffffff',
  },
  resetButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resetButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#ffffff',
  },
  ticTacToeContainer: {
    alignItems: 'center',
  },
  currentPlayerText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 24,
  },
  playerHighlight: {
    color: '#6366f1',
    fontFamily: 'Baloo2-Bold',
  },
  ticTacToeBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 240,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ticTacToeCell: {
    width: 64,
    height: 64,
    backgroundColor: '#f3f4f6',
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  ticTacToeCellText: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 24,
    color: '#1f2937',
  },
  memoryContainer: {
    alignItems: 'center',
  },
  movesText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 24,
  },
  memoryBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 280,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  memoryCard: {
    width: 56,
    height: 56,
    backgroundColor: '#6366f1',
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memoryCardFlipped: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  memoryCardMatched: {
    backgroundColor: '#10b981',
  },
  memoryCardText: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 20,
    color: '#ffffff',
  },
});