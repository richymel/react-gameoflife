import store from '../store';

//sync actions

module.exports = {
  startGame: function(parms) {
  	store.dispatch({   	
     	type: 'START_GAME',
      payload: parms
    })	
  },

  bigBoard: function(parms) {
    store.dispatch({
      type: 'BIG_BOARD',
      payload: parms
    })
  },

  pauseGame: function(parms) {
  	store.dispatch({
  		type: 'PAUSE_GAME',
  		payload: parms
  	})
  },

  draw: function(parms) {
    store.dispatch({
      type: 'DRAW',
      payload: parms
    })
  },

  clearBoard: function(parms) {
    store.dispatch({
      type: 'CLEAR_BOARD',
      payload: parms
    })
  },

  fps: function(parms) {
  	store.dispatch({
  		type: 'CHANGE_SPEED',
  		payload: parms
  	})
  },

  pattern: function(parms) {
    store.dispatch({
      type: 'BUILT-IN_PATTERN',
      payload: parms
    })
  },

  setTally: function(generations) {
    store.dispatch({
      type: 'SET_COUNTER',
      payload: generations
    })
  }
}