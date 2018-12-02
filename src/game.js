import React from 'react';
import Board from './board';


// use the move index to return a string of row and column number
// - attach this to currentLocation - under history in Game state
const squareLocation = index => {
    const locationIndex = {
        0: 'row: 1, col: 1',
        1: 'row: 1, col: 2',
        2: 'row: 1, col: 3',
        3: 'row: 2, col: 1',
        4: 'row: 2, col: 2',
        5: 'row: 2, col: 3',
        6: 'row: 3, col: 1',
        7: 'row: 3, col: 2',
        8: 'row: 3, col: 3',
    }
    return locationIndex[index];
}







// Game Component
// - this contains the history state - track history of moves
// - Board recieves squares and onClick props from Game
class Game extends React.Component {

    
    // store history of moves
    // - set up initial state with this:
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0, // first step in history = 0
          xIsNext: true,
        };
    }


    // handleClick previously in Board component. handle clicks from squares:
    handleClick(i) {
        // before time travel, was 'this.state.history'
        // - now keeps track with stepNumber
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // return early if someone has won the game
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        // set item to X or O, according to state
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        
        // set state on board
        // - stepNumber and xIsNext get overwritten
        // - history is an array that gets added to after each move
        this.setState({
            // - concat copies the previous array
            // - squares = matrix of moves. X, 0 and null
            // - currentLocation passes square index (i) into squareLocation(), to get row, col string
            history: history.concat([
                {
                    squares: squares,
                    currentLocation: squareLocation(i),
                }
            ]),
            stepNumber : history.length, // keep track of stepNumber after each click
            xIsNext : !this.state.xIsNext,
        }); 
    }



    // jumpTo method - for history / time travel
    jumpTo(step) {
        this.setState({
            stepNumber: step, // reflects the move currently displayed to the user
            xIsNext: (step % 2) === 0, // if step number is even, xIsNext = true
        })
    }


    
    // render Game component
    render() {
        // history
        // - used to calculate winner
        const history = this.state.history;
        // before time travel, was history[history.length - 1]
        // - now renders currently selected move according to stepNumber
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        // map over moves
        // - if there is a move, go to the move, else start over
        // - step=index, move=value?
        const moves = history.map((step, move) => {
            
            // 1. location on board of the move - move history list: cols, rows
            const currentLocation = step.currentLocation ? ` (${step.currentLocation})` : '';



            // get the square index of clicked item
            // - Board props
            // console.log(current.squares);
            // console.log(this.state);
            // console.log(history);

            const desc = move ? 'Go to move # ' + move +  currentLocation : 'Go to game start';
            // for each move create an li, with the above text to go to each move
            // - run jumpTo on each
            // - use move index as key

            // 2. current move css class
            // - className={history.length-1 === move ? "current" : ''}
            return (
                <li key={move} className={history.length-1 === move ? "current" : ''}>
                    <button onClick={ () => this.jumpTo(move)}>{desc}</button>
                </li>
            );

        });
        
        // board shows state of the game from history
        // status shows the winner
        return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                {/* add time travel - view history of moves in a game */}
                <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}






// calculate winner function
// - this is displayed in the board's render function
function calculateWinner(squares) {
    // each array represents a winning set of squares by index
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}


export default Game;