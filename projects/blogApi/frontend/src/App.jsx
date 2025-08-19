import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <form action="/login" method="get">
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" value="123" />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="text" name="password" id="password" value="123" />

        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default App
