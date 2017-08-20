export default function game (p) {

var started = false;
var paused = false;
var columns;
var rows;
var board;
var cnv;
//var maxCycles = 5000;

class Cell { 
  constructor(col,row,w=10) {
    this.col = col;
    this.row = row;
    this.w = w;
    this.state = 0;
    this.previous = 0;
  }
  newstate(s) {
    this.previous = this.state;
    this.state = s;   
  }
  initialState(s) {
    this.previous = this.state = s;   
  }
  display() {
    const { col, row, w, state, previous } = this

    //console.log(`display: r:${col} c:${row} rect(${col*w},${row*w},${w-1},${w-1})`);

    if (previous == 0 && state == 1) p.fill(255,186,118) //baby born
    else if(state == 1) p.fill(255,127,0) //survivor
    else if(previous == 1 && state == 0)  p.fill(26,34,34) //death
    else p.fill(21,32,32); //none   

    p.strokeWeight(.3);
    p.stroke(176);

    p.rect(row*w, col*w, w-1, w-1);
  }

}

  p.setup = function () { 
    p.createCanvas(600, 350);
    var w = 10;
    columns = Math.floor(screen.width/w);
    rows = Math.floor(screen.height/w);

    board = new Array(rows);
    for (var i = 0; i < board.length; i++) {
      board[i] = new Array(columns);
    } 

    for (var x = 0; x<rows; x++) {
      for (var y = 0; y<columns; y++) {
        board[x][y] = new Cell(x,y)
      }
    }

    init();     
  }
 
  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    started = (!started) ? props.started : true;  
    paused = props.paused;  
    p.frameRate( props.frameRate );
    if (props.cleared) {      
      clearBoard();
    }
    if (props.started) {
      init();
    }
  }

  p.draw = function () {   
    if (!started) return;
    if (paused) return;
    //maxCycles --;
    //if (maxCycles<0) return;
    p.background(21,32,32);    
    generate();

    for ( var x = 0; x < rows; x++) {
      for ( var y = 0; y < columns; y++) {      
        board[x][y].display();
      }
    }

    setPreviousState();

  }

  function clearBoard() {
    init(true);
  }

  function init(clear=false) {       
    //maxCycles=5000;
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        // Lining the edges with 0s
        if (i == 0 || j == 0 || i == rows-1 || j == columns-1) board[i][j].newstate(0);
        // Filling the rest randomly
        else if (!clear) board[i][j].initialState( getRandomInt(0,2) );
        else   board[i][j].initialState( 0 );
      }
    }
    //console.log('init: board pattern state:',flatten(board));
  }
  function flatten(ar,prop='state') {
    return (
      ar.reduce((a,b) => a.concat(b)).map((el)=>el[prop]).join('').replace(/,/g,''));
  }

  function generate() { 
    for (var x = 1; x < rows - 1; x++) {
      for (var y = 1; y < columns - 1; y++) {
        var neighbors = 0
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {

            neighbors += (i==0 && j==0) ? 0 : board[x+i][y+j].previous; 

          }
        }
        
        if      ((board[x][y].state == 1) && (neighbors < 2)) board[x][y].newstate(0); //isolation
        else if ((board[x][y].state == 1) && (neighbors > 3)) board[x][y].newstate(0); //overpopulation
        else if ((board[x][y].state == 0) && (neighbors == 3)) board[x][y].newstate(1); //baby born
/*
        if (maxCycles==1) {
          //console.log('generated:', neighbors,`(${x},${y}) -> prev/state:`,board[x][y].previous,board[x][y].state );
        }
*/
      }
    } 
  }

  function setPreviousState() {
    for (var x = 1; x < rows - 1; x++) {
      for (var y = 1; y < columns - 1; y++) { 
        board[x][y].newstate( board[x][y].state );
      }
    }
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


}