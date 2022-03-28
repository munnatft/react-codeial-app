import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import {App} from './components';
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { PostProvider } from './providers/PostProvider';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


