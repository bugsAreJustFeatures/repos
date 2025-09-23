import { useRoutes } from 'react-router-dom';

import './App.css';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import LogoutPage from './LogoutPage/LogoutPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import MyChatsPage from './MyChatsPage/MyChatsPage';
import ProfilePage from './ProfilePage/ProfilePage';
import ChatPage from './ChatPage/ChatPage';

function App() {

  const routes = useRoutes([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/logout",
          element: <LogoutPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/users/:username",
          element: <ProfilePage />,
        },
        {
          path: "/my-chats",
          element: <MyChatsPage />,
        },
        {
          path: "/my-chats/:chatName",
          element: <ChatPage />,
        },
      ],
    },
  ]);

  return routes;
};

export default App;
