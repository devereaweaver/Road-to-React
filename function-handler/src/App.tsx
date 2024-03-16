/* Observe we're now using => syntax without an explicit 
 * return statement */

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

  return (
    <div>
      <h1>Handler Function in JSX</h1>
      <Search />
      <hr />
      <List list={stories}/>
    </div>
  );
};

const List = (props) => (
  /* An unordered List component */
  <ul>
    {props.list.map(function (item) {
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

const Search = () => {
  /* A search box component */

  // Create a handler then pass it to the onChange attribute of 
  // the HTML input field.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // synthetic event
    console.log(event);
    // value of target
    console.log(event.target.value);
  }

  return (
    <div>
      <label htmlFor="search">Search:  </label>
      <input id="search" type="text" onChange={handleChange} onBlur={handleChange}></input>
    </div>
  );
};

export default App;