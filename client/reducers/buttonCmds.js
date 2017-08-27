//NB Very important: there needs to be a reducer for each piece of state
//    as defined in the store.js  file  cf. const defaulState

//NB all reducers are fired by an action dispatch, we must
//  therefore check the actions to be handled (pertinent to the reducer) here
//  and just return state if no action is handled

function gameCommand(state=[], action) {
	
	switch(action.type) {
		case 'START_GAME' :
      var {start,clear,pattern,requestId,pause} = action.payload
			return {
				...state,
        start,
        clear,				
        pattern,
        requestId,
        pause
			}
		case 'BIG_BOARD' :
			var { start, clear, big } = action.payload
			return {				
				...state,
				big,
				clear,
				start		
			}
		case 'PAUSE_GAME' :
			var {clear,start,pause} = action.payload
			return {
				...state,
				pause,
				clear,
				start				
			}
		case 'DRAW' :
			var {clear,pattern,requestId,draw} = action.payload
			return {
				...state,
				draw,
				clear,
				pattern,
				requestId				
			}
		case 'CLEAR_BOARD' :
			var {clear, pattern, requestId, pause, start} = action.payload
			return {
				...state,				
				clear,
				pattern,
				requestId,
				pause,
				start
			}			
		case 'CHANGE_SPEED' :
			var {fps, clear, start} = action.payload
			return {
				...state,
				fps,
				clear,
				start
			}
		case 'BUILT-IN_PATTERN' :
			var {start,clear,pattern,requestId} = action.payload
			return {
				...state,
				pattern,
				start,
				clear,				
				requestId,
			}

		default:
			return state			
		}
		return state	
}

export default gameCommand;