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

  // Check rendering 
  console.log("App rendered.");

  return (
    <div>
      <h1>React Playground!</h1>
      <Search />
      <hr />
      <List list={stories} />
    </div>
  );
};

// Extract an Item component out of the List component
// and place an instance in the List component
const Item = (props) => (
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

  console.log("List rendered.");

  return (
    <ul>
      {props.list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  );
}

const Search = () => {
  /* A search box component */

  // Initialize some state within this component
  const [searchTerm, setSearchTerm] = React.useState('');
  const [count, setCount] = React.useState(1);

  const handleChange = (event) => {   // synthetic event
    // Update the components state using the state updater function 
    // returned from the useState method 
    setCount(count + 1);
    setSearchTerm(event.target.value);
  }

  // See how many times this component rerenders after mutating state
  if (count == 1) {
  console.log("Search rendered.");
  } else {
    console.log("Search re-rendered " + count + " times.");
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