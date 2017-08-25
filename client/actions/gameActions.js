import store from '../store';

//sync actions

module.exports = {
  startGame: function(bool) {
  	store.dispatch({   	
     	type: 'START_GAME',
      payload: bool
    })	
  },

  bigBoard: function(bool) {
    store.dispatch({
      type: 'BIG_BOARD',
      payload: bool
    })
  },

  pauseGame: function(bool) {
  	store.dispatch({
  		type: 'PAUSE_GAME',
  		payload: bool
  	})
  },

  draw: function(bool) {
    store.dispatch({
      type: 'DRAW',
      payload: bool
    })
  },

  clearBoard: function(bool) {
    store.dispatch({
      type: 'CLEAR_BOARD',
      payload: bool
    })
  },

  fps: function(speed) {
  	store.dispatch({
  		type: 'CHANGE_SPEED',
  		payload: speed
  	})
  },

  pattern: function(pattern) {
    store.dispatch({
      type: 'BUILT-IN_PATTERN',
      payload: pattern
    })
  },

  setTally: function(generations) {
    store.dispatch({
      type: 'SET_COUNTER',
      payload: generations
    })
  }
}