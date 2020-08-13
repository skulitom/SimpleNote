// Modules to control application life and create native browser window
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const appHeight = 50;

electron.ipcMain.on('QUIT_APPLICATION', (event, args) => {
  BrowserWindow.getFocusedWindow().close();
});

function createWindow () {
  // Create the browser window.
  let screenSize = electron.screen.getPrimaryDisplay().size;
  const mainWindow = new BrowserWindow({
    width: screenSize.width,
    height: appHeight,
    title: 'Simple Note',
    frame: false,
    resizable: false,
    x: 0,
    y: 0,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.setBackgroundColor('#333');
  mainWindow.excludedFromShownWindowsMenu = true;
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  electron.globalShortcut.register('CommandOrControl+1', createWindow);
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', e => e.preventDefault() );
// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
