import React from 'react'
import PropTypes from 'prop-types' //https://github.com/facebook/prop-types#prop-types
import P5Wrapper from 'react-p5-wrapper'
import game from './game'
import { connect } from 'react-redux'
import gameActions from '../actions/gameActions'
import Stats from './stats'
import styled from 'styled-components'
 
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
    margin-bottom: 17px;
    margin-right: 7px;
    padding: 3px;
    width: 80%;
    max-width: 90px;
    height: 40px;
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
    background: ${props => (props.disable && !props.drawingBtn) ? 'rgba(26,34,34, 0.2)' : (props.active) ? '#fff' : 'rgba(0,190,190, 0.2)'};
    color: ${props => (props.disable && !props.drawingBtn) ? 'rgb(76, 176, 176)' : (props.active) ? '#000' : '#fff'};
    -webkit-box-shadow: 8px 8px 5px 2px rgba(7,14,14,0.67);
    -moz-box-shadow: 8px 8px 5px 2px rgba(7,14,14,0.67);
    box-shadow: 8px 8px 5px 2px rgba(7,14,14,0.67);
    :active {
      background: #fff;
      transition: all 0.1s ease-in-out;
    }
`

const Left = styled.div`
    margin-left: 50px;
    margin-top: 20px;
    float: left;
    width: 600px;
    height: 400px;
    border: 5px solid rgb(39, 138, 138);
    margin-right: 20px;
    -webkit-box-shadow: 8px 8px 5px 5px rgba(7,14,14,0.67);
    -moz-box-shadow: 8px 8px 5px 5px rgba(7,14,14,0.67);
    box-shadow: 8px 8px 5px 5px rgba(7,14,14,0.67);
`
const Right = styled.div`
  float: Left;
  line-height: 40px;
  margin-top: 18px;
  margin-left: 50px;
  width: 250px;
  @media (max-width:990px) and (min-width:700px) {    
    width: 650px;
    margin-left: 70px;    
  }  
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
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  //A unique ID is neccesary since to force a state change:
  guid() {
    return (this.s4()+this.s4()+this.s4()).substring(0,11);
  }

  start() {
   gameActions.startGame(
      { start:true, clear:false, 
        pattern:undefined, requestId:this.guid(), pause:false})
  }

  big() {  
    gameActions.bigBoard({start:true, clear:true, big:!this.props.buttonCmds.big})
  }  

  pause() {
    gameActions.pauseGame({clear:false, start:false, pause:!this.props.buttonCmds.pause})
  }

  draw() {
    var { draw } = this.props.buttonCmds

    if (!this.props.buttonCmds.draw) {
      gameActions.draw({clear:true, pattern:undefined, requestId:this.guid(), draw:!draw})
    } else {
        gameActions.draw({clear:false, pattern:undefined, requestId:this.guid(), draw:!draw})
    }
  }

  clear() {
   gameActions.clearBoard(
      { clear:true, pattern:undefined, 
        requestId:this.guid(), pause:false, start:false})
  }

  fps(frameRate) {
    gameActions.fps({fps:frameRate, clear:false, start:false})
  }

  glider() {
    gameActions.pattern(
        { start:true, clear:true, 
          pattern:'GLIDER_FACTORY', requestId:this.guid() })
  }

  eater() {
    gameActions.pattern(
            { start:true, clear:true, 
              pattern:'CELL_EATER', requestId:this.guid() })    
  }

  tapestry() {
    gameActions.pattern(
            { start:true, clear:true, 
              pattern:'TAPESTRY', requestId:this.guid() })   
  }

  pentomino() {
    gameActions.pattern(
            { start:true, clear:true, 
              pattern:'PENTOMINO', requestId:this.guid() })   
  }

  render() {
    const { start, pause, clear, draw, big, fps, pattern, requestId }  = this.props.buttonCmds
    return (      
        <div>
          <Left>
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
          </Left>
          <Right>
            <GameBtn disable={draw} onClick={this.start}>START</GameBtn>
            <GameBtn disable={draw} active={pause} onClick={this.pause}>{(pause) ? 'CONTINUE' : 'PAUSE' }</GameBtn>
            <GameBtn drawingBtn onClick={this.clear}>CLEAR</GameBtn>
            <GameBtn drawingBtn active={draw} onClick={this.draw}>{(draw) ? 'ACTION!' : 'DRAW' }</GameBtn>
            <GameBtn drawingBtn active={pattern=='GLIDER_FACTORY' && !draw} onClick={this.glider}>GLIDER GUN</GameBtn>
            <GameBtn drawingBtn active={pattern=='CELL_EATER' && !draw} onClick={this.draw} onClick={this.eater}>CELL EATER</GameBtn>
            <GameBtn drawingBtn active={pattern=='TAPESTRY' && !draw} onClick={this.draw} onClick={this.tapestry}>TAPESTRY</GameBtn>
            <GameBtn drawingBtn active={pattern=='PENTOMINO' && !draw} onClick={this.draw} onClick={this.pentomino}>PENTOMINO</GameBtn>
            <GameBtn disable={draw} active={fps==speed.slow} onClick={this.draw} onClick={() => { this.fps(speed.slow) }}>SLOW</GameBtn>
            <GameBtn disable={draw} active={fps==speed.medium} onClick={this.draw} onClick={() => { this.fps(speed.medium) }}>MEDIUM</GameBtn>
            <GameBtn disable={draw} active={fps==speed.fast} onClick={this.draw} onClick={() => { this.fps(speed.fast) }}>FAST</GameBtn>
            <GameBtn disable={draw} active={big} onClick={this.big}>{(big) ? 'BIG CELLS' : 'TINY CELLS'}</GameBtn>
            <Stats />
          </Right>        
        </div>
    )
  }
}

export default Grid