/* As our application grows, we'll need the components to 
 * scale with it. This means that we'll need to start breaking the 
 * implementation of components to prevent them from becoming too 
 * complex. The name of the game is to keep things simple */
/* In React, the array's map() method is used to transform a list 
 * of items into JSX by returning JSX for each item. Let's figure out 
 * how to do this in React. */

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },

  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const List = () => {
  /* Responsible for rending list components. */
  return (
    <ul>
      {list.map((item) => {
        return (
          <div>
            <p key={item.objectID}>{item.title}</p>
            <li key={item.objectID}><a href={item.url}>URL: {item.url}</a></li>
            <li key={item.objectID}>Author: {item.author}</li>
            <li key={item.objectID}>Number of comments: {item.num_comments}</li>
            <li key={item.objectID}>Points: {item.points}</li>
            <br />
          </div>
        );
      })}
    </ul>
  );
}

const Search = () => {
  /* Responsible for rending the search component */
  return (
    <div>
      <label htmlFor="search">search:  </label>
      <input id="search" type="text"></input>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <h1>Lists in React!</h1>
      <Search />
      <hr />
      <List />

    </div>
  );
}

export default App;