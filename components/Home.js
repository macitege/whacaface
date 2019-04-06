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
      playerName: null,
      currentPlayer: null,
      previousPlayers: [{
        id: 0,
        name: 'Jennifer',
        score: 420
      },
      {
        id: 1,
        name: 'Ege',
        score: 120
      },
      {
        id: 2,
        name: 'Johnathan',
        score: 60
      }]
    }
  }

  componentDidUpdate = () => {
    const { currentPlayer } = this.state
    if (currentPlayer) {
      this.props.navigation.navigate('Game', { currentPlayer: currentPlayer })
    }
  }

  generateId = () => {
    return this.state.previousPlayers.length
  }

  goToGame = () => {
    const { currentPlayer, playerName } = this.state
    if (!playerName) {
      return Alert.alert('Please enter a player name')
    }
    const newId = this.generateId()
    this.setState({ currentPlayer: { name: playerName, id: newId } })
  }

  handleChange = text => this.setState({ playerName: text })

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
          onPress={this.goToGame}>
          Play!
        </Button>

        <View style={styles.leaderBoard}>

          <Text style={styles.title}>(⌐■_■)     Leader Board     (◕‿◕✿)</Text>
          <View style={styles.row}>
            <Text style={[styles.categories, styles.centerIt]}>Rank</Text>
            <Text style={[styles.categories, styles.centerIt]}>Player</Text>
            <Text style={[styles.categories, styles.centerIt]}>Score</Text>
          </View>
          <View>
            {this.state.previousPlayers.map((player, i) => {
              return (
                <View key={player.id} style={styles.row}>
                  <Text style={styles.centerIt}>{i + 1}{i < 1 ? 'st   (°▽°)/' : i < 2 ? 'nd (^-^*)/' : i < 3 ? 'rd (・_・)ノ' : null}</Text>
                  <Text style={styles.centerIt}>{player.name}</Text>
                  <Text style={styles.centerIt}>{player.score}</Text>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#9191E9',
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
    color: '#42426A',
  },
  logoText: {
    fontSize: 50,
    marginTop: -20,
    color: '#fefefe',
  },
  playerName: {
    fontSize: 30,
    marginTop: 80,
    color: '#fefefe',
    fontWeight: 'bold',
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
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  title: {
    width: '100%',
    fontSize: 20,
    backgroundColor: '#A5A5ED',
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F4D35E',
  },
  categories: {
    fontSize: 20,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#A5A5ED',
    justifyContent: 'space-around',
    padding: 5,
  },
  centerIt: {
    textAlign: 'center',
    width: '30%',
  }
});
