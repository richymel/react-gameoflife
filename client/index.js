import React from 'react'
import { render } from 'react-dom'
import Grid from './components/grid'
import { Provider } from 'react-redux'
import store from './store'

render(
	<Provider store={store}>
 		<Grid />
 	</Provider>
  , document.getElementById('grid')
);