import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/* Here, we are using the getElementById method to return the 
 * HTML element that we have seen in the index.html file where
 * the React application will insert itself. 
 * 
 * Basically, we're telling the browser where we want React
 * to insert itself
 */
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('newroot')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)