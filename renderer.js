const webview = document.getElementById('webview');
const urlInput = document.getElementById('url-input');
const opacitySlider = document.getElementById('opacity-slider');
const opacityValue = document.getElementById('opacity-value');
const shortcuts = document.getElementById('shortcuts');

const mod = window.electronAPI?.modKey || 'Ctrl';

// 다국어 지원
const translations = {
    ko: {
        appTitle: 'Peekaboo',
        opacity: '투명도:',
        alwaysOnTop: '📌 항상 위',
        alwaysOnTopOff: '📍 항상 위 해제',
        urlPlaceholder: 'URL 입력 (예: https://chat.openai.com)',
        go: '이동',
        shortcuts: `<strong>단축키:</strong><br>${mod}+↑/↓: 투명도 조절<br>${mod}+1/2/3: 투명도 프리셋 (약함/중간/강함)<br>${mod}+T: 항상 위 토글<br>${mod}+Q: 종료`
    },
    en: {
        appTitle: 'Peekaboo',
        opacity: 'Opacity:',
        alwaysOnTop: '📌 Always on top',
        alwaysOnTopOff: '📍 Pin off',
        urlPlaceholder: 'Enter URL (e.g. https://chat.openai.com)',
        go: 'Go',
        shortcuts: `<strong>Shortcuts:</strong><br>${mod}+↑/↓: Adjust opacity<br>${mod}+1/2/3: Opacity preset (low/mid/high)<br>${mod}+T: Toggle always on top<br>${mod}+Q: Quit`
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

// 슬라이더 ↔ 투명도 동기화
function syncSliderToOpacity(opacity) {
    const percent = Math.round(opacity * 100);
    opacitySlider.value = percent;
    opacityValue.textContent = percent + '%';
}

// 투명도 조절 (슬라이더)
opacitySlider.addEventListener('input', (e) => {
    const opacity = e.target.value / 100;
    opacityValue.textContent = e.target.value + '%';
    window.electronAPI.setOpacity(opacity);
});

// 단축키로 투명도 변경 시 슬라이더 동기화
window.electronAPI.onOpacityChanged((opacity) => {
    syncSliderToOpacity(opacity);
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
