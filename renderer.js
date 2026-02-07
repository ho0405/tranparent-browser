const webview = document.getElementById('webview');
const urlInput = document.getElementById('url-input');
const opacitySlider = document.getElementById('opacity-slider');
const opacityValue = document.getElementById('opacity-value');
const shortcuts = document.getElementById('shortcuts');

// 다국어 지원
const translations = {
    ko: {
        appTitle: '투명 브라우저',
        opacity: '투명도:',
        alwaysOnTop: '📌 항상 위',
        alwaysOnTopOff: '📍 항상 위 해제',
        urlPlaceholder: 'URL 입력 (예: https://chat.openai.com)',
        go: '이동',
        shortcuts: '<strong>단축키:</strong><br>Ctrl+Up/Down: 투명도 조절<br>Ctrl+T: 항상 위 토글<br>Ctrl+Q: 종료'
    },
    en: {
        appTitle: 'Transparent Browser',
        opacity: 'Opacity:',
        alwaysOnTop: '📌 Always on top',
        alwaysOnTopOff: '📍 Pin off',
        urlPlaceholder: 'Enter URL (e.g. https://chat.openai.com)',
        go: 'Go',
        shortcuts: '<strong>Shortcuts:</strong><br>Ctrl+Up/Down: Adjust opacity<br>Ctrl+T: Toggle always on top<br>Ctrl+Q: Quit'
    }
};

let currentLang = localStorage.getItem('transparentBrowserLang') || 'ko';
let isAlwaysOnTop = true;

function applyLanguage() {
    const t = translations[currentLang];
    document.querySelector('[data-i18n="appTitle"]').textContent = t.appTitle;
    document.querySelector('[data-i18n="opacity"]').textContent = t.opacity;
    document.querySelector('[data-i18n-placeholder="urlPlaceholder"]').placeholder = t.urlPlaceholder;
    document.querySelector('[data-i18n="go"]').textContent = t.go;
    document.querySelector('[data-i18n-html="shortcuts"]').innerHTML = t.shortcuts;

    const toggleTop = document.getElementById('toggle-top');
    toggleTop.textContent = isAlwaysOnTop ? t.alwaysOnTop : t.alwaysOnTopOff;
}

// 한/영 토글
document.getElementById('lang-btn').addEventListener('click', () => {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    localStorage.setItem('transparentBrowserLang', currentLang);
    document.getElementById('lang-btn').textContent = currentLang === 'ko' ? '한/EN' : 'KO/영';
    applyLanguage();
});

// 초기 언어 적용
document.getElementById('lang-btn').textContent = currentLang === 'ko' ? '한/EN' : 'KO/영';
applyLanguage();

// 웹뷰 네비게이션
document.getElementById('back-btn').addEventListener('click', () => {
    webview.goBack();
});

document.getElementById('forward-btn').addEventListener('click', () => {
    webview.goForward();
});

document.getElementById('reload-btn').addEventListener('click', () => {
    webview.reload();
});

// 안전한 URL만 허용 (javascript:, file:, data: 등 차단)
function isValidUrl(input) {
    const trimmed = input.trim().toLowerCase();
    const blocked = ['javascript:', 'file:', 'data:', 'vbscript:', 'blob:'];
    if (blocked.some(p => trimmed.startsWith(p))) return false;
    return trimmed.startsWith('http://') || trimmed.startsWith('https://');
}

function sanitizeUrl(input) {
    const trimmed = input.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
    }
    return 'https://' + trimmed;
}

document.getElementById('go-btn').addEventListener('click', () => {
    const raw = urlInput.value;
    const url = sanitizeUrl(raw);
    if (!isValidUrl(url)) return; // 차단된 프로토콜이면 무시
    webview.src = url;
});

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('go-btn').click();
    }
});

// 웹뷰 URL 변경 시 입력창 업데이트
webview.addEventListener('did-navigate', (e) => {
    urlInput.value = e.url;
});

webview.addEventListener('did-navigate-in-page', (e) => {
    urlInput.value = e.url;
});

// 투명도 조절
opacitySlider.addEventListener('input', (e) => {
    const opacity = e.target.value / 100;
    opacityValue.textContent = e.target.value + '%';
    window.electronAPI.setOpacity(opacity);
});

// 항상 위 토글
document.getElementById('toggle-top').addEventListener('click', () => {
    isAlwaysOnTop = !isAlwaysOnTop;
    window.electronAPI.setAlwaysOnTop(isAlwaysOnTop);
    applyLanguage(); // 언어에 맞게 텍스트 갱신
});

// 도움말 토글
document.getElementById('help-btn').addEventListener('click', () => {
    shortcuts.classList.toggle('show');
    setTimeout(() => {
        shortcuts.classList.remove('show');
    }, 5000);
});

// 닫기 (IPC 사용 - Electron 28+ 에서 remote 제거됨)
document.getElementById('close-btn').addEventListener('click', () => {
    window.electronAPI.closeWindow();
});
