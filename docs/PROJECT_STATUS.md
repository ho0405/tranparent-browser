# Project Status / 프로젝트 현황

Last updated: 2026-02

---

## Overview / 개요

**Peekaboo** is a transparent browser desktop app built with Electron. It allows users to view web pages in a semi-transparent, always-on-top window for multitasking.

**Peekaboo**는 Electron으로 제작된 투명 브라우저 데스크톱 앱입니다. 웹 페이지를 반투명·항상 위 창으로 띄워 멀티태스킹을 지원합니다.

---

## Current Status / 현재 상태

### ✅ Completed / 완료

| Item | Description |
|------|-------------|
| **Transparent window** | Opacity control via slider (10–100%) |
| **Always on top** | Pin/unpin with toggle button |
| **i18n (KO/EN)** | Language toggle, stored in localStorage |
| **Shortcuts** | Ctrl/⌘+↑↓, 1/2/3, T, Q |
| **Opacity presets** | Ctrl+1 (30%), Ctrl+2 (60%), Ctrl+3 (100%) |
| **Slider sync** | Slider updates when opacity changes via shortcut |
| **Platform-aware shortcuts** | Mac shows ⌘, Windows shows Ctrl |
| **Security** | Context isolation, preload, URL validation |
| **Landing page** | Next.js app at [peekaboo-daol.vercel.app](https://peekaboo-daol.vercel.app) |
| **Releases** | Mac Intel & Apple Silicon .dmg on GitHub |
| **OG image** | 1200×630 for link previews |

### 🚧 Pending / 진행중

| Item | Description |
|------|-------------|
| **Apple Developer** | Code signing & notarization for Mac (no "unidentified developer" warning) |
| **Windows build** | .exe release (shown as "Coming soon" on landing) |

---

## Repositories / 저장소

| Repo | URL | Purpose |
|------|-----|---------|
| **transparent-browser** | [ho0405/tranparent-browser](https://github.com/ho0405/tranparent-browser) | Electron app (this project) |
| **peekaboo-landing** | [ho0405/peekaboo-landing](https://github.com/ho0405/peekaboo-landing) | Next.js landing page |

---

## Tech Stack / 기술 스택

### Electron App (transparent-browser)
- Electron 28
- electron-builder (dmg, exe)
- Vanilla JS (no framework)

### Landing (peekaboo-landing)
- Next.js 16
- React 19, TypeScript
- Tailwind CSS, shadcn/ui, Motion
- Vercel deployment

---

## File Overview / 파일 개요

### transparent-browser

| File | Role |
|------|------|
| `main.js` | Main process, BrowserWindow, globalShortcut, IPC |
| `preload.js` | contextBridge, exposes electronAPI |
| `renderer.js` | DOM, i18n, slider, opacity sync |
| `index.html` | Title bar, URL bar, webview, controls |

### peekaboo-landing

| Path | Role |
|------|------|
| `src/app/page.tsx` | Landing page, hero, demo video, download |
| `src/app/api/releases/route.ts` | GitHub Releases API, direct download URLs |
| `src/lib/i18n.ts` | KO/EN translations |
| `src/lib/detect-platform.ts` | Auto-detect Mac/Windows for download |
| `src/app/opengraph-image.tsx` | Dynamic OG image (1200×630) |

---

## Deployment / 배포

| Target | Method |
|--------|--------|
| **Electron app** | Manual build → GitHub Releases |
| **Landing** | Vercel (auto-deploy from peekaboo-landing repo) |

---

## Future Ideas / 향후 아이디어

- Click-through mode (투명 영역 클릭 시 뒤 창으로 전달)
- URL bookmarks / 작업 세트 저장
- Session restore (종료 전 상태 복원)
- Global shortcut to show/hide window
