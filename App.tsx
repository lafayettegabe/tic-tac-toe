import { StyleSheet, Text, Pressable, View, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

export default function App() {
  const [matrix, setMatrix] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState('');
  const [inGame, setInGame] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const checkWinner = (matrix: any[][]) => {
    // check rows
    for (let i = 0; i < 3; i++) {
      if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2] && matrix[i][0] !== '') {
        return matrix[i][0];
      }
    }

    // check columns
    for (let i = 0; i < 3; i++) {
      if (matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i] && matrix[0][i] !== '') {
        return matrix[0][i];
      }
    }

    // check diagonals
    if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2] && matrix[0][0] !== '') {
      return matrix[0][0];
    }

    if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0] && matrix[0][2] !== '') {
      return matrix[0][2];
    }

    return '';
  };

  const checkDraw = (matrix: any[][]) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (matrix[i][j] === '') {
          return false;
        }
      }
    }

    return true;
  }

  const handlePress = (row: number, col: number) => {
    if (matrix[row][col] === '' && winner === '') {
      matrix[row][col] = player;
      setMatrix([...matrix]);

      const winner = checkWinner(matrix);
      const draw = checkDraw(matrix);

      if (winner) {
        setWinner(winner);
        setModalVisible(true);
      } else if (draw) {
        setWinner('Draw');
        setModalVisible(true);
      } else {
        setPlayer(player === 'X' ? 'O' : 'X');
      }
    }
  }

  const handleReset = () => {
    setMatrix([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setPlayer('X');
    setWinner('');
    setInGame(false);
    setModalVisible(false);
  };

  const handleStartGame = () => {
    handleReset();
    setInGame(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {inGame ? (
        <>
          <Text style={styles.text}>{player === 'X' ? 'Player 1' : 'Player 2'}'s turn</Text>
          <View style={styles.board}>
            {matrix.map((row, i) => (
              <View key={i} style={styles.row}>
                {row.map((col, j) => (
                  <Pressable
                    key={j}
                    style={styles.cell}
                    onPress={() => handlePress(i, j)}
                  >
                    <Text style={styles.cellText}>{col}</Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {winner === 'Draw' ? 'It\'s a Draw!' : `Player ${winner === 'X' ? '1' : '2'} wins!`}
              </Text>
              <Pressable
                style={styles.button}
                onPress={handleReset}
              >
                <Text style={styles.buttonText}>Return to Menu</Text>
              </Pressable>
            </View>
          </Modal>
        </>
      ) : (
        <Pressable
          style={styles.button}
          onPress={handleStartGame}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
  },
  text: {
    color: 'white',
    fontSize: 24,
    margin: 10,
  },
  board: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'column',
  },
  cell: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#333',
  },
  cellText: {
    color: 'white',
    fontSize: 40,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 35,
    borderRadius: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
  },
});