
var columns;
var rows;
var board;
var cnv;
var maxCycles = 500;

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

  	if (previous == 0 && state == 1) fill(255,186,118) //baby born
    else if(state == 1) fill(255,127,0) //survivor
    else if(previous == 1 && state == 0)  fill(26,34,34) //death
    else fill(36,52,52); //none		

		strokeWeight(.3);
		stroke(176);

   	rect(row*w, col*w, w-1, w-1);
  }

}

function setup() {
	console.warn('setup()');
  createCanvas(600, 350);
  //cnv.parent('sketch-holder');//relocate the canvas to its div destination

	//center cnv
	/* 
	var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(15, 20);
  */

  var w = 10;
  columns = floor(width/w);
  rows = floor(height/w);

  console.log('cols/rows', columns,rows);

  board = new Array(rows);
  for (var i = 0; i < board.length; i++) {
    board[i] = new Array(columns);
  } 

	for (var x = 0; x<rows; x++) {
		for (var y = 0; y<columns; y++) {
	  	board[x][y] = new Cell(x,y)
	  }
	}

	frameRate(7); // Thirty frames each second
	init();  
}

// Fill board randomly
function init() {
	console.log('init()');
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == rows-1 || j == columns-1) board[i][j].newstate(0);
      // Filling the rest randomly
      else board[i][j].initialState( floor(random(2)) );
    }
  }
  console.log('init: board pattern state:',flatten(board));
  //console.log('init: board pattern previous:',flatten(board,'previous'));
  //console.log(board);
}

function flatten(ar,prop='state') {
	return (
		ar.reduce((a,b) => a.concat(b)).map((el)=>el[prop]).join('').replace(/,/g,''));
}


function draw() {
	maxCycles --;
	if (maxCycles<0) return;
  background(36,52,52);  
  generate();
  
  for ( var x = 0; x < rows; x++) {
    for ( var y = 0; y < columns; y++) {    	
      board[x][y].display();
    }
  }

  setPreviousState();
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
			
			if 			((board[x][y].state == 1) && (neighbors < 2))	board[x][y].newstate(0); //isolation
			else if ((board[x][y].state == 1) && (neighbors > 3)) board[x][y].newstate(0); //overpopulation
			else if ((board[x][y].state == 0) && (neighbors == 3)) board[x][y].newstate(1); //baby born

			if (maxCycles==1) {
				//console.log('generated:', neighbors,`(${x},${y}) -> prev/state:`,board[x][y].previous,board[x][y].state );
			}

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

// reset board when mouse is pressed
function mousePressed() {
 init();
 /* 
  var locations = new Array(5);
  var myGlider = new PatternCollection();  
  var patternData = myGlider.glider1.data.split('');
  var idx=0;
  locations = 
  	findInjectionArea(board, columns, rows, locations.length, myGlider.glider1);
  for (var i in locations) {
  	console.log('typeof locations[i].col:',typeof locations[i].col);
  	if (typeof locations[i].col == 'number') {
  		for (var r = locations[i].row; r<locations[i].row+myGlider.glider1.size.rows; r++) {
  			for (var c = locations[i].col; c<locations[i].col+myGlider.glider1.size.cols; c++) {  				
  				board[r][c].initialState(patternData[idx]);  				
  				idx++;
  			}
  		}
  	}
  }
  console.warn('mousePressed:', flatten(board));  
  init(true);
  console.log('post init     :', flatten(board));
	console.log('post init prev:', flatten(board,'previous'));
	*/
}

//Search a 3x3 empty area using a variant of the Moore Neighbor Tracing Algorithm
//http://www.imageprocessingplace.com/downloads_V3/root_downloads/tutorials/contour_tracing_Abeer_George_Ghuneim/ray.html
function findInjectionArea(board,cols,rows,howMany,pattern)  {
	console.warn('findInjectionArea', cols,rows,howMany,pattern);
	//TODO: check if game is IDLE to perform this operations	
	var counter = 0;
	var locations = new Array(howMany);	

	while (counter < howMany) {
		var myCol = floor(random(cols));
		var myRow = floor(random(rows));
		var result = enoughArea(board,cols,rows,myCol,myRow,pattern)

		console.log('counter:',counter, 'myCol:',myCol,'myRow:',myRow, result);

		if (result) {			
			locations[counter] = {col: myCol, row: myRow };
			counter++;
		}
	}
	console.log('locations',locations);

	return locations;	
}

function enoughArea(board,colsBoard,rowsBoard,myCol,myRow,pattern) {
	console.warn('enoughArea');
	const gutter = 2;
	const { cols, rows } = pattern.size;

	if ( myCol+(cols-1)+gutter > colsBoard-1 ) return false; //not enough space
	if ( myRow+(rows-1)+gutter > rowsBoard-1 ) return false; //not enough space
	for ( var r=myRow; r<myRow+gutter+rows; r++) {
		for ( var c=myCol; c<myCol+gutter+cols; c++) {
			if (board[r][c] === 1) return false;
		}
	}
	return true;
}