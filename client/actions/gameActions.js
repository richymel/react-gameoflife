import store from '../store';

//sync actions

module.exports = {
  startGame: function(bool) {
    console.log('gameActions-start');
  	store.dispatch({   	
     	type: 'START_GAME',
      payload: bool
    })	
  },

  pauseGame: function(bool) {
  	store.dispatch({
  		type: 'PAUSE_GAME',
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

  setTally: function(births, deaths) {
    store.dispatch({
      type: 'SET_COUNTERS',
      payload: { births, deaths }
    })
  }
}