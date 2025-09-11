import { useRoutes } from "react-router-dom";

import './App.css'

import HomePage from "./HomePage/HomePage.jsx";
import BeachClub from "./BeachClub/BeachClub.jsx";

function App() {

  const routes = useRoutes([
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "/beach-club",
      element: <BeachClub />,
    },
  ]);

  return routes;
};

export default App
