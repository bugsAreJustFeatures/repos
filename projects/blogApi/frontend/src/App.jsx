import { useRoutes } from 'react-router-dom'

import Navbar from './navBar/Navbar';
import HomePage from './homePage/HomePage';
import SignUpPage from './signUp/SignUpPage';
import LoginPage from './login/LoginPage';
import MyBlogs from './myBlogs/MyBlogs';
import Settings from './settings/Settings';
import SignOutPage from './signOut/SignOutPage';
import CreateBlog from './createBlog/CreateBlog';
import ViewBlog from "./viewBlog/ViewBlog";
import EditBlog from './editBlog/EditBlog';

import "./App.css";

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
        path: "/view-blogs/:blogName",
        element: <ViewBlog />,
      },
      {
        path: "/edit-blog/:blogName",
        element: <EditBlog />,
      },
    ],
  },
]);

return routes;
  
}

export default App
