import React from 'react'
import { connect } from 'react-redux'
import gameActions from '../actions/gameActions'
import styled from 'styled-components'
import { injectGlobal } from 'styled-components'
import Fountain from '../../assets/fonts/Fountain.woff'

injectGlobal`
  @font-face {
    font-family: "Fountain";
    src: url('${Fountain}') format("woff");
  }
`

const RichyMel = styled.h1`
  font-family: "Fountain";
  color: #fff;
  font-weight: normal;
  font-size: 1.5em;
  text-align: center;
  text-shadow: 8px 8px 2px rgba(7,14,14,0.67);
  margin-left: -60px;
  margin-top: -7px;
  @media (max-width:990px) and (min-width:700px) {
    margin-top: 2px;    
  }    
`

const Counter = styled.button`
  color: rgb(117,252,252);
  font-size: .7em;
  font-weight: bold;
  box-sizing: border-box;  
  padding: 3px;
  width: 187px;
  max-height: 25px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;  
  letter-spacing: 2px;  
  background: rgba(26,34,34, 0.7);
  -webkit-box-shadow: 8px 8px 5px 5px rgba(7,14,14,0.67);
  -moz-box-shadow: 8px 8px 5px 5px rgba(7,14,14,0.67);
  box-shadow: 8px 8px 5px 5px rgba(7,14,14,0.67);
  pointer-events: none;
  border: 2px solid rgb(117,252,252);
  margin-top: -50px;
  @media (max-width:990px) and (min-width:700px) {    
    margin-left: 200px;
    display:block;
    margin-top: 10px;    
  }    
`
 
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
      <div>      
        <Counter>
          GENERATIONS: {this.props.gameTally.generations}
        </Counter>
        <RichyMel>by&nbsp;&nbsp;&nbsp;RichyMel</RichyMel>
      </div>
    )
  }
}

export default Stats