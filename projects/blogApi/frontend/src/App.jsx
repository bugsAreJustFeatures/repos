import './App.css'

import { BrowserRouter as Router, Route, useRoutes } from 'react-router-dom'

import Navbar from './Navbar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Settings from './Settings';
import BlogsPage from './BlogsPage';

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: < Navbar />,
      children: [
        {
          index: true, 
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/blogs",
          element: <BlogsPage />,
        },
      ],
    },
  ]);
  return routes
}

export default App
