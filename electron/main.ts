import { app, ipcMain, BrowserWindow } from 'electron'
import * as path from 'path'
import * as isDev from 'electron-is-dev'

let win: BrowserWindow | null = null

function createWindow (): void {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
})

  if (isDev) {
    win.loadURL('http://localhost:3000/index.html').catch((error: unknown) => {
      console.error(error)
    })
  } else {
    // 'build/index.html'
    win.loadURL(path.join(__dirname, '..', 'index.html')).catch((error: unknown) => {
      console.error(error)
    })
  }

  win.on('closed', () => {
    win = null
  })

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
      forceHardReset: true,
      hardResetMethod: 'exit'
    })
  }
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log('####')
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('button-clicked', (event, msg) => {
  console.log(event)
  console.log(msg)
})
