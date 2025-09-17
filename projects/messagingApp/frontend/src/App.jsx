import { useRoutes } from 'react-router-dom';

import './App.css';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';

function App() {

  const routes = useRoutes([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          index: true,
          element: <HomePage />,
        }
      ]
    }
  ])

  return routes;
};

export default App;
