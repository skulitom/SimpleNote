// Modules to control application life and create native browser window
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const appHeight = 50;
global.simpleFile = 'myNote.txt';

const appFolder = path.dirname(process.execPath);
const updateExe = path.resolve(appFolder, '..', 'Update.exe');
const exeName = path.basename(process.execPath);

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
});

electron.ipcMain.on('QUIT_APPLICATION', (event, args) => {
  BrowserWindow.getFocusedWindow().close();
});

openFile = async () => {
  if (!BrowserWindow.getFocusedWindow()) {
    createWindow();
  }
  global.simpleFile = (await electron.dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
    properties: ['openFile']
  })).filePaths[0];
};

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
  electron.globalShortcut.register('CommandOrControl+2', openFile);
  
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
