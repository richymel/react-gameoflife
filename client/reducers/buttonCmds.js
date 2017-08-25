//NB Very important: there needs to be a reducer for each piece of state
//    as defined in the store.js  file  cf. const defaulState

//NB all reducers are fired by an action dispatch, we must
//  therefore check the actions to be handled (pertinent to the reducer) here
//  and just return state if no action is handled

function gameCommand(state=[], action) {
	switch(action.type) {
		case 'START_GAME' :
			return {
				...state,
				start: action.payload
			}	
		case 'BIG_BOARD' :
			return {
				...state,
				big: action.payload
			}
		case 'PAUSE_GAME' :
			return {
				...state,
				pause: action.payload
			}
		case 'DRAW' :
			return {
				...state,
				draw: action.payload
			}
		case 'CLEAR_BOARD' :
			return {
				...state,
				clear: action.payload
			}			
		case 'CHANGE_SPEED' :			
			return {
				...state,
				fps: action.payload
			}
		case 'BUILT-IN_PATTERN' :
			return {
				...state,
				pattern: action.payload.pattern,
				requestId: action.payload.requestId
			}

		default:
			return state			
		}
		return state	
}

export default gameCommand;