import React from 'react'
import { render } from 'react-dom'
import Grid from './components/grid'

render(
	<div>
		<span>There should be a drawing below</span>
  	<Grid />
  </div>,
  document.getElementById('grid')
);