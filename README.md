# Peekaboo

**See through the web.** 웹 페이지를 반투명 창으로 띄워, 뒤에 있는 창과 함께 보면서 작업할 수 있는 데스크톱 앱입니다.

A desktop app that displays web pages in a semi-transparent, always-on-top window. View references while coding, watch videos while taking notes—multitasking made easier.

---

## ✨ Features / 주요 기능

| Feature | Description |
|---------|-------------|
| **투명 창** | Opacity를 조절해 창을 반투명하게 사용 / Adjust opacity for see-through effect |
| **항상 위** | Always on top으로 다른 창 위에 고정 / Pin above other windows |
| **한/영 지원** | Korean/English toggle (한/EN 버튼) / Language toggle |
| **단축키** | Keyboard shortcuts for quick control / 빠른 조작 |
| **슬라이더 동기화** | 단축키로 투명도 변경 시 상단 슬라이더 자동 반영 / Slider syncs with shortcut changes |
| **보안** | Context isolation, URL validation (http/https only) / 컨텍스트 격리, URL 검증 |

---

## ⌨️ Shortcuts / 단축키

| Shortcut (Mac) | Shortcut (Windows) | Action |
|----------------|-------------------|--------|
| `⌘ + ↑` | `Ctrl + ↑` | 투명도 증가 / Increase opacity |
| `⌘ + ↓` | `Ctrl + ↓` | 투명도 감소 / Decrease opacity |
| `⌘ + 1` | `Ctrl + 1` | 투명도 프리셋 (약함 30%) / Opacity preset (low) |
| `⌘ + 2` | `Ctrl + 2` | 투명도 프리셋 (중간 60%) / Opacity preset (mid) |
| `⌘ + 3` | `Ctrl + 3` | 투명도 프리셋 (강함 100%) / Opacity preset (high) |
| `⌘ + T` | `Ctrl + T` | 항상 위 토글 / Toggle always on top |
| `⌘ + Q` | `Ctrl + Q` | 종료 / Quit |

---

## 📥 Download / 다운로드

| Platform | File |
|----------|------|
| **macOS** (Intel x64) | [Peekaboo-1.0.0.dmg](https://github.com/ho0405/tranparent-browser/releases) |
| **macOS** (Apple Silicon) | [Peekaboo-1.0.0-arm64.dmg](https://github.com/ho0405/tranparent-browser/releases) |
| **Windows** | Coming soon / 준비중 |

> **Mac:** Apple Developer approval is pending. After installation, right-click the app and select **Open** to run.  
> **맥:** Apple Developer 승인이 완료되지 않았습니다. 설치 후 앱을 오른쪽 클릭 → **열기**로 실행해 주세요.

---

## 🚀 Installation / 설치 방법

### macOS
1. `.dmg` 파일을 다운로드합니다.
2. 파일을 열고 **Peekaboo** 앱을 Applications 폴더로 드래그합니다.
3. Applications에서 앱을 실행합니다.  
   - 처음 실행 시 "신뢰할 수 없는 개발자" 경고가 뜨면:  
     **오른쪽 클릭 → 열기** 또는 **시스템 설정 → 개인 정보 보호 및 보안**에서 "그래도 열기"를 선택합니다.

### Windows
1. `.exe` 설치 파일을 다운로드합니다. (준비중)
2. 실행 후 설치 마법사를 진행합니다.

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

- **Mac에서 빌드** → `dist/` 폴더에 `.dmg` 생성 (x64, arm64)
- **Windows에서 빌드** → `dist/` 폴더에 `.exe` 생성

---

## 📁 Project Structure / 프로젝트 구조

```
transparent-browser/
├── main.js           # Electron main process, shortcuts, IPC
├── preload.js        # Secure preload (contextBridge)
├── renderer.js       # Renderer logic, i18n, slider
├── index.html        # UI
├── peekaboo.png      # App icon source
├── build/icon.png    # Mac app icon (1024x1024)
├── transparent_browser.ico  # Windows icon
├── docs/             # Static docs for GitHub Pages
└── landing/          # Simple HTML landing
```

---

## 📄 Related Projects / 관련 프로젝트

| Project | Description |
|---------|-------------|
| [peekaboo-landing](https://github.com/ho0405/peekaboo-landing) | Next.js landing page with demo video, auto-download |
| [tranparent-browser](https://github.com/ho0405/tranparent-browser) | This app (Electron) |

---

## 📜 License

MIT License
