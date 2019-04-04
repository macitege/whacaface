import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import Button from 'react-native-button'


export default class Home extends Component {
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

  generateId = () => {
    return this.state.previousPlayers.length + 1
  }

  startGame = () => {
    if (!this.state.currentPlayer.name) {
      return Alert.alert('Please enter a player name')
    }
    const newId = this.generateId()
    this.setState({ currentPlayer: { ...this.state.currentPlayer, id: newId }})
    this.props.navigation.navigate('Game')
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
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FB0C',
    alignItems: 'center',
  },
  content: {
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
    color: '#fa9000',
  },
  logoText: {
    fontSize: 50,
    color: '#fefefe',
  },
  playerName: {
    fontSize: 30,
    marginTop: 50,
  },
  playButton : {
    fontSize: 25,
    color: '#fefefe',
    padding: 10,
    borderRadius: 100,
  },
  buttonContainer: {
    padding: 2,
    borderRadius: 30,
    backgroundColor: 'orange',
    marginTop: 30,
    width: 250,
  },
  leaderBoard : {
    alignItems: 'center',
    marginTop: 110,
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
