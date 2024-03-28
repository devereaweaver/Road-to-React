/* React Impossible States
 * 
 * Here we'll use a reducer to manage the states for data, loading, and 
 * errors in fetching the data. This requires more action types which I placed in 
 * the actionTypes object.
 * 
 * In the useEffect in the App component, we use the dispatch function to first 
 * manage the data loading state. Then, once the promise is resolved to after 
 * successfully fetching the data, we'll use the dispatch function to load the 
 * data into the stories array. We'll also use the dispatch function to handle
 * the error state in the catch block of the async data fetching function. 
 * 
 * Whenever we create new action types to be called in the dispatch, we'll need
 * to account for them in the reducer function as well to handle these state
 * transitions.
 */

import * as React from 'react';

//==============================================================================
// MODULE VARIABLES 
//==============================================================================
const title = "React Impossible States";

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
  storiesFetchInit: 'STORIES_FETCH_INIT',
  storiesFetchSuccess: 'STORIES_FETCH_SUCCESS',
  storiesFetchFailure: 'STORIES_FETCH_FAILURE',
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
    case 'STORIES_FETCH_INIT':
      // Update the loading state to true and leave data alone
      return { 
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      // Update the state of our data and set loading to false
      return {
        ...state,
        isLoading: false, 
        isError: false, 
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      // Update the error state (if any)
      return { 
        ...state, 
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      // Update the data after removing a story
      return { 
        ...state, 
        data: state.data.filter( (story) => action.payload.objectID != story.objectID)
      };
    default:
      throw new Error();
  }
};

// NOTE: This is SUPPOSED to be an error fetching the data
const getAsyncStories = () =>
  /* Return a promise that resolves to an object containing data */
  new Promise((resolve, reject) =>
    /* Simulate an error by using the following commented code */
    // setTimeout(reject, 2000));
    setTimeout(() => resolve({ data: { stories: initialStories } }), 2000));


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

  // Use a single reducer for unified state management of data, loading, and error states. 
  // We pass in the reducer function that updates the state as well as the initial state 
  // of all the states we want this reducer to manage.
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }    // a more complex state structure
  );

  React.useEffect(() => {
    /* Fetch the async data (only runs one time upon
     * initial rendering). */

    // Initialize the data fetching process
    dispatchStories({ type: actionTypes.storiesFetchInit });

    // Resolve the promise after successful load
    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: actionTypes.storiesFetchSuccess,
          payload: result.data.stories,
        });
      }).catch(() =>
        dispatchStories({ type: actionTypes.storiesFetchFailure })
      );
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
  const filteredStories = stories.data.filter((story) => {
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
      {stories.isError && <p>Something went wrong fetching data!...</p>}

      {/* Conditional indicator showing loading or actual data */}
      {stories.isLoading ? (
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