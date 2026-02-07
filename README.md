# Peekaboo

웹 페이지를 반투명 창으로 띄워, 뒤에 있는 창과 함께 보면서 작업할 수 있는 데스크톱 앱입니다.

A desktop app that displays web pages in a semi-transparent window, so you can see and work with windows behind it.

---

## ✨ Features / 주요 기능

- **투명 창** – Opacity를 조절해 창을 반투명하게 사용
- **항상 위** – Always on top으로 다른 창 위에 고정
- **한/영 언어 전환** – Korean/English toggle (한/EN 버튼)
- **단축키 지원** – Keyboard shortcuts for quick control
- **보안 강화** – Context isolation, URL validation (http/https only)

---

## 📥 Download / 다운로드

| Platform | File |
|----------|------|
| **macOS** (Intel x64) | [Peekaboo-1.0.0.dmg](https://github.com/ho0405/tranparent-browser/releases) |
| **macOS** (Apple Silicon) | [Peekaboo-1.0.0-arm64.dmg](https://github.com/ho0405/tranparent-browser/releases) |
| **Windows** | [Peekaboo Setup 1.0.0.exe](https://github.com/ho0405/tranparent-browser/releases) |

> **Note:** Mac용은 Mac에서, Windows용은 Windows에서 빌드해야 합니다.  
> GitHub Releases에서 최신 버전을 확인하세요.

---

## 🚀 Installation / 설치 방법

### macOS
1. `.dmg` 파일을 다운로드합니다.
2. 파일을 열고 **Peekaboo** 앱을 Applications 폴더로 드래그합니다.
3. Applications에서 앱을 실행합니다.  
   - 처음 실행 시 "신뢰할 수 없는 개발자" 경고가 뜨면:  
     **시스템 설정 → 개인 정보 보호 및 보안**에서 "그래도 열기"를 선택합니다.

### Windows
1. `.exe` 설치 파일을 다운로드합니다.
2. 실행 후 설치 마법사를 진행합니다.
3. 설치가 끝나면 시작 메뉴 또는 바탕화면에서 앱을 실행합니다.

---

## ⌨️ Shortcuts / 단축키

| Shortcut | Action |
|----------|--------|
| `Ctrl+Up` | 투명도 증가 / Increase opacity |
| `Ctrl+Down` | 투명도 감소 / Decrease opacity |
| `Ctrl+T` | 항상 위 토글 / Toggle always on top |
| `Ctrl+Q` | 종료 / Quit |

---

## 🛠 Development / 개발 환경

### Prerequisites
- Node.js 18+
- npm

### Setup & Run
```bash
git clone https://github.com/ho0405/tranparent-browser.git
cd tranparent-browser
npm install
npm start
```

### Build for distribution
```bash
npm run build
```

- **Mac에서 빌드** → `dist/` 폴더에 `.dmg` 생성
- **Windows에서 빌드** → `dist/` 폴더에 `.exe` 생성

### Deploy to GitHub Releases

1. 코드를 GitHub 저장소에 push합니다.
2. **Releases → Create a new release** 클릭
3. 태그 입력 (예: `v1.0.0`)
4. `dist/`에서 생성된 `.dmg`(Mac) 또는 `.exe`(Windows) 파일을 업로드
5. Publish release

---

## 📁 Project structure

```
tranparent-browser/
├── main.js          # Electron main process
├── preload.js       # Secure preload script
├── renderer.js      # Renderer logic & i18n
├── index.html       # UI
├── package.json
└── transparent_browser.ico
```

---

## 📜 License

MIT License
