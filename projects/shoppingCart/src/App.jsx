import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import './App.css'

import Header from './Header'
import HomePage from './HomePage'
import ShopPage from './ShopPage'
import ErrorPage from './ErrorPage'

function App() {

  const [count, setCount] = useState(0)

  const increaseBasketNumber = () => setCount(a => a + 1)
  
  const PageTemplate = () => (
    <>
      <Header count={count} />
      <main>
        <Outlet />
      </main>
    </>
  )

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageTemplate />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: "shop",
          element: <ShopPage increaseBasketNumber={increaseBasketNumber} />
        },
        {
          path: "*",
          element: <ErrorPage />,
        }
      ]
    }
  ])

  return (
      <RouterProvider router={router} />
  )
}

export default App
