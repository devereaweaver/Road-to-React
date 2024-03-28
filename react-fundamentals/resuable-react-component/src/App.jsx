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

      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
      />

      <br/>

      {/* For demonstration purposes I made another instance of the InputWithLabel
      but instead made it a button by passing different props to it. This demonstrates
      how a React component can be built for reusability in different cases. */}
      <InputWithLabel
        id="button"
        label="Button"
        value="Click me!"
        type='button'
        onInputChange={handleSearch}
      />

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

// const Search = ({ search, onSearch }) => {
//   /* A search box component */
//   return (
//     <>
//       <label htmlFor="search">Search:  </label>
//       <input
//         id="search"
//         type="text"
//         onChange={onSearch}
//         value={search}
//       />
//     </>
//   );
// };


/* Refactor the above Search component into a more general component */
const InputWithLabel = ({ id, label, value, type = 'text', onInputChange }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
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