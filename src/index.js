// import stuff
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// __________________________
// split up file into separate components:
// Game <- Board <- Square
import Game from './game';



// view this at: http://localhost:3000/
// npm start in terminal in project folder to run

// a little bit of a git history here, should have done it form the start
// - does show the past hisotry of moves before and after, could be worth checking out


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



// TIME TRAVEL /SHOWING PAST MOVES
// https://reactjs.org/tutorial/tutorial.html#showing-the-past-moves
// - use map()
// - keep track of components in between state changes with keys
// - recommended to assign proper keys when building dynamic lists
//  - if proper keys not assigned, uses array index by default
//  - keys only need to be unique between components and siblings
// - stepNumber: 0, in Game constructor










// __________
/* extra bits:

4- Add a toggle button that lets you sort the moves in either ascending or descending order.
5- When someone wins, highlight the three squares that caused the win.
6- When no one wins, display a message about the result being a draw



DONE:
1- Display the location for each move in the format (col, row) in the move history list.
2- Bold the currently selected item in the move list.
    - if stepNumber = key
3- Rewrite Board to use two loops to make the squares instead of hardcoding them.    
*/





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