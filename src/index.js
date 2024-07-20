const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

// Handle creating / removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 300,
    icon: "/icons/icon.png",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    resizable: false,
    webPreferences: {
      devTools: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Handle window close event to hide the window instead of closing it
  mainWindow.on('close', function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
};

// Since we don't want the user to control the audio via
// hardware media keys, we will be disabling the ability
// to do so.
app.commandLine.appendSwitch("disable-features", "HardwareMediaKeyHandling,MediaSessionService");

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.show();
    mainWindow.focus();
  } else {
    createWindow();
  }
});

// Listen for the quit signal to allow proper quitting of the app
app.on('before-quit', () => {
  app.isQuiting = true;
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Create a Discord Rich Presence Client for the app.
const { Client } = require("discord-rpc");
const rpc = new Client({
  transport: "ipc",
});
rpc.on("ready", () => {
  rpc.setActivity({
    details: "I got my head out the sunroof.",
    state: "Sunroof",
    startTimestamp: new Date(),
    largeImageKey: "sunroof",
  });
  console.log("Discord Rich Presence is ready!");
});
rpc.login({
  clientId: "1136342037654933625",
});
