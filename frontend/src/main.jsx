import React from 'react';
import ReactDOM from 'react-dom'; // Use ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Import the App component

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App /> {/* Render the App component */}
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
