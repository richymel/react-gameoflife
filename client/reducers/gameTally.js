function gameTally(state = [], action) {
	switch(action.type) {
		/*
		case 'INCREMENT_GEN' :
			return {
				...state, 
				generations: state.generations + action.payload
			}
		*/
		case 'SET_COUNTER' :
			return {
				...state, 
				generations: action.payload
			}			
		default:
			return state
	}
	return state
}

export default gameTally;