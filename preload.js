const { contextBridge, ipcRenderer } = require('electron');

// Ctrl (Windows/Linux) vs ⌘ Command (Mac)
const modKey = process.platform === 'darwin' ? '⌘' : 'Ctrl';

contextBridge.exposeInMainWorld('electronAPI', {
    setOpacity: (opacity) => ipcRenderer.send('set-opacity', opacity),
    setAlwaysOnTop: (flag) => ipcRenderer.send('set-always-on-top', flag),
    closeWindow: () => ipcRenderer.send('close-window'),
    onOpacityChanged: (callback) => {
        ipcRenderer.on('opacity-changed', (_, opacity) => callback(opacity));
    },
    modKey: modKey
});
