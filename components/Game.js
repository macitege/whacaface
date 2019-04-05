import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { styles } from './Home'
import Button from 'react-native-button'

export default class Game extends Component {
  constructor (props) {
    super(props)

    // this.state = {
    //   currentPlayer: {...props.navigation.getParam('currentPlayer'), score: 0},
    //   timer: 60
    // }

      this.state = {
        currentPlayer: {
          id: 0,
          name: 'Ege',
          score: 0
        },
        timer: 60
      }
  }

  render() {
    const { currentPlayer, timer } = this.state
    return (
      <View style={styles.mainContainer}>

        <Text>Hello, {currentPlayer.name}! </Text>
        <Text>Please don't hit so hard. ಠ_ಠ</Text>
        <View style={styles.row}>
          <View style={{alignItems:'center'}}>
            <Text>Score: </Text>
            <Text style={stylesGame.score}>{currentPlayer.score}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Time: </Text>
            <Text style={stylesGame.time}>{timer} s</Text>
          </View>
        </View>
        <Button
          containerStyle={styles.buttonContainer}
          style={styles.playButton}
          onPress={this.startGame}>
          Start!
        </Button>

        <View style={stylesGame.board}>

          <View style={stylesGame.col}>
            <View style={stylesGame.hole}><Text style={stylesGame.faceAlive}>ಠ_ಠ</Text></View>
            <View style={stylesGame.hole}><Text style={stylesGame.faceDead}>b_ü</Text></View>
            <View style={stylesGame.hole}><Text style={stylesGame.faceAlive}>ಠ_ಠ</Text></View>
          </View>
          <View style={stylesGame.col}>
            <View style={stylesGame.hole}><Text style={stylesGame.faceAlive}>ಠ_ಠ</Text></View>
            <View style={stylesGame.hole}><Text style={stylesGame.faceDead}>X_X</Text></View>
          </View>
          <View style={stylesGame.col}>
            <View style={stylesGame.hole}><Text style={stylesGame.faceAlive}>ಠ_ಠ</Text></View>
            <View style={stylesGame.hole}><Text style={stylesGame.faceDead}>-_&</Text></View>
            <View style={stylesGame.hole}><Text style={stylesGame.faceAlive}></Text></View>
          </View>

        </View>

      </View>
    )
  }
}

const stylesGame = StyleSheet.create({
  time: {
    fontSize: 30,
  },
  score: {
    fontSize: 30,
  },
  board: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 80,
    // backgroundColor: 'green'
  },
  col: {
    // backgroundColor: 'tomato',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  hole: {
    backgroundColor: '#B4436C',
    height: '20%',
    width: '80%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceAlive: {
    color: '#F9E2AE',
    fontSize: 40,
  },
  faceDead: {
    color: '#9EEC95',
    fontSize: 40,
  }
})
