const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { channels } = require('../src/shared/constants');
const { autoUpdater } = require('electron-updater');
const Auth = require('./services/auth');
const path = require('path');
const url = require('url');

let mainWindow;

let successful = {
  success: true,
  data: {}
};

let unsuccessful = {
  success: false,
  message: ""
};

function createWindow () {
  let startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:', //file:
    slashes: true
  });

  mainWindow = new BrowserWindow({
    show: false,
    width: 1366,
    height: 768,
    webPreferences: {
      NodeIntegration: true,
      javascript: true,
      plugins: true,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.once('ready-to-show', () => {
    //require('update-electron-app')();
    autoUpdater.checkForUpdatesAndNotify();
    mainWindow.show();
  });

  mainWindow.loadURL(startUrl);

  // Set/Remove devtools
  mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.closeDevTools();
  });

  // Set/Remove MENU
  mainWindow.removeMenu();

  mainWindow.on('closed', function () {
    app.quit();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion(),
  });
});

/**
 *  Auth
 */

ipcMain.on(channels.AUTH_LOGIN, async (event, email, password) => {
  try {
    const result = await Auth.login(email, password);
    successful.data = result;
    await event.sender.send(channels.AUTH_LOGIN, successful);
  } catch (e) {
    unsuccessful.message = e;
    await event.sender.send(channels.AUTH_LOGIN, unsuccessful);
  }
});

ipcMain.on(channels.AUTH_VERIFY_TOKEN, async (event, id, token) => {
  try {
    const result = await Auth.verifyToken(id, token);
    successful.data = result;
    await event.sender.send(channels.AUTH_VERIFY_TOKEN, successful);
  } catch (e) {
    unsuccessful.message = e;
    await event.sender.send(channels.AUTH_VERIFY_TOKEN, unsuccessful);
  }
});