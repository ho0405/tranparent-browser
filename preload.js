const { contextBridge, ipcRenderer } = require('electron');

// 렌더러에 안전한 API만 노출 (배포용 보안)
contextBridge.exposeInMainWorld('electronAPI', {
    setOpacity: (opacity) => ipcRenderer.send('set-opacity', opacity),
    setAlwaysOnTop: (flag) => ipcRenderer.send('set-always-on-top', flag),
    closeWindow: () => ipcRenderer.send('close-window')
});
