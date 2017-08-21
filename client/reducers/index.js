// Redux needs to have all reducers combined into a single root reducer:
import { combineReducers } from 'redux';

import buttonCmds from './buttonCmds';
import gameTally from './gameTally';

const rootReducer = combineReducers({buttonCmds, gameTally});

export default rootReducer;