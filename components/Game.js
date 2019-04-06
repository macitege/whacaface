import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { styles } from './Home'
import Button from 'react-native-button'
import { withNavigationFocus } from 'react-navigation'


class Game extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentPlayer: {...props.navigation.getParam('currentPlayer'), score: 0},
      timer: 60,
      aliveFace: 'ಠ_ಠ',
      deadFace: '-_x',
      surviveFace:'ಠ‿ಠ',
      holeOccupancy: [false, false, false, false, false, false, false, false],
      isGameOn: false
    }

      // this.state = {
      //   currentPlayer: {
      //     id: 0,
      //     name: 'Ege',
      //     score: 0
      //   },
      //   timer: 60
      // }
  }

  componentDidUpdate = (prevProps) => {
    if (this.state.timer === 0) {
      Alert.alert('Time is over ಠ‿ಠ')
      this.toggleGame()
    }
  }


  decrement = () => this.state.timer ? this.setState(prevState => ({
    timer: prevState.timer - 1,
  })) : null

  showFaces = () => {
    const { holeOccupancy } = this.state
    let faceCounter = 0
    holeOccupancy.forEach(el => {
      el ? faceCounter++ : null
    })

    const randomPlace = Math.floor(Math.random() * 8)
    const newState = [...holeOccupancy]

    if (faceCounter < 3) {
      newState[randomPlace] = !newState[randomPlace]
      this.setState({ holeOccupancy: newState})
    } else {
      const i = newState.indexOf(true)
      newState[i] = false
      this.setState({ holeOccupancy: newState})
    }
  }

  toggleGame = () => {
    if (this.state.isGameOn) {
      clearInterval(this.timerInterval)
      clearInterval(this.gameInterval)
      this.setState({ timer: 60, holeOccupancy: new Array(8).fill(false), isGameOn: false })
    } else {
      this.timerInterval = setInterval(this.decrement, 1000)
      this.gameInterval = setInterval(this.showFaces, 500)
    }
    this.setState({ isGameOn: !this.state.isGameOn })
  }

  evaluate = (id) => {
    const { currentPlayer, holeOccupancy, isGameOn } = this.state
    if (!isGameOn) return null
    if (this.state.holeOccupancy[id]) {
      const newState = [...holeOccupancy]
      newState[id] = !newState[id]
      this.setState({ currentPlayer: {...currentPlayer, score: currentPlayer.score + 10}, holeOccupancy: newState })
    } else {
      this.setState({ currentPlayer: {...currentPlayer, score: currentPlayer.score - 5} })
    }
  }

  submitScore = () => {
    const player = {...this.state.currentPlayer}
    const sendScores = this.props.navigation.getParam('submitScore')
    sendScores(player)
    this.props.navigation.goBack()
  }

  render() {
    const { currentPlayer, timer, holeOccupancy, aliveFace, deadFace, isGameOn } = this.state
    return (
      <View style={styles.mainContainer}>
        <Text>Hello, {currentPlayer.name}! </Text>
        <Text>Please don't hit so hard. ಠ_ಠ</Text>
        <View style={[styles.row, stylesGame.overCurtain]}>
          <View style={{alignItems:'center'}}>
            <Text>Score: </Text>
            <Text style={stylesGame.score}>{currentPlayer.score}</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>Time: </Text>
            <Text style={stylesGame.time}>{timer === 60 ? '1:00' : timer < 10 ? '0:0' + timer : '0:' + timer}</Text>
          </View>
        </View>

        {currentPlayer.score && !isGameOn ? <Button containerStyle={stylesGame.submitButton} style={styles.playButton} onPress={this.submitScore}>Submit Score</Button> :
        <Button
          containerStyle={[isGameOn ? stylesGame.stopButton : styles.buttonContainer, stylesGame.overCurtain]}
          style={styles.playButton}
          onPress={this.toggleGame}>
          {isGameOn ? 'Exit Game' : 'Start!'}
        </Button>}

        <View style={stylesGame.board}>

          <View style={stylesGame.col}>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceAlive} onPress={() => this.evaluate(0)}>{holeOccupancy[0] ? aliveFace : '     '}</Button>
            </View>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceAlive}onPress={() => this.evaluate(1)}>{holeOccupancy[1] ? aliveFace : '     '}</Button>
            </View>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceAlive}onPress={() => this.evaluate(2)}>{holeOccupancy[2] ? aliveFace : '     '}</Button>
            </View>
          </View>
          <View style={stylesGame.col}>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceDead}onPress={() => this.evaluate(3)}>{holeOccupancy[3] ? aliveFace : '     '}</Button>
            </View>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceDead}onPress={() => this.evaluate(4)}>{holeOccupancy[4] ? aliveFace : '     '}</Button>
            </View>
          </View>
          <View style={stylesGame.col}>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceAlive}onPress={() => this.evaluate(5)}>{holeOccupancy[5] ? aliveFace : '     '}</Button>
            </View>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceDead}onPress={() => this.evaluate(6)}>{holeOccupancy[6] ? aliveFace : '     '}</Button>
            </View>
            <View style={stylesGame.hole}>
              <Button style={stylesGame.faceAlive}onPress={() => this.evaluate(7)}>{holeOccupancy[7] ? aliveFace : '     '}</Button>
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

export default withNavigationFocus(Game)
