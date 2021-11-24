const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { channels } = require('../src/shared/constants');
const { autoUpdater } = require('electron-updater');
const Auth = require('./services/auth');
const Database = require('./services/database');
const Test = require('./services/test');
const path = require('path');
const url = require('url');
const { test } = require('shelljs');

let mainWindow;

let successful = {
  success: true,
  data: {}
};

let unsuccessful = {
  success: false,
  data: {},
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
      // mainWindow.closeDevTools();
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

/**
 *  DATABASE
 */

ipcMain.on(channels.GET_DATABASE, async (event) => {
  try {
    const result = await Database.getDataFromDatabase();
    successful.data = result;
    await event.sender.send(channels.GET_DATABASE, successful);
  } catch (e) {
    unsuccessful.message = e;
    await event.sender.send(channels.GET_DATABASE, unsuccessful);
  }
});

/**
 *  TEST
 */

ipcMain.on(channels.CREATE_TEST, async (event, name) => {
  try {
    console.log(name);
    const result = await Test.createTest(name);
    successful.data = result;
    await event.sender.send(channels.CREATE_TEST, successful);
  } catch (e) {
    console.log(e);
    unsuccessful.message = e;
    await event.sender.send(channels.CREATE_TEST, unsuccessful);
  }
});

ipcMain.on(channels.UPDATE_TEST, async (event, id, newName) => {
  try {
    const result = await Test.updateTest(id, newName);
    successful.data = result;
    await event.sender.send(channels.UPDATE_TEST, successful);
  } catch (e) {
    unsuccessful.message = e;
    await event.sender.send(channels.UPDATE_TEST, unsuccessful);
  }
});

ipcMain.on(channels.DELETE_TEST, async (event, id) => {
  try {
    const result = await Test.deleteTest(id);
    successful.data = result;
    await event.sender.send(channels.DELETE_TEST, successful);
  } catch (e) {
    unsuccessful.message = e;
    await event.sender.send(channels.DELETE_TEST, unsuccessful);
  }
});

ipcMain.on(channels.FIND_ID_TEST, async (event, id) => {
  try {
    const result = await Test.findTestByID(id);
    successful.data = result;
    await event.sender.send(channels.FIND_ID_TEST, successful);
  } catch (e) {
    unsuccessful.message = e;
    await event.sender.send(channels.FIND_ID_TEST, unsuccessful);
  }
});

ipcMain.on(channels.GET_ALL_TESTS, async (event) => {
  try {
    const result = await Test.getAllTests();
    successful.data = result;
    await event.sender.send(channels.GET_ALL_TESTS, successful);
  } catch (e) {
    unsuccessful.message = e;
    await event.sender.send(channels.GET_ALL_TESTS, unsuccessful);
  }
});