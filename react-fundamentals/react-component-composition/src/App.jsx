import * as React from 'react';

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

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const handleSearch = (event) => {
    /* Update the searchTerm state in this handler and save the 
     * user's search in the browser's local storage. */
    setSearchTerm(event.target.value);
  };

  // Filter stories list based on library title or author(s) name(s)
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

      <br/>
      <hr />

      <List list={filteredStories} />
    </div>
  );
};

const List = ({ list }) => {
  /* An unordered List component that iterates over an array
   * to create a list element from each item stored in it */
  return (
    <ul>
      {list.map(({ objectID, ...item }) => (
        <Item key={objectID} {...item} />
      ))}
    </ul>
  );
}

// Use the children prop to render everything that has been rendered between the 
// opening and closing tag syntax of these elements
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

const Item = ({ objectID, url, title, author, num_comments, points }) => {
  /* An item component that gets rendered inside of a list */
  return (
    <li key={objectID}>
      <a href={url}>{title}:</a>
      <ul>
        <li key={author}>Author: {author}</li>
        <li key={num_comments}>Number of Comments: {num_comments}</li>
        <li key={points}>Points: {points}</li>
      </ul>
      <br />
    </li>
  );
};

export default App;