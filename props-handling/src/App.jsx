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

  console.clear();

  // Move the searchTerm state from Search into App,
  const [searchTerm, setSearchTerm] = React.useState('React');

  // then update the state in a handler that we'll pass to the
  // child component
  const handleSearch = (event) => {
    /* Update the searchTerm state in this handler */
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
      {/* Let the HTML know about the React state by
      passing the searchTerm state to it and not just a handler */}
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
      {/* Pass all the key-value pairs from the item object into the 
      * Item component. Use the rest operator to separate out the objectID
      * property since we don't need to pass it to the Item component to 
      * use it in there. */}
      {list.map(({objectID, ...item}) => (
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

const Item = ({
  title,
  url,
  author,
  num_comments,
  points,
}) => {
  /* An item component that gets rendered inside of a list */
  return (
    <li>
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