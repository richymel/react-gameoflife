import React from 'react'
import PropTypes from 'prop-types' //https://github.com/facebook/prop-types#prop-types
import P5Wrapper from 'react-p5-wrapper'
import game from './game'
 
const linkStyle = {
  cursor: 'pointer'
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

class Grid extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false,
      frameRate: speed.medium,
      boardSize: size.small,
      started: false,
      paused: false,
      ended: false,
      cleared: false,
      generations: 0,
      deathToll: 0,
      newBorn: 0,
    }
    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
    this.clear = this.clear.bind(this)
    this.fps = this.fps.bind(this)
    //this.fps2 = this.fps2.bind(this)
  }

  start() {
    console.warn('start!');
    this.setState({
      started: true,
      cleared: false,
      paused: false
    })
  }

  pause() {
    this.setState({
      cleared: false,
      started: false,
      paused: !this.state.paused
    })
  }

  clear() {
    this.setState({
      cleared: true,
      paused: false,
      started: false
    })
  }

  fps(frameRate) {    
    this.setState({
      frameRate,
      started: false
    })
  }  

  render() {  
    return (      
        <div>
          <P5Wrapper sketch={game} 
              started={this.state.started}
              paused={this.state.paused}
              cleared={this.state.cleared}
              frameRate={this.state.frameRate}              
              />
          <button onClick={this.start}>START</button>  
          <button onClick={this.pause}>{(this.state.paused) ? 'CONTINUE' : 'PAUSE' }</button>  
          <button onClick={this.clear}>CLEAR</button>
          <button onClick={() => { this.fps(speed.slow) }}>Slow ({speed.slow} fps)</button>  
          <button onClick={() => { this.fps(speed.medium) }}>Med ({speed.medium} fps)</button>  
          <button onClick={() => { this.fps(speed.fast) }}>Fast ({speed.fast} fps)</button>
          
        </div>
    )
  }
}

export default Grid