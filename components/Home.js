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
import store from './store/store'
import { updatePlayerName, createCurrentPlayer } from './store/actions'
import { connect } from 'react-redux'

class Home extends Component {
  constructor() {
    super()
  }

  static navigationOptions = {
    title: 'Main Page'
  }

  generateId = () => {
    return this.props.previousPlayers.length
  }

  goToGame = () => {
    const name = this.props.playerName
    if (!name) {
      return Alert.alert('Please enter a player name')
    }
    const newId = this.generateId()
    store.dispatch(createCurrentPlayer({ name: name, id: newId, score: 0 }))
    this.props.navigation.navigate('Game')
  }

  handleChange = text => store.dispatch(updatePlayerName(text))

  sortedPlayers = () => this.props.previousPlayers.sort((a,b) => b.score - a.score)

  render() {
    return (
      <View style={styles.mainContainer}>

        <View style={[styles.logoContainer, styles.content]}>
          <Text style={styles.logo}>ಠ‿ಠ</Text>
        </View>

        <Text style={styles.logoText}>Wack A Face</Text>

        <TextInput
          onChangeText={this.handleChange}
          value={store.getState().playerName}
          placeholder="Type a player name"
          style={styles.playerName}/>

        <Button
          containerStyle={styles.buttonContainer}
          style={styles.playButton}
          onPress={this.goToGame}>
          Whac it!
        </Button>

        <View style={styles.leaderBoard}>

          <View style={[styles.row, styles.header]}>
            <Text style={styles.kaomoji}>(⌐■_■)</Text>
            <Text style={styles.title}>Previous Games</Text>
            <Text style={styles.kaomoji}>(◕‿◕✿)</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.categories, styles.centerIt]}>Rank</Text>
            <Text style={[styles.categories, styles.centerIt]}>Player</Text>
            <Text style={[styles.categories, styles.centerIt]}>Score</Text>
          </View>
          <ScrollView>
            { this.sortedPlayers().map((player, i) => {
              return (
                <View key={player.id} style={styles.row}>
                  <Text style={styles.centerIt}>{i + 1}{i < 1 ? 'st   (°▽°)/' : i < 2 ? 'nd (^-^*)/' : i < 3 ? 'rd (・_・)ノ' : 'th'}</Text>
                  <Text style={styles.centerIt}>{player.name}</Text>
                  <Text style={styles.centerIt}>{player.score}</Text>
                </View>
              )
            })}
          </ScrollView>
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
    marginTop: -10,
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
    bottom: 10,
    width: '100%',
    height: 200,
  },
  title: {
    // width: '100%',
    fontSize: 20,
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
    alignItems: 'center',
    padding: 5,
  },
  centerIt: {
    textAlign: 'center',
    width: '30%',
  },
  kaomoji: {
    color: '#A5A5ED',
    fontSize: 25,
  },
  header: {
    backgroundColor: '#42426A',
    opacity: 0.8,
  }
});

const mapStateToProps = state => ({
  playerName: state.playerName,
  currentPlayer: state.currentPlayer,
  previousPlayers: state.previousPlayers,
})
export default connect(mapStateToProps)(Home)
