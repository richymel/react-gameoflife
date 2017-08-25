import React from 'react'
import { connect } from 'react-redux'
import gameActions from '../actions/gameActions'

const linkStyle = {
  cursor: 'pointer',
  color: 'white'
}
 
@connect((store) => {
  return {
    gameTally: store.gameTally
  }
})

class Stats extends React.Component {
  constructor() {
    super();
  }

  render() {  
    return (      
        <span style={linkStyle}>  
          Generations: {this.props.gameTally.generations}
        </span>
    )
  }
}

export default Stats