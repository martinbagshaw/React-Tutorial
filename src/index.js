// import stuff
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// __________________________
// Taken from https://reactjs.org/tutorial/tutorial.html
// NOTES

// COMPONENTS
// - square put into board, which is put into game

// DEV TOOLS
// - last item on the right is react dev tools (once chrome extension is installed)

// STATE
// - better to maintain state higher up the DOM tree (i.e. in parent components)
// - code is easier to debug and manage this way
// - in the context of this game, it makes it possible to determine the winner


// FUNCTION COMPONENTS
// - a simpler way to write components that only have render methods
// - i.e. components that don't have (or inherit) their own state
// - don't have to worry about this keyword (see 2nd implementation of square)


// MUTATION
// - makes the time travel thing possible
// - basically copy all arrays, objects, etc, rather than referencing them (i.e. use immutable stuff)
// https://reactjs.org/tutorial/tutorial.html#adding-time-travel
// - slice() is used to create a new copy of the squares array after every move



// TIME TRAVEL / HISTORY
// - first implementation does not allow for time travel
// - also achieved by moving state controlled or whatever up to the next highest component, which is game
// Delete the constructor in Board.
// Replace this.state.squares[i] with this.props.squares[i] in Board’s renderSquare.
// Replace this.handleClick(i) with this.props.onClick(i) in Board’s renderSquare
// --- history bits in game components render method


// This shows how history (an array of objects represneting each move) will look:
// https://reactjs.org/tutorial/tutorial.html#adding-time-travel
// - question is which component should own the history state? - top level Game component will






// __________________________
// square - first implementation
// class Square extends React.Component {

//     // constructor initialises component state
//     constructor(props) {
//         super(props); // always do this in a subclass. I guess Square is a subclass cos its put into the below 3 classes
//         this.state = {
//             value : null,
//         };
//     }

//     render() {
        // {this.props.value} gives square number in html
        // {this.state.value} gives value from function in html
        // - can separate out lines to make more readable
        // - this.setState will update child components as well

        // first time (state set on each square):
        // return (
        //     <button
        //         className="square"
        //         onClick={ () => this.setState({value: 'X'}) }
        //     >
        //     {this.state.value}
        //     </button>
        // );

        // second time (state passed down from board)
        // - onClick listener on board instead
        // - square uses props to get value instead of state. Props passed down from board
//         return (
//             <button
//                 className="square"
//                 onClick={ () => this.props.onClick() }
//             >
//             {this.props.value}
//             </button>
//         );
//     }
// }

// square - second implementation
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
        {props.value}
        </button>
    );
}




// board
class Board extends React.Component {

    // constructor used to capture child component state
    // - create array of 9 nulls
    // - Array.fill = https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
    // - DELETED in history step
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares : Array(9).fill(null),
    //         xIsNext : true, // each time a move is made, this boolean will be flipped by handleClick() (x and o)
    //     }
    // }

    renderSquare(i) {
        // need to add value={i} for {this.props.value} in Square class to work
        // - this passes value from board to square
        // changed to use squares state (set in constructor above)
        // - uses onClick method here, instead of on individual squares
        // - 2 props passed down: value and onClick
        // changed to use squares props in step 3 - history
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }; // add semicolon here and above, not after JSX component
    // wrap JSX in ()


    // previously defined handleClick function in board component
    // handleClick(i) {
    //     // copy the array (after EVERY MOVE), rather than referencing it
    //     // - store a copy for the time travel / history thing
    //     // - this will be placed in the game component
    //     const squares = this.state.squares.slice();

    //     // return early if someone has won the game, or squares are already filled
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }

    //     squares[i] = this.state.xIsNext ? 'X' : 'O'; // set item to X or O, according to state
    //     // set state on board
    //     // - flip between x and o
    //     this.setState({
    //         squares : squares,
    //         xIsNext : !this.state.xIsNext,
    //     }); 
    // }


    // updated to use most recent history entry to determin the game's status
    render() {

        // old status (pre winner function)
        // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

         
        // moved to game:
        // winner function - pass in state of the squares to calculateWinner function
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = 'Winner: ' + winner;
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }



        // previously has this in render method:
        // <div className="status">{status}</div>
        return (
        <div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

// game
// - this contains the history state - track history of moves
class Game extends React.Component {

    // store history of moves
    // - set up initial state with this:
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          xIsNext: true,
        };
    }


    // previously in board component:
    // - uses 'current' more
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // return early if someone has won the game
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        // set item to X or O, according to state\
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // set state on board
        // - flip between x and o
        // - save history to state with concat - copies original array, makes it immutable
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            squares : squares,
            xIsNext : !this.state.xIsNext,
        }); 
    }


    render() {

        // history stuff
        // - moved from game component
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        

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
                <ol>{/* TODO */}</ol>
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


// ========================================



ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


// regular js needs to be added AFTER render function in order to work
// - probably want to do this a reacty way though
// - this is done above with:
// <button className="square" onClick={() => alert('click')}>



// const highLight = (e) => e.target.classList.toggle('highlight');
// const sqs = document.querySelectorAll('.square');
// sqs.forEach(sq => sq.addEventListener('click', highLight));
// console.log(sqs);