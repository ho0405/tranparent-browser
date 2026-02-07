const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        opacity: 0.85,
        alwaysOnTop: true,
        frame: false,
        transparent: true,
        backgroundColor: '#00000000',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webviewTag: true,
            preload: path.join(__dirname, 'preload.js'),
            sandbox: false
        }
    });

    mainWindow.loadFile('index.html');

    // 개발자 도구 (필요시)
    // mainWindow.webContents.openDevTools();

    // 전역 단축키 등록
    registerShortcuts();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

function registerShortcuts() {
    // Ctrl+Up: 투명도 증가
    globalShortcut.register('CommandOrControl+Up', () => {
        if (mainWindow) {
            let opacity = mainWindow.getOpacity();
            mainWindow.setOpacity(Math.min(1.0, opacity + 0.05));
        }
    });

    // Ctrl+Down: 투명도 감소
    globalShortcut.register('CommandOrControl+Down', () => {
        if (mainWindow) {
            let opacity = mainWindow.getOpacity();
            mainWindow.setOpacity(Math.max(0.1, opacity - 0.05));
        }
    });

    // Ctrl+T: 항상 위 토글
    globalShortcut.register('CommandOrControl+T', () => {
        if (mainWindow) {
            const isAlwaysOnTop = mainWindow.isAlwaysOnTop();
            mainWindow.setAlwaysOnTop(!isAlwaysOnTop);
        }
    });

    // Ctrl+Q: 종료
    globalShortcut.register('CommandOrControl+Q', () => {
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

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

// IPC 이벤트 처리 (입력 검증)
ipcMain.on('set-opacity', (event, opacity) => {
    if (mainWindow && typeof opacity === 'number' && opacity >= 0.1 && opacity <= 1) {
        mainWindow.setOpacity(opacity);
    }
});

ipcMain.on('set-always-on-top', (event, flag) => {
    if (mainWindow && typeof flag === 'boolean') {
        mainWindow.setAlwaysOnTop(flag);
    }
});

ipcMain.on('close-window', () => {
    if (mainWindow) mainWindow.close();
});
