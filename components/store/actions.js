// action types
export const PLAYERNAME = 'PLAYERNAME'
export const CURRENTPLAYER = 'CURRENTPLAYER'
export const UPDATEHOLES = 'UPDATEHOLES'
export const SUBMITSCORE = 'SUBMITSCORE'
export const UPDATEPREVIOUS = 'UPDATEPREVIOUS'

// action creators

export const updatePlayerName = name => ({
  type: PLAYERNAME,
  payload: name
})

export const createCurrentPlayer = player => ({
  type: CURRENTPLAYER,
  payload: player
})

export const updateHoles = newState => ({
  type: UPDATEHOLES,
  payload: newState
})

export const submitScore = score => ({
  type: SUBMITSCORE,
  payload: score
})

export const updatePreviousPlayers = player => ({
  type: UPDATEPREVIOUS,
  payload: player
})
