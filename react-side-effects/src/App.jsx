import * as React from 'react';

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

  // Upon rendering either use an empty initial state or load the user's previous
  // search term
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || ''
  );

  React.useEffect( () => {
    /* Trigger a side-effect each time the searchTerm state changes 
     * so the application can save it to the browser from anywhere 
     * within the codebase */
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

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
      <Search search={searchTerm} onSearch={handleSearch} />
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

const Search = ({ search, onSearch }) => {
  /* A search box component */
  return (
    <div>
      <label htmlFor="search">Search:  </label>
      <input
        id="search"
        type="text"
        onChange={onSearch}
        value={search}
      />
    </div>
  )
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