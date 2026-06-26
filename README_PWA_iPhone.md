# Game One iPhone Safari PWA 離線測試說明

這個專案已整理成 iPhone Safari 可加入主畫面並離線遊玩的 PWA。主要入口仍是 `index.html`，開發時維持多檔案結構，不需要把遊戲打包成單一 HTML。

## 1. 本機如何測試

在專案資料夾中啟動本機伺服器：

```bash
python -m http.server 8000
```

或直接執行：

```text
start_server.cmd
```

電腦瀏覽器開：

```text
http://localhost:8000/index.html
```

測試手機直向外框時可開：

```text
http://localhost:8000/test.html
```

## 2. 為什麼不能只用 file:// 測試 Service Worker

PWA 離線快取依賴 `service-worker.js`。瀏覽器基於安全限制，只允許 Service Worker 在 `https://` 或 `http://localhost` 這類安全來源註冊。

所以直接用：

```text
file:///.../index.html
```

無法完整測試 PWA 離線功能。iPhone 也不能可靠地把本機 HTML 當成完整離線 App 執行。

## 3. 如何用本機伺服器測試

1. 執行 `start_server.cmd` 或 `python -m http.server 8000`。
2. 打開 `http://localhost:8000/index.html`。
3. 開啟瀏覽器 DevTools。
4. 在 Application / Service Workers 應可看到 `service-worker.js` 已註冊。
5. 在 Application / Cache Storage 應可看到 `game-one-v1`，裡面有 `index.html`、`style.css`、各 JS、manifest 和 icon。

## 4. 如何部署到 GitHub Pages

1. 把整個專案資料夾推到 GitHub repository。
2. 到 repository 的 Settings。
3. 找 Pages。
4. Source 選擇要部署的 branch，例如 `main`。
5. 資料夾通常選 `/root`。
6. 等 GitHub Pages 產生網址。
7. 用 iPhone Safari 打開該網址的 `index.html`。

也可以部署到 Netlify 或 Cloudflare Pages，只要保留相同檔案結構即可。

重要：iPhone Safari 要可靠註冊 Service Worker，正式測試請使用 HTTPS 網址。電腦本機的 `http://localhost:8000` 可用於電腦測試，但 iPhone 連 `http://電腦IP:8000` 通常不是安全來源，不適合作為最終 PWA 離線測試方式。

## 5. 如何用 iPhone Safari 打開

請用 Safari 打開部署後的網址，例如：

```text
https://你的帳號.github.io/你的專案/index.html
```

不要用 LINE 傳 HTML 檔當主要方案。正確做法是 LINE 傳網址，讓朋友第一次連網打開。

## 6. 如何加入主畫面

1. 用 iPhone Safari 打開遊戲網址。
2. 等遊戲完整載入到開始畫面。
3. 按 Safari 底部分享按鈕。
4. 選「加入主畫面」。
5. 名稱可用 `GameOne`。
6. 之後從主畫面圖示打開。

## 7. 如何測試離線

1. 第一次先連網完整打開遊戲。
2. 等開始畫面出現。
3. 加到主畫面。
4. 關閉 Wi-Fi 和行動網路，或開飛航模式。
5. 從主畫面重新打開遊戲。
6. 如果能進入開始畫面並開始遊戲，就代表離線快取成功。

## 8. 如何更新遊戲版本

修改遊戲後，請更新 `service-worker.js` 裡的：

```js
const CACHE_NAME = "game-one-v1";
```

例如改成：

```js
const CACHE_NAME = "game-one-v2";
```

這樣瀏覽器會建立新的快取版本，避免玩家一直吃舊檔案。

如果有新增 JS、CSS、圖片或音效，也要把檔案加入 `service-worker.js` 的 `CORE_ASSETS` 清單。

## 9. 目前核心快取檔案

目前 `service-worker.js` 會快取：

- `index.html`
- `style.css`
- `config.js`
- `player.js`
- `enemy.js`
- `bullet.js`
- `skill.js`
- `skills.js`
- `upgrade_ui.js`
- `main.js`
- `manifest.webmanifest`
- `icons/apple-touch-icon.png`
- `icons/icon-192.png`
- `icons/icon-512.png`

目前 `assets/` 沒有遊戲啟動必需檔案，因此沒有列入核心快取。



