import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { styles } from './Home'
import Button from 'react-native-button'
import { withNavigationFocus } from 'react-navigation'
import { connect } from 'react-redux'
import store from './store/store'
import {
  updateHoles,
  submitScore,
  updatePreviousPlayers,
  updatePlayerName
} from './store/actions'


class Game extends Component {
  constructor (props) {
    super(props)
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.timer === 0) {
      Alert.alert('Time is over ಠ‿ಠ')
      this.toggleGame()
    }
    // IF THE PLAYER CHANGES PAGE DURING GAME, END THE GAME
    if (prevProps.isFocused !== this.props.isFocused) {
      if (this.props.isGameOn) {
        store.dispatch({ type: 'TOGGLEGAME' })
      }
      this.clearGame()
      store.dispatch({ type: 'RESETSCORE' })
    }
  }

  decrement = () => store.dispatch({ type: 'COUNTDOWN' })

  showFaces = () => {
    const { holeOccupancy } = this.props
    let faceCounter = 0
    holeOccupancy.forEach(el => { el ? faceCounter++ : null })
    const randomPlace = Math.floor(Math.random() * 8)
    const newState = [...holeOccupancy]

    if (faceCounter < 3) {
      newState[randomPlace] = !newState[randomPlace]
      store.dispatch(updateHoles(newState))
    } else {
      const i = newState.indexOf(true)
      newState[i] = false
      store.dispatch(updateHoles(newState))
    }
  }

  clearGame = () => {
    clearInterval(this.timerInterval)
    clearInterval(this.gameInterval)
    store.dispatch({ type: 'RESETTIMER' })
    store.dispatch(updateHoles(new Array(8).fill(false)))
  }

  toggleGame = () => {
    if (this.props.isGameOn) {
      this.clearGame()
    } else {
      this.timerInterval = setInterval(this.decrement, 1000)
      this.gameInterval = setInterval(this.showFaces, 500)
    }
    store.dispatch({ type: 'TOGGLEGAME' })
  }

  evaluate = (id) => {
    const { holeOccupancy, isGameOn } = this.props
    if (!isGameOn) return null
    if (holeOccupancy[id]) {
      const newState = [...holeOccupancy]
      newState[id] = !newState[id]
      store.dispatch(updateHoles(newState))
      store.dispatch({ type: 'INCREMENT', amount: 10})
    } else {
      store.dispatch({ type: 'DECREMENT', amount: -5})
    }
  }

  submitScore = () => {
    const { score, currentPlayer, previousPlayers } = this.props
    store.dispatch(submitScore({ score: score }))
    store.dispatch(updatePreviousPlayers(currentPlayer))
    store.dispatch(updatePlayerName(''))
    store.dispatch({ type: 'RESETSCORE' })
    store.dispatch({ type: 'TOGGLEGAME' })
    // this.setState({ isGameOn: !this.state.isGameOn })
    this.props.navigation.goBack()
  }

  render() {
    const { holeOccupancy, currentPlayer, timer, score, isGameOn } = this.props

    return (
      <View style={styles.mainContainer}>
        <Text>Hello, {currentPlayer.name}! </Text>
        <Text>Please don't hit so hard. ಠ_ಠ</Text>
        <View style={[styles.row, stylesGame.overCurtain]}>
          <View style={{alignItems:'center'}}>
            <Text>Score: </Text>
            <Text style={stylesGame.score}>{score}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Time: </Text>
            <Text style={stylesGame.time}>{timer === 60 ? '1:00' : timer < 10 ? '0:0' + timer : '0:' + timer}</Text>
          </View>
        </View>

        {score && !isGameOn ? <Button containerStyle={stylesGame.submitButton} style={styles.playButton} onPress={this.submitScore}>Submit Score</Button> :
        <Button
          containerStyle={[isGameOn ? stylesGame.stopButton : styles.buttonContainer, stylesGame.overCurtain]}
          style={styles.playButton}
          onPress={this.toggleGame}>
          {isGameOn ? 'Exit Game' : 'Start!'}
        </Button>}

        <View style={stylesGame.board}>

          <View style={stylesGame.col}>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceAlive} onPress={() => this.evaluate(0)}>{holeOccupancy[0] ? 'ಠ_ಠ' : '     '}</Button>
            </View>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceAlive}onPress={() => this.evaluate(1)}>{holeOccupancy[1] ? 'ಠ_ಠ' : '     '}</Button>
            </View>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceAlive}onPress={() => this.evaluate(2)}>{holeOccupancy[2] ? 'ಠ_ಠ' : '     '}</Button>
            </View>
          </View>
          <View style={stylesGame.col}>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceDead}onPress={() => this.evaluate(3)}>{holeOccupancy[3] ? 'ಠ_ಠ' : '     '}</Button>
            </View>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceDead}onPress={() => this.evaluate(4)}>{holeOccupancy[4] ? 'ಠ_ಠ' : '     '}</Button>
            </View>
          </View>
          <View style={stylesGame.col}>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceAlive}onPress={() => this.evaluate(5)}>{holeOccupancy[5] ? 'ಠ_ಠ' : '     '}</Button>
            </View>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceDead}onPress={() => this.evaluate(6)}>{holeOccupancy[6] ? 'ಠ_ಠ' : '     '}</Button>
            </View>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceAlive}onPress={() => this.evaluate(7)}>{holeOccupancy[7] ? 'ಠ_ಠ' : '     '}</Button>
            </View>
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
  stopButton: {
    padding: 2,
    borderRadius: 30,
    backgroundColor: '#BC1E1E',
    marginTop: 30,
    width: 250,
  },
  submitButton: {
    padding: 2,
    borderRadius: 30,
    backgroundColor: '#4D9078',
    marginTop: 30,
    width: 250,
  },
  board: {
    height: 430,
    width: '100%',
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 80,
  },
  col: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  hole: {
    backgroundColor: '#fefefe',
    height: '20%',
    width: '80%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceAlive: {
    color: '#000',
    fontSize: 40,
  },
  faceDead: {
    color: '#000',
    fontSize: 40,
  },
})

const mapStateToProps = state => ({
  currentPlayer: state.currentPlayer,
  timer: state.timer,
  score: state.score,
  holeOccupancy: state.holeOccupancy,
  isGameOn: state.isGameOn,
})
export default withNavigationFocus(connect(mapStateToProps)(Game))
