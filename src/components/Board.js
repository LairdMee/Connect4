import React from 'react';
import Square from './Square';

const COLUMNS = 7;
const ROWS = 6;

class Board extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        squares: Array(ROWS).fill(Array(COLUMNS).fill('white')),
        // initialized: false,
        turn: 'red',
        winner: false
      
      }
      // this.initializeGrid();
    }

    componentDidUpdate(prevProps) {
      // when we go from restart of false to restart of true then we reset the board
      if (!prevProps.restart && this.props.restart) {
        this.initializeGrid()
      }
    }

    initializeGrid = () => {
      const grid = Array(ROWS).fill(Array(COLUMNS).fill('white'));
      // for (let i=0; i < ROWS; i++) {
      //     grid.push(Array(COLUMNS).fill('white'));
      // }

      this.setState({squares: grid});
    }

  validColumn(col, grid) {
    // if (grid[0][col] !== 'white') {
    //   return -1; // when column is full, -1 is the indicator
    // } else {
    //   // If top row is not taken, loop through column to find lowest row available 
    //   for (let i=5; i>=0; i--) {
    //     if (grid[i][col] === 'white') {
    //       return i // all i means row
    //     }
    //   }
    // }
    
    for (let row=5; row>=0; row--) {
      if (grid[row][col] === 'white') {
        return row 
      }
    }
    return -1;

  }

  checkGameOver(squares){

    // horizontal connect 4 check
    for(let i=0;i<ROWS; i++) {
      for(let j=0; j<COLUMNS-3; j++) {
        if(squares[i][j] !== "white" && squares[i][j]===squares[i][j+1] && squares[i][j+1]===squares[i][j+2] && squares[i][j+2]===[squares[i][j+3]]) {
          this.props.gameOver();
        }
      }
    }
      // vertical connect 4 check
    for(let j=0;j<COLUMNS;j++) {
      for(let i=0;i<ROWS-3;i++) {
        if(squares[i][j] !== "white" && squares[i][j] === squares[i+1][j] && squares[i+1][j] === squares[i+2][j] && squares[i+2][j] === squares[i+3][j]) {
          this.props.gameOver();
        }
      }
    }

    // negative slope diagonal 
    for(let i=0; i < ROWS - 3; i++) {
      for(let j=0; j < COLUMNS - 3; j++) {
        if(squares[i][j] !== "white" && squares[i][j] === squares[i+1][j+1] && squares[i+1][j+1] === squares[i+2][j+2] && squares[i+2][j+2] === squares[i+3][j+3]) {
          this.props.gameOver();
        }
      }
    }
    //positive slope diagonal
    for (let i = ROWS-3; i < ROWS; i++) {
      for (let j=0;j<COLUMNS-3;j++) {
        if (squares[i][j] !== "white" && squares[i][j] === squares[i-1][j+1] && squares[i-1][j+1] === squares[i-2][j+2] && squares[i-2][j+2] === squares[i-3][j+3]) {
          this.props.gameOver();
        }
      }
    }
  }

  handleCellChange(col) {
    console.log('Column clicked: ', col)
    // const updatedSquares = [...this.state.squares];
    const updatedSquares = [];

    // make deep copy
    this.state.squares.forEach(row => {
      updatedSquares.push([...row]);
    });
    // Find next available cell 
    const row = this.validColumn(col, updatedSquares);
    if (row === -1) {
      return;
    }

    // : find the row to place the token in (bottomost row in the column)
    updatedSquares[row][col] = this.state.turn;
    this.setState({squares: updatedSquares});
    this.checkGameOver(updatedSquares);
    this.flipTurn();
  }

  flipTurn() {
    this.state.turn === 'red' ? this.setState({turn: 'yellow'}) : this.setState({turn: 'red'});
  }

    
  // onClick={() => this.handleCellChange(rowIndex, colIndex)}
  render() {
    return (
      <div className="board">
        {
          this.state.squares.map((row, rowIndex) => {
            return row.map((cellColor, colIndex) => {
              return <Square
                key={rowIndex * 6 + colIndex + rowIndex}
                color={cellColor}
                handleChange={() => this.handleCellChange(colIndex)}
              />
            })
          })
        }
        
      </div>
    )
  }
}

export default Board;                                                




    
    /* // onClick={() => this.handleCellChange(rowIndex, colIndex)}
    render() {
      return (
        <div className="board">
          {
            this.state.squares.map((row, rowIndex) => {
              return row.map((cellColor, colIndex) => {
                return <Square
                  key={rowIndex * 6 + colIndex + rowIndex}
                  color={cellColor}
                  handleChange={() => this.handleCellChange(rowIndex,colIndex)}
                />
              })
            })
          }
        </div>
    )
  }
}

export default Board;                    */                             
 
// to do: one loop to check 4 connected in a row, so the loop goes up to 4 here
// a check for verticals and for diagonals
// the top left cell is called index 0 in the first row, then index 1. then index 2, index 3.
// same with the columns to do the check - up to 3 bec dont have a 4th