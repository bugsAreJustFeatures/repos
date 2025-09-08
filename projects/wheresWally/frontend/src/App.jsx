import { useRoutes } from "react-router-dom";

import './App.css'

import HomePage from "./HomePage/HomePage";

function App() {

  const routes = useRoutes([
    {
      index: true,
      element: <HomePage />,
    },
  ]);

  return routes;
};

export default App
