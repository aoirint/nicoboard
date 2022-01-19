import React from 'react'
import logo from './logo.svg'
import './App.css'

import { IpcRenderer } from 'electron'

interface ElectronContextBridge {
  ipcRenderer: IpcRenderer
}

declare global {
  interface Window {
    electron: ElectronContextBridge
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
          onClick={async () => {
            await window.electron.ipcRenderer.invoke('button-clicked', {
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
