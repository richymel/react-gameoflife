import React from 'react'
import PropTypes from 'prop-types' //https://github.com/facebook/prop-types#prop-types
import P5Wrapper from 'react-p5-wrapper'
import game from './game'
import { connect } from 'react-redux'
import gameActions from '../actions/gameActions'
import Stats from './stats'
 
const linkStyle = {
  cursor: 'pointer',
  color: 'white'
}

const speed = { //fps
  slow: 10,
  medium: 20,
  fast: 48
}

const size = {
  small: {cols:50,rows:30},
  large: {cols:80, rows: 50}
}

@connect((store) => {
  return {
    buttonCmds: store.buttonCmds
  }
})

class Grid extends React.Component {
  constructor() {
    super();

    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
    this.clear = this.clear.bind(this)
    this.fps = this.fps.bind(this)
  }

  start() {
    console.warn('start!')
    gameActions.startGame(true)
    gameActions.clearBoard(false)
    gameActions.pauseGame(false)
  }

  pause() {
    console.warn('pause!')
    gameActions.clearBoard(false)
    gameActions.startGame(false)
    gameActions.pauseGame(!this.props.buttonCmds.pause)
  }

  clear() {
    console.warn('clear!')
    gameActions.clearBoard(true)
    gameActions.pauseGame(false)
    gameActions.startGame(false)
  }

  fps(frameRate) { 
    console.warn('speed change!')
    gameActions.fps(frameRate)
    gameActions.startGame(false)
  }

  render() {  
    return (      
        <div>
          <P5Wrapper sketch={game} 
              started={this.props.buttonCmds.start}
              paused={this.props.buttonCmds.pause}
              cleared={this.props.buttonCmds.clear}
              frameRate={this.props.buttonCmds.fps}
              />
          <button onClick={this.start}>START</button>  
          <button onClick={this.pause}>{(this.props.buttonCmds.pause) ? 'CONTINUE' : 'PAUSE' }</button>  
          <button onClick={this.clear}>CLEAR</button>
          <button onClick={() => { this.fps(speed.slow) }}>Slow ({speed.slow} fps)</button>  
          <button onClick={() => { this.fps(speed.medium) }}>Med ({speed.medium} fps)</button>  
          <button onClick={() => { this.fps(speed.fast) }}>Fast ({speed.fast} fps)</button>
          <Stats />
        </div>
    )
  }
}

export default Grid