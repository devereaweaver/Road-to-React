/* React Advanced State
 * 
 * Task: We're going to use React Reducers to bundle React state that is related. 
 * It can be a good idea to use a Reducer when you have multiple state values that 
 * are related or dependent on each other or the same external event. 
 * 
 * Our data, loading, and error handling are all related to data fetching, a common
 * domain. Thus, we'll refactor our code to use a reducer to manage these state 
 * transitions instead of using react state to manage them.
 * 
 * The first thing we'll want to do is introduce a reducer function outside of our 
 * components. 
 * 
 */

import * as React from 'react';

//==============================================================================
// MODULE VARIABLES 
//==============================================================================
const title = "React Advanced State";

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

const actionTypes = {
  /* An object containing all the action types for our React reducer */
  setStories: 'SET_STORIES',
  removeStory: 'REMOVE_STORY',
}

//==============================================================================
// MODULE FUNCTIONS 
//==============================================================================
const storiesReducer = (state, action) => {
  /* React reducer that manages two state transitions. 
   *  1. State transition for the initializing the stories array 
   *  2. State transition for removing an element from the stories array
   */  
  switch (action.type) {
    case 'SET_STORIES':   // set initial data
      return action.payload;
    case 'REMOVE_STORY':   
      return state.filter(
        // filter out the story we want to remove and return 
        // the updated state
        (story) => action.payload.objectID !== story.objectID
      );
    default:
      throw new Error();
  }
};

const getAsyncStories = () =>
  /* Return a promise that resolves to an object containing data */
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
  );

const useStorageState = (key, initialState) => {
  /* A customized React hook that will be used to synchronize both the React state
   * and the browser's local storage. */
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    /* Update browser local storage to contain user's search term */
    localStorage.setItem(key, value);
  }, [value, key]);

  // Return our initial state and updating function
  return [value, setValue];
};

//==============================================================================
// REACT COMPONENTS
//==============================================================================
const App = () => {
  console.clear()

  const [searchTerm, setSearchTerm] = useStorageState('search', '');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  // Use a React reducer instead of useState to manage the stories list. 
  // This hook receives a reducer and an initial state as arguments. Here the 
  // first arg is the reducer function we defined above and the second is an empty
  // array, meaning the initial state will be empty.
  const [stories, dispatchStories] = React.useReducer(storiesReducer, []);

  // Now that we've created a reducer and we have a dispatch function to update
  // state using the reducer, we'll now use this dispatch function in the useEffect
  // hook so that upon initial rendering, it'll load our initial stories data
  React.useEffect(() => {
    /* Fetch the async data (only runs one time upon
     * initial rendering). */

    // Set the loading state to true when fetching the data
    setIsLoading(true);

    // Resolve the promise after successful load
    getAsyncStories()
      .then((result) => {
        // Set the stories state to be the initial stories after successfully fetched.
        // Notice that we're not explicitly defining an action and then passing it, 
        // we're just defining an object in the parameter that will be the action.
        dispatchStories({
          type: actionTypes.setStories,
          payload: result.data.stories,
        });

        // Reset isLoading state after successful load
        setIsLoading(false);
      }).catch(() => setIsError(true));
  }, []);


  const handleSearch = (event) => {
    /* Update searchTerm */
    setSearchTerm(event.target.value);
  };

  const handleRemoveStory = (item) => {
    /* Remove an element from the stories list by using the dispatch
     * function and running the logic that matches the given action type */
    dispatchStories({
      type: actionTypes.removeStory,
      payload: item,
    });
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
      <h1>{title}</h1>

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