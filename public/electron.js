const electron = require("electron");
const {
	app,
	BrowserWindow,
	ipcMain,
	Notification,
	globalShortcut,
	Menu
} = electron;
const isDev = require("electron-is-dev");
const menubar = require("menubar");

const path = require("path");
const url = require("url");

let indexPath;

const template = [
	{
		label: "Edit",
		submenu: [
			{ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
			{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
			{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
			{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
			{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
			{
				label: "Select All",
				accelerator: "CmdOrCtrl+A",
				selector: "selectAll:"
			}
		]
	},
	{
		label: "ZUZU",
		submenu: [
			{
				label: "Quit",
				accelerator: "CmdOrCtrl+Q",
				click: () => app.quit()
			}
		]
	}
];

const mb = new menubar({
	width: 400,
	height: 600,
	preloadWindow: true,
	tooltip: "ZUZU",
	icon: path.join(__dirname, "../assets/zuzu.png"),
	resizable: false
});

mb.on("ready", () => {
	//show on starup
	mb.showWindow();
	mb.window.focus();

	//show noti
	ipcMain.on("showNoti", (event, arg) => {
		const myNoti = new Notification({
			title: "zuzu",
			body: arg
		});
		myNoti.show();
	});

	//hide window
	ipcMain.on("hideWindow", (event, arg) => {
		mb.hideWindow();
	});

	//register show/hide window shortcut
	const toggleWindow = () => {
		if (mb.window && mb.window.isVisible()) {
			mb.hideWindow();
		} else {
			mb.showWindow();
			mb.window.focus();
		}
	};

	const toggleWindowMac = globalShortcut.register(
		"CommandOrControl+shift+space",
		toggleWindow
	);

	const toggleWindowPC = globalShortcut.register(
		"Super+shift+space",
		toggleWindow
	);

	if (!toggleWindowMac || !toggleWindowPC) {
		console.log("REGISTRATION FAIL");
	}

	//enable copy and paste
	Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});

mb.on("after-create-window", () => {
	if (isDev) {
		mb.window.webContents.openDevTools()
		indexPath = `http://localhost:3000/`;
		mb.setOption("alwaysOnTop", true);
	} else {
		indexPath = `file://${path.join(__dirname, "../build/index.html")}`;
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
