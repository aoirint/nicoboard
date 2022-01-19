import { app, ipcMain, BrowserWindow } from 'electron'
import * as path from 'path'

let win: BrowserWindow | null = null

function createWindow (): void {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(path.join(__dirname, '..', 'index.html')).catch((error: unknown) => {
      console.error(error)
    })
  } else {
    win.loadURL('http://localhost:3000/index.html').catch((error: unknown) => {
      console.error(error)
    })
  }

  win.on('closed', () => {
    win = null
  })

  // Hot Reloading
  if (!app.isPackaged) {
    // 'node_modules/.bin/electronPath'
    const electronReload = require('electron-reload') // eslint-disable-line @typescript-eslint/no-var-requires
    electronReload(__dirname, {
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

ipcMain.handle('button-clicked', async (event, obj) => {
  console.log(obj)
})
