// Square component
import React from 'react';

// - save to a variable so it can be exported
const Square = props =>  {
    return (
        <button className="square" onClick={props.onClick}>
        {props.value}
        </button>
    );
}

export default Square;