/* In React, the array's map() method is used to transform a list 
 * of items into JSX by returning JSX for each item. Let's figure out 
 * how to do this in React. */

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

/* Try to render the objects in that list with the title property in JSX */
export default function App() {
  return (
    <div>
      <h1>Lists in React!</h1>

      <label htmlFor="search">Search:  </label>
      <input id="search" type="text"></input>

      <hr />

      {/* Here's were we get jiggy, for each item in the list
        * we turn it into an li element and then go back into 
        * the JS/TS to get access the title attribute. */}

      <ul>
        {list.map((item) => {
          return (
            <div>
              <p key={item.objectID}>{item.title}</p>
              <li key={item.objectID}><a href={item.url}>URL: {item.url}</a></li>
              <li key={item.objectID}>Author: {item.author}</li>
              <li key={item.objectID}>Number of comments: {item.num_comments}</li>
              <li key={item.objectID}>Points: {item.points}</li>
              <br/>
            </div>
          ); 
        })}
      </ul>


    </div>
  );
}