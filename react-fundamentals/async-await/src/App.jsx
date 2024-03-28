/* Async/Await
 * 
 * Task: Refactor the code to use async/await syntax since this is the more
 * modern/popular way to work with async functions
 */

import * as React from 'react';
import axios from 'axios';

//==============================================================================
// MODULE VARIABLES 
//==============================================================================
const title = "Async/Await";

const API_ENDPOINT = 'http://hn.algolia.com/api/v1/search?query=';

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
        data: state.data.filter((story) => action.payload.objectID != story.objectID)
      };
    default:
      throw new Error();
  }
};

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

  // Stateful values
  const [searchTerm, setSearchTerm] = useStorageState('search', '');
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  // Reducer states
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }    // a more complex state structure
  );

  const handleFetchStories = React.useCallback(async () => {
    /* Fetch the async data each time the searchTerm is updated. */
    if (!searchTerm) return;

    // Set loading state
    dispatchStories({ type: actionTypes.storiesFetchInit });

    try {
      const result = await axios.get(url);
      // Update data
      dispatchStories({
        type: actionTypes.storiesFetchSuccess,
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: actionTypes.storiesFetchFailure });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories])

  const handleSearchInput = (event) => {
    /* Handler for updating the input field. Updates the state of 
     * the search term */
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    /* Handler for the submit button. Sets the new stateful value 
     * url that is derived from searchTerm and the static API endpoint */
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    // We want to prevent the default behavior for our form which in this is
    // to do a reload, no keep it smooth
    event.preventDefault();
  };

  const handleRemoveStory = (item) => {
    /* Remove an element from the stories list by using the dispatch
     * function and running the logic that matches the given action type */
    dispatchStories({
      type: actionTypes.removeStory,
      payload: item,
    });
  };

  return (
    <div>
      <h1>{title}</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <br />
      <hr />

      {stories.isError && <p>Something went wrong fetching data!...</p>}

      {stories.isLoading ? (
        <p>Loading search results...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
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

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => {
  /* Return a search form for the user's input. It relies on the current state of searchTerm */
  return (
    <form onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={onSearchInput}
      >
        <strong>Search: </strong>
      </InputWithLabel>

      <button
        type="submit"
        disabled={!searchTerm}
      >
        Submit
      </button>
    </form>
  );
};

export default App;