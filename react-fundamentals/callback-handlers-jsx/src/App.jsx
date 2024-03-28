import * as React from 'react';

const App = () => {
  const stories = [
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

  // Define a callback handler so we can communicate information about 
  // a child components state up the component tree. We then pass this function 
  // to the child component as a props down below
  const handleSearch = (event) => {
    /* Log the current state of the Search component */
    console.log("Search component current state: " + event.target.value);
  }

  return (
    <div>
      <h1>React Playground!</h1>
      <Search onSearch={handleSearch} />
      <hr />
      <List list={stories} />
    </div>
  );
};

const Item = (props) => (
  /* An item component that gets rendered inside of a list */
  <li key={props.item.objectID}>
    <a href={props.item.url}>{props.item.title}:</a>
    <ul>
      <li key={props.item.author}>Author: {props.item.author = "Devere"}</li>
      <li key={props.item.num_comments}>Number of Comments: {props.item.num_comments}</li>
      <li key={props.item.points}>Points: {props.item.points}</li>
    </ul>
    <br />
  </li>
);

const List = (props) => {
  /* An unordered List component that iterates over an array
   * to create a list element from each item stored in it */

  return (
    <ul>
      {props.list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  );
}

const Search = (props) => {
  /* A search box component */

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => {   // synthetic event
    // Update the current state to be the value of the element  
    // where the event occurred.
    setSearchTerm(event.target.value);

    // Pass information about current state back up the component tree
    // using the callback function defined in the parent component
    props.onSearch(event);
  }

  return (
    <div>
      <label htmlFor="search">Search:  </label>
      <input id="search" type="text" onChange={handleChange} onBlur={handleChange}></input>
      <br />
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
};

export default App;