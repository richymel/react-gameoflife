## react-gameoflife
John Conway's Cellular Automaton aka. Game of Life
#### FreeCodeCamp <img src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/freecodecamp.svg" width="20" height="20"> 305 Challenge 
###### by  : RichyMel. Written in 2017.08.15 - 27
***
### Play with the react-gameoflife: [here](https://react-gameoflife.herokuapp.com/)
***
### Assets and 3rd party components:

- [Styled Components](https://github.com/styled-components)  by: @glenmaddern, @mxstbr, @_philpl‬ [website](https://www.styled-components.com/)
- Graphics engine by [P5.js](https://p5js.org/) created by Lauren McCarthy developed by a community of collaborators with support from the Processing Foundation and NYU ITP.
- [React p5 wrapper](https://www.npmjs.com/package/react-p5-wrapper) lets you integrate p5 Sketches into your React App 
- [P5js](https://www.npmjs.com/package/p5) for react: is a fundamental react-p5-wrapper dependency.
***
### Game of life foundation:
- Cellular Automata by Daniel Shiffman [The Nature of Code](http://natureofcode.com/book/chapter-7-cellular-automata/)
- [A discussion of the game of life.](http://web.stanford.edu/~cdebs/GameOfLife/)
***
### Extra reference used for this project:
- The infamous loop problem (closures) [Robert Nyman](https://robertnyman.com/2008/10/09/explaining-javascript-scope-and-closures/)
- [The R-Pentomino Pattern](https://www.youtube.com/watch?v=bTPN3spiq1I)
- The game of life - The Nature of Code: The Coding Train. Excellent [tutorial](https://www.youtube.com/watch?v=tENSCEO-LEc) about Conway's Game of Life. 
- [pmav.eu the javascript Game of Life v3.1.1](http://pmav.eu/)
- [P5.js online reference](https://p5js.org/reference/)
- P5.js [tutorial](https://www.youtube.com/watch?v=DEHsr4XicN8), The Coding Train. (Mouse interaction)
- Review and research I did about the CSS tools available for React before I hit Styled-Components!
    - <https://survivejs.com/react/advanced-techniques/styling-react/>
    - <https://github.com/css-modules/css-modules>
    - <https://glenmaddern.com/articles/css-modules>
    - <https://css-modules.github.io/webpack-demo/>
    - Glen Maddern - [Styling React Apps with Styled Components](https://www.youtube.com/watch?v=qu4U7lwZTRI&t=81s)
    - Max Stoiber The road to styled-components: CSS in component-based systems - [Max Stoiber, React London 2017](https://www.youtube.com/watch?v=2j9rSur_mnk)
***
### Useful tools that helped with the look and feel of the React Redux app I built:

- <https://www.cssmatic.com/box-shadow>
- Fountain font by: [Behance](https://befonts.com/download/fountain)  
- [Online ttf to woof converter](https://everythingfonts.com/ttf-to-woff)
- Background pattern: [Pattern Cooler by Harvey Rayner](https://patterncooler.com/)
***
### NB. **About specific versions and performance issues:**
>The modification to this project's package json has to do with:
>- React-P5-wrapper specific peer package version dependencies
>- P5@0.5.14 incorporated changes that affect the performance considerably. So the SEM versioning is frozen @0.5.12 specifically in package.json preventing any patch releases (**^**0.5.12 in previous package.json was effectively allowing installation of any later *patch release* and thus causing the performance issue).
>- In oder to ensure that developers get the exact (node_modules) tree that was generated for this project such that when developers subsequently run **`npm i`** | **`npm install`** are able to generate identical trees *(regardless of intermediate dependency updates)*: Using npm **5.3.0** (most current) as of this writing generated a comprehensive **package.lock.json** file. (cf.[package.lock.json | npm Documentation](https://docs.npmjs.com/files/package-lock.json)).
>- Packages that were frozen to a specific version in package.json are:
    - P5, 
    - react, 
    - react-dom, 
    - react-p5-wrapper, 
    - react-redux, 
    - redux,
    - redux-logger 
    
### Final notes:
>- It was challenging building the **object-oriented cell component** of the game board, and synchronizing the internal state of the game with the Redux Store. Since the p5js graphics component is a standalone React component with its own graphics workflow cycle.
>- It was a real pleasure to have found the **styled-components** for React, the idea behind styling as a component itself with locally scoped css is more coherent with React and the component oriented paradigm. Therefore I found this component to be 100% relevant to the idea of building self contained React components, for the CSS purists it also allows to inject global styles. I particularly enjoyed the power of mixing javascript code inside the CSS definition (all we ever wanted... logic inside CSS! that is very clever). Finally, I did not have to learn yet another CSS coding scheme just good old CSS plus the component leverages the power of JavaScript.

##### Sample code extract, using styled components:

```javascript
{
    &:hover {
       background: ${props => (!props.active) ? 'rgb(176, 176, 176)' : ''};
        color: ${props =>  (!props.active) ? 'rgb(26,34,34)' : ''};
        transition: ${props => (!props.active) ? 'all 0.5s ease-in' : ''};
    }
    pointer-events: ${props => (props.disable && !props.drawingBtn) ? 'none' : ''};
    border: ${props => (props.disable && !props.drawingBtn) ? '2px solid rgb(76,176,176)'  : '2px solid rgb(117,252,252)'};
}
```
