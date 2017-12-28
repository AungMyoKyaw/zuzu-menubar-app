const electron = require("electron");
const { app, BrowserWindow, ipcMain, Notification, globalShortcut } = electron;
const isDev = require("electron-is-dev");
const menubar = require("menubar");

const path = require("path");
const url = require("url");

let mainWindow = null;
let indexPath;

const mb = new menubar({
	width: 400,
	height: 600,
	preloadWindow: true,
	tooltip: "ZUZU",
	resizable: false
});

mb.on("ready", () => {
	// mb.showWindow();
	ipcMain.on("showNoti", (event, arg) => {
		const myNoti = new Notification({ title: "zuzu", body: arg });
		myNoti.show();
	});

	//register show/hide window shortcut
	const toggleWindow = globalShortcut.register(
		"CommandOrControl+shift+space",
		() => {
			if (mb.window && mb.window.isVisible()) {
				mb.hideWindow();
			} else {
				mb.showWindow();
				// mb.window.focus();
			}
		}
	);

	//register copy/cut shortcut
	// const onCopy = globalShortcut.register("CommandOrControl+C", () => {
	// 	console.log("copied");
	// });

	// const onCut = globalShortcut.register("CommandOrControl+X", () => {
	// 	console.log("cut");
	// });

	if (!toggleWindow) {
		console.log("REGISTRATION FAIL");
	}
});

mb.on("after-create-window", () => {
	if (isDev) {
		// Open the DevTools.
		mb.window.webContents.openDevTools();
		indexPath = `http://localhost:3000/`;
	} else {
		indexPath = `file://${path.join(__dirname, "/build/index.html")}`;
	}
	mb.window.loadURL(indexPath);
});

//not quit on all window close for mac
mb.app.on("window-all-closed", () => {
	if (process.platform != "darwin") {
		app.quit();
	}
});

//unregister all shortcut
mb.app.on("will-quit", () => {
	globalShortcut.unregisterAll();
});
