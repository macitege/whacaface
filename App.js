import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput
} from 'react-native';
import Button from 'react-native-button'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentPlayer: {
        id: null,
        name: null,
        score: null
      },
      previousPlayers: [{
        id: 0,
        name: 'Ege',
        score: 120
      }]
    }
  }

  startGame = () => {
    console.log('Game start')
  }

  handleChange = text => this.setState({
    currentPlayer: { ...this.state.currentPlayer, name: text }
  })

  render() {
    return (
      <View style={styles.mainContainer}>

        <View style={[styles.logoContainer, styles.content]}>
          <Text style={styles.logo}>ಠ_ಠ</Text>
        </View>

        <Text style={styles.logoText}>Wack A Face</Text>

        <TextInput
          onChangeText={this.handleChange}
          value={this.state.playerName}
          placeholder="Type a player name"
          style={styles.playerName}/>

        <Button
          containerStyle={styles.buttonContainer}
          style={styles.playButton}
          disabledContainerStyle={{opacity: 0.5}}
          onPress={this.startGame}>
          Play!
        </Button>
        <View style={styles.leaderBoard}>
          <Text style={styles.title}>Leader Board</Text>
          <View style={[styles.categories, styles.row]}>
            <Text> Rank </Text>
            <Text> Player </Text>
            <Text> Score </Text>
          </View>
          <View>
            {this.state.previousPlayers.map((player, i) => {
              return (
                <View key={player.id} style={styles.row}>
                  <Text> {i + 1} </Text>
                  <Text> {player.name} </Text>
                  <Text> {player.score} </Text>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FB0C',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'orange',
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
  logoContainer: {
    borderRadius: 100,
    height: 100,
    width: 150,
  },
  logo: {
    fontSize: 70,
  },
  logoText: {
    fontSize: 50,
  },
  playerName: {
    fontSize: 30,
    marginTop: 50,
  },
  playButton : {
    fontSize: 30,
    color: '#fefefe',
    padding: 20,
    borderRadius: 100,
  },
  buttonContainer: {
    padding:10,
    borderRadius: 30,
    backgroundColor: 'orange',
    marginTop: 50,
  },
  leaderBoard : {
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
  },
  title: {
    width: '100%',
    fontSize: 20,
    backgroundColor: '#FB0E',
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categories: {
    width: '100%',
    fontSize: 20,
    backgroundColor: '#FB0D',
    marginBottom: 5,
    padding: 5,
    textDecorationLine: 'underline',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FB0D',
  }
});
