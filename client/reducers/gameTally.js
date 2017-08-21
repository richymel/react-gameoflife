function gameTally(state = [], action) {
	switch(action.type) {
		case 'INCREMENT_DEATHS' :			
			return {
				...state, 
				deaths: state.deaths + action.payload
			}
		case 'INCREMENT_BIRTHS' :
			return {
				...state, 
				births: state.births + action.payload
			}
		case 'SET_COUNTERS' :			
			return {
				...state, 
				deaths: action.payload.deaths,
				births: action.payload.births
			}			
		default:
			return state
	}
	return state
}

export default gameTally;