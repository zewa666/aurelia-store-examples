const { app, BrowserWindow, ipcMain, Notification, Tray } = require('electron');
const client = require('electron-connect').client;
const aureliaJson = require('./aurelia_project/aurelia.json');
const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');
const os = require('os');

let win;
let tray;

function createWindow() {
  win = new BrowserWindow({ width: 1040, height: 600 });

  win.loadURL('http://localhost:' + aureliaJson.platform.port);

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

  client.create(win);

  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  tray = new Tray('./static/aurelia-icon-16x16.png');
  tray.setToolTip('Aurelia Store Electron example');
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.setAppUserModelId('AureliaStoreElectronDemo');

ipcMain.on('state-change', (event, arg) => {
  if (os.platform() === 'win32') {
    tray.displayBalloon({
      title: arg.message.title,
      content: arg.message.text,
      icon: './static/aurelia-icon-512x512.png'
    });
  } else {
    let notification = new Notification({
      title: arg.message.title,
      body: arg.message.text,
      icon: './static/aurelia-icon-512x512.png'
    });

    notification.show();
  }
});

