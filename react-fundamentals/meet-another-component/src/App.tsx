const list = [
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

/* Observe we're now using => syntax without an explicit 
 * return statement */
const App = () => (
    <div>
      <Search />
      <hr />
      <List />
    </div>
);

const List = () => (
  /* An unordered List component */
    <ul>
      {list.map(function (item) {
        return (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}:</a>
            <ul>
              <li key={item.author}>Author: {item.author}</li>
              <li key={item.num_comments}>Number of Comments: {item.num_comments}</li>
              <li key={item.points}>Points: {item.points}</li>
            </ul>
            <br />
          </li>
        );
      })}
    </ul>
);

const Search = () => (
  /* A search box component */
    <div>
      <label htmlFor="search">Search:  </label>
      <input id="search" type="text"></input>
    </div>
);

export default App;