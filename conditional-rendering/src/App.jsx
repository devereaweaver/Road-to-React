/* React Conditional Rendering 
 * 
 * Task: Present the users with a loading indicator in its simplest form. 
 * Once the data are loaded, hide that bad boi. */

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

const getAsyncStories = () =>
  /* Return a promise that resolves to an object containing data */
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
  );

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
  const [stories, setStories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    /* Fetch the async data (only runs one time upon
     * initial rendering). */

    // Set the loading state to true when fetching the data
    setIsLoading(true);
    console.log(setIsLoading);

    // Resolve the promise after successful load
    getAsyncStories()
      .then(result => {
        setStories(result.data.stories);
        setIsLoading(false);    // data successfully loaded
      }).catch(() => setIsError(true));
  },
    []);


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

      {/* Conditional indicator for error - && will short circuit */}
      {isError && <p>Something went wrong fetching data!...</p>}

      {/* Conditional indicator showing loading or actual data */}
      {isLoading ? (
        <p>Loading search results...</p>
      ) : (
        <List list={filteredStories} onRemoveItem={handleRemoveStory} />
      )}

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