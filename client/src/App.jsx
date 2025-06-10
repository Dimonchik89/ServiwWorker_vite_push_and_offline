import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import { requestPermission, showNotification } from "./notification";
import { subscribeUser } from './push';

import './App.css'

function App() {

  useEffect(() => { subscribeUser(); }, []);


  return (
    <>
      <h1>Vite + React</h1>
    </>
  )
}

export default App
