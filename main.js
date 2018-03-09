const { app, BrowserWindow, globalShortcut } = require('electron')
// app: Module to control application life.
// BrowserWindow: Module to create native browser window.

const winStateKeeper = require('electron-window-state')

const path = require('path')
const url = require('url')

//electron hot reload
require('electron-reload')(__dirname)

// console.log(app.getPath('userData'))
// console.log(app.getPath('temp'))
// console.log(app.getPath('desktop'))
// console.log(app.getPath('downloads'))

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', e => {

  let winState = winStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  })

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: winState.width,
    height: winState.height,
    x: winState.x,
    y: winState.y
  })

  winState.manage(mainWindow)

  globalShortcut.register('a', () => {
    console.log('user pressed a key')
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))



  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', e => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
})

app.on('browser-window-blur', e => {
  console.log('window on blur')
})

// app.on('browser-window-focus', e => {
//   console.log('window on focus')
// })

// app.on('will-quit', e => {
//   console.log('app will quit')
// })

// Quit when all windows are closed.
app.on('window-all-closed', e => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', e => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
