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

const List = (props) => {
  /* An unordered List component that iterates over an array
   * to create a list element from each item stored in it */
  return (
    <ul>
      {props.list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  );
}

const Search = (props) => {
  /* A search box component */
  return (
    <div>
      <label htmlFor="search">Search:  </label>
      <input
        id="search"
        type="text"
        onChange={props.onSearch}
        value={props.search}
      />
    </div>
  )
};

const Item = (props) => {
  /* An item component that gets rendered inside of a list */
  return (
    <li key={props.item.objectID}>
      <a href={props.item.url}>{props.item.title}:</a>
      <ul>
        <li key={props.item.author}>Author: {props.item.author}</li>
        <li key={props.item.num_comments}>Number of Comments: {props.item.num_comments}</li>
        <li key={props.item.points}>Points: {props.item.points}</li>
      </ul>
      <br />
    </li>
  );
};

export default App;