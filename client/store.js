/* Here Redux saves all components' states and data */

import { applyMiddleware, createStore, compose } from 'redux';

//Tools for debugging redux
import logger from 'redux-logger';

//import root reducer
import rootReducer from './reducers/index';

//all middleware:
const middleware = applyMiddleware(logger());

//The actual store objects:
const buttonCmds = {
	start: false,
	pause: false,
	clear: false,
	pattern: undefined,
	fps: 10
}

const gameTally = {
	generations: 0
}

//create an obj for the default data
const defaulState = {
  buttonCmds,
  gameTally
};

//enable store for redux devtools Chrome extension
//NB. https://github.com/zalmoxisus/redux-devtools-extension/issues/192
//    to resolve the runtime error: "Actions must be plain objects. Use custom middleware for async actions"
//    the enhancers obj must contain the middleware, do not append middleware at the end of createStore parm list.
const enhancers = compose(
	middleware,
	window.devToolsExtension ? window.devToolsExtension() : f => f
);

//to complete the redux devtools setup, pass enhancers to store below:

const store = createStore(rootReducer, defaulState, enhancers);

console.log('store created:', store);


//hot reloading reducers 
if (module.hot) {
		module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	})
}

export default store;