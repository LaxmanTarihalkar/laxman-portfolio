import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';

// When deployed to GitHub Pages the app lives at a subdirectory
// (e.g. /laxman-portfolio/). import.meta.env.BASE_URL is set by Vite
// from the `base` config, so React Router always has the correct basename
// whether running locally ('/') or on Pages ('/laxman-portfolio/').
const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
