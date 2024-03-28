/* React Asynchronous Data */

import * as React from 'react';

const initialStories = [
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

const getAsyncStories = () => {
  /* Return a promise that resolves to an object containing data */

  // Create a new Promise object and delay it to simulate network latency
  return new Promise((resolve) => 
  setTimeout(
  resolve({data: {stories: initialStories}}),
  10000));
};

const useStorageState = (key, initialState) => {
  /* A customized React hook that will be used to synchronize both the React state
   * and the browser's local storage. */

  // Initialize state
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  // Update local storage
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  // Return our initial state and updating function
  return [value, setValue];
};


const App = () => {
  console.clear()

  const [searchTerm, setSearchTerm] = useStorageState('search', '');

  // Simulate fetching data from a remove resource using an initially empty array 
  // that will eventually contain our simulated async data 
  const [stories, setStories] = React.useState([]);

  // We'll use a useEffect hook to call the function and resolve the returned promise
  // as a side-effect. Use an empty dependency array so it only runs when the component
  // is rendered for the first time. 
  React.useEffect(() => {
    getAsyncStories()
      .then(result => {
        setStories(result.data.stories);
      });
  }, []);


  const handleSearch = (event) => {
    /* Update searchTerm */
    setSearchTerm(event.target.value);
  };

  const handleRemoveStory = (toDelete) => {
    /* Remove an element from the stories list */

    // Filter out the desired item 
    const updateStories = stories.filter((story) => {
      toDelete.objectID !== story.objectID
    });

    // Update the React state
    setStories(updateStories);
  };

  // Filter stories list based on searchTerm
  const filteredStories = stories.filter((story) => {
    return (
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>React Playground!</h1>

      <InputWithLabel id="search" value={searchTerm} onInputChange={handleSearch}>
        <strong>Search: </strong>
      </InputWithLabel>

      <br />
      <hr />

      <List list={filteredStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

const List = ({ list, onRemoveItem }) => {
  /* An unordered List component that iterates over an array
   * to create a list element from each item stored in it */
  return (
    <ul>
      {list.map((item) => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </ul>
  );
}

const Item = ({ item, onRemoveItem }) => {
  /* An item component that gets rendered inside of a list */

  return (
    <>
      <li key={item.objectID}>
        <a href={item.url}>{item.title}:</a>
        <ul>
          <li key={item.author}>Author: {item.author}</li>
          <li key={item.num_comments}>Number of Comments: {item.num_comments}</li>
          <li key={item.points}>Points: {item.points}</li>
        </ul>
        <br />
      </li>
      <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
      <br />
    </>
  );
};

const InputWithLabel = ({ id, value, type = 'text', onInputChange, children }) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};



export default App;