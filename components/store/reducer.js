
import { combineReducers } from 'redux'

const merge = (state, update) => {
  return Object.assign(state, update)
}

const timer = (state = 60, action) => {
  switch (action.type) {
    case 'COUNTDOWN':
      return state - 1
    case 'RESETTIMER':
      return state = 60
    default:
      return state
  }
}

const isGameOn = (state = false, action) => {
  if (action.type === 'TOGGLEGAME') {
    return state = !state
  } else {
    return state
  }
}

const playerName = (state = null, action) => {
  if (action.type === 'PLAYERNAME') {
    return state = action.payload
  } else {
    return state
  }
}

const currentPlayer = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENTPLAYER':
      return state = action.payload
    case 'SUBMITSCORE':
      return merge(state, action.payload)
    default:
    return state
  }
}

const score = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state += action.amount
    case 'DECREMENT':
      if (state > 4) return state += action.amount
    case 'RESETSCORE':
      return state = 0
    default:
      return state
    }
}

export const holesDefault = new Array(8).fill(false)
const holeOccupancy = (state = holesDefault, action ) => {
  if (action.type === 'UPDATEHOLES') {
    return state = action.payload
  }
  return state
}

const previousPlayers = (state = defaultPreviousPlayers, action) => {
  if (action.type === 'UPDATEPREVIOUS') {
    return [...state, action.payload]
  } else {
    return state
  }
}

const defaultPreviousPlayers = [
    {
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
  }
]

const reducer = combineReducers({
  timer,
  playerName,
  currentPlayer,
  score,
  holeOccupancy,
  previousPlayers,
  isGameOn,
})

export default reducer
