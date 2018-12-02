import React from 'react';
import Square from './square';

// Board
// 3. rewrite Board to use two loops to output squares


class Board extends React.Component {

    // - Board recieves squares and onClick props from Game
    renderSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        )
    };

    // create a render function that will be called later with return
    // - this takes in rows and columns as arguments
    renderBoard(rows, cols) {

        // board is an empty array
        const board = [];
        // create a counter;
        let counter = 0;

        // process rows in outer loop
        for (let i = 0; i < rows; i++) {

            // columns = empty array
            const columns = [];
            for (let c = 0; c < cols; c++) {
                // render individual squares using counter
                columns.push(this.renderSquare(counter++));
            }

            // push squares (in columns), with the above columns after the squares have been created:
            // - do this in the JSX React way - no quotations etc
            board.push(<div key={i} className="board-row">{columns}</div>);
        }

        return board;
    }


    // render the final result with a return statement:
    render() {

        // - render the board with 3 rows and 3 columns
        return  (
            <div>
                {this.renderBoard(3, 3)}
            </div>
        );
    }
}

export default Board;