# React Tutorial - with all the trimmings :poultry_leg:

![React Logo](https://media2.giphy.com/media/xT5LMX2k4tFcGaKcP6/giphy.gif?cid=3640f6095c044b474e66627749b03562)
> I wonder if Zukerberg has received cease and desist letters from Matt Groening...

My first foray into learning React, [following the Tutorial](https://reactjs.org/tutorial/tutorial.html), and then attempting to do the [six extra bits](https://reactjs.org/tutorial/tutorial.html#wrapping-up):

1. ~~Display the location for each move in the format (col, row) in the move history list.~~
2. ~~Bold the currently selected item in the move list.~~
3. ~~Rewrite Board to use two loops to make the squares instead of hardcoding them.~~
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.


## To get going:
1. clone the repo
2. `npm install` - probably
3. `npm start` and open [http://localhost:3000](http://localhost:3000) in a browser
_not tried the following out (as of 2/12/2018)
4. `npm test` - [more info on testing here](https://facebook.github.io/create-react-app/docs/running-tests)
5. `npm run build` - [bundle for production or whatever](https://facebook.github.io/create-react-app/docs/deployment)


### My Method:
- Go for the smaller challenges first. For example, I started off with **number 2** above, adding a ternary operator to add a classname to bold the item. If the item isn't the current move, an empty class will be left, however.
- Some trial and error, for example using if statements in JSX not working, which resulted in Googling 'JSX fundamentals' and suchlike.
- Get part of the way there, then result to [cheating](https://github.com/guar47/react-tutorial-tic-tac-toe/tree/master/src), but understanding the code, and making good notes at least.


### Resources that may or may not help:
- [FreeCodeCamp article](https://medium.freecodecamp.org/all-the-fundamental-react-js-concepts-jammed-into-this-single-medium-article-c83f9b53eac2)
- [DWYL article](https://github.com/dwyl/learn-react)

---

### Lessons Learnt:
1. Use React Chrome Dev Tools, but also check the terminal for compilation errors
2. The flow of information is always upward - from small components (Square) to large ones (Game)
3. There is an emphasis on _always_ creating copies of data, never references, so that data is immutable, and copes can be compared in order to update the document's **state**. This manifests itself in the use of _slice()_ _concat()_, and _map()_.
4. When splitting components up into separate files, you can **export** function expressions and classes, e.g.
**Exporting** Components:
```
javascript
class Board extends React.Component {
    // code here
}
export default Board;
```

```
javascript
const Square = props =>  {
    // code here
}
export default Square;
```

**Importing** Components:
```
javascript
import React from 'react';
import Square from './square';
```

5. Writing html in JSX can be problematic. All components must be closed, for example, when trying to implement point 3, I did something like this to create rows. **This is invalid**:
```
javascript
return (
    </div><div key={i} className="board-row">
);
```
**To remind myself, this also relates to the empty class attribute on the current item in the move list**

6. All [components have to have keys](https://reactjs.org/docs/lists-and-keys.html#keys) to help React to identify what has changed. For example, in board.js:
```
javascript
board.push(<div key={i} className="board-row">{columns}</div>);
```

7. There are no tests included. The [DWYL article](https://github.com/dwyl/learn-react) may be a good resource to find out about testing React with Jest.