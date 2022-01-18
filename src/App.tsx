import React from 'react'
import logo from './logo.svg'
import './App.css'
// const { ipcRenderer } = window.require('electron')

import { IpcRenderer } from 'electron'

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}

function App (): JSX.Element {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button
          className='App-link'
          onClick={() => {
            console.log('OK')
            window.ipcRenderer.postMessage('button-clicked', {
              key: 'value!'
            })
          }}
        >
          Send Message
        </button>
      </header>
    </div>
  )
}

export default App
