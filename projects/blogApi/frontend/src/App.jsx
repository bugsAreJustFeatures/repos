import './App.css'

import { Outlet, Route, BrowserRouter as Router, useRoutes } from 'react-router-dom'

import Navbar from './Navbar';
import HomePage from './HomePage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import MyBlogs from './MyBlogs';
import Settings from './Settings';
import SignOutPage from './SignOutPage';
import CreateBlog from './CreateBlog';
import ViewBlog from './ViewBlog';

function App() {

  const routes = useRoutes([{
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/my-blogs",
        element: <MyBlogs />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/sign-out",
        element: <SignOutPage />,
      },
      {
        path: "/createBlog",
        element: <CreateBlog />,
      },
      {
        path: "/my-blogs/:blogName",
        element: <ViewBlog />,
      },
    ],
  },
]);

return routes;
  
}

export default App
