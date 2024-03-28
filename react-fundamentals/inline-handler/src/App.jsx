/* Task: The application should render a button next to each list item which allows
 * its users to remove the item from the list. 
 * 
 * Let's implement this feature step by step. */

import * as React from 'react';

// 1. Move this guy outside its original component
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

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  // 2. Make the stories variable stateful 
  const [stories, setStories] = React.useState(initialStories);

  const handleSearch = (event) => {
    /* Update searchTerm */
    setSearchTerm(event.target.value);
  };

  // 3. Write an event handler that will remove the items from the stories list
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

      {/* We're using actual text in the tag, we have to render it now in the component */}
      <InputWithLabel id="search" value={searchTerm} onInputChange={handleSearch}>
        <strong>Search: </strong>
      </InputWithLabel>

      <br />
      <hr />

      {/* 4. Pass the remove story event handler to the List component. */}
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
          // 5. Simply pass that remove story handler forward to the Item instance
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
      {/* 6. Invoke that passed in callback handler directly in the JSX. Personally, 
      I think this is much more elegant than creating another handler that only invokes
      the passed in handler or using JS's bind method to create a function. */}
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