import React from 'react'
import PropTypes from 'prop-types' //https://github.com/facebook/prop-types#prop-types
import P5Wrapper from 'react-p5-wrapper'
import game from './game'
import { connect } from 'react-redux'
import gameActions from '../actions/gameActions'
import Stats from './stats'
import styled from 'styled-components'
 
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

//Styled components:
const GameBtn = styled.button`
    cursor: pointer;
    font-size: .6em;
    font-weight: bold;    
    display: inline;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 3px;
    width: 80%;
    max-width: 90px;
    max-height: 25px;
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    letter-spacing: 1px;
    transition: all 0.3s ease-out;    
    &:hover {
        background: ${props => (!props.active) ? 'rgb(176, 176, 176)' : ''};
        color: ${props =>  (!props.active) ? 'rgb(26,34,34)' : ''};
        transition: ${props => (!props.active) ? 'all 0.5s ease-in' : ''};
    }    
    pointer-events: ${props => (props.disable && !props.drawingBtn) ? 'none' : ''};
    border: ${props => (props.disable && !props.drawingBtn) ? '2px solid rgb(76,176,176)'  : '2px solid rgb(117,252,252)'};
    background: ${props => (props.disable && !props.drawingBtn) ? 'rgba(26,34,34, 0.5)' : (props.active) ? '#fff' : 'rgba(0,190,190, 0.5)'};
    color: ${props => (props.disable && !props.drawingBtn) ? 'rgb(76, 176, 176)' : (props.active) ? '#000' : '#fff'};
`

@connect((store) => {
  return {
    buttonCmds: store.buttonCmds
  }
})

class Grid extends React.Component {
  constructor() {
    super();
    this.pause = this.pause.bind(this)
    this.draw = this.draw.bind(this)
    this.big = this.big.bind(this)
    this.guid = this.guid.bind(this)
    this.eater = this.eater.bind(this)
    this.glider = this.glider.bind(this)
    this.tapestry = this.tapestry.bind(this)
    this.pentomino = this.pentomino.bind(this)
    this.start = this.start.bind(this)
    this.clear = this.clear.bind(this)

/*

    this.fps = this.fps.bind(this)
*/    
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  guid() {
    return (this.s4()+this.s4()+this.s4()).substring(0,11);
  }

  start() {
    gameActions.startGame(true)
    gameActions.clearBoard(false)
    gameActions.pattern({pattern: undefined, requestId: this.guid() })
    gameActions.pauseGame(false)
    //gameActions.bigBoard(false)
  }

  big() {  
    gameActions.clearBoard(true);
    gameActions.bigBoard(!this.props.buttonCmds.big)
  }  

  pause() {
    gameActions.clearBoard(false)
    gameActions.startGame(false)
    gameActions.pauseGame(!this.props.buttonCmds.pause)
    //gameActions.bigBoard(false)
  }

  draw() {    
    if (!this.props.buttonCmds.draw) {
      gameActions.clearBoard(true)
    } else gameActions.clearBoard(false)

    gameActions.pattern({pattern: undefined, requestId: this.guid() })
    gameActions.draw(!this.props.buttonCmds.draw)
    //gameActions.bigBoard(false)
  }

  clear() {
    gameActions.clearBoard(true)
    gameActions.pattern({pattern: undefined, requestId: this.guid() })
    gameActions.pauseGame(false)
    gameActions.startGame(false)
    //gameActions.bigBoard(false)
  }

  fps(frameRate) { 
    gameActions.clearBoard(false)
    gameActions.fps(frameRate)
    gameActions.startGame(false)
    //gameActions.bigBoard(false)
  }

  glider() {
    gameActions.startGame(true)
    gameActions.clearBoard(true)
    gameActions.pattern({pattern: 'GLIDER_FACTORY', requestId: this.guid() })
    //gameActions.bigBoard(false)
  }

  eater() {
    gameActions.startGame(true)
    gameActions.clearBoard(true)
    gameActions.pattern({pattern: 'CELL_EATER', requestId: this.guid() })
    //gameActions.bigBoard(false)
  }

  tapestry() {    
    gameActions.startGame(true)
    gameActions.clearBoard(true)
    gameActions.pattern({pattern: 'TAPESTRY', requestId: this.guid() })
    //gameActions.bigBoard(false)
  }

  pentomino() {    
    gameActions.startGame(true)
    gameActions.clearBoard(true)
    gameActions.pattern({pattern: 'PENTOMINO', requestId: this.guid() })
    //gameActions.bigBoard(false)
  }

  render() {
    const { start, pause, clear, draw, big, fps, pattern, requestId }  = this.props.buttonCmds
    return (      
        <div>
          <P5Wrapper sketch={game} 
              started={start}
              paused={pause}
              cleared={clear}
              frameRate={fps}
              pattern={pattern}
              requestId={requestId}
              draw={draw}
              big={big}
              />
          <GameBtn disable={draw} active={start && !pattern} onClick={this.start}>START</GameBtn>
          <GameBtn disable={draw} active={pause} onClick={this.pause}>{(pause) ? 'CONTINUE' : 'PAUSE' }</GameBtn>
          <GameBtn drawingBtn active={clear && !draw && !pattern && !big} onClick={this.clear}>CLEAR</GameBtn>
          <GameBtn drawingBtn active={draw} onClick={this.draw}>{(draw) ? 'ACTION!' : 'DRAW' }</GameBtn>
          <GameBtn drawingBtn active={pattern=='GLIDER_FACTORY' && !draw} onClick={this.glider}>GLIDER GUN</GameBtn>
          <GameBtn drawingBtn active={pattern=='CELL_EATER' && !draw} onClick={this.draw} onClick={this.eater}>CELL EATER</GameBtn>
          <GameBtn drawingBtn active={pattern=='TAPESTRY' && !draw} onClick={this.draw} onClick={this.tapestry}>TAPESTRY</GameBtn>
          <GameBtn drawingBtn active={pattern=='PENTOMINO' && !draw} onClick={this.draw} onClick={this.pentomino}>PENTOMINO</GameBtn>
          <GameBtn disable={draw} active={fps==speed.slow} onClick={this.draw} onClick={() => { this.fps(speed.slow) }}>Slow ({speed.slow} fps)</GameBtn>
          <GameBtn disable={draw} active={fps==speed.medium} onClick={this.draw} onClick={() => { this.fps(speed.medium) }}>Med ({speed.medium} fps)</GameBtn>
          <GameBtn disable={draw} active={fps==speed.fast} onClick={this.draw} onClick={() => { this.fps(speed.fast) }}>Fast ({speed.fast} fps)</GameBtn>
          <GameBtn disable={draw} active={big} onClick={this.big}>{(big) ? 'SMALL' : 'BIG'}</GameBtn>  

          <Stats />
        </div>
    )
  }
}

export default Grid