# vibecodewith.me

Apple 極簡風格的個人主頁與 AI 作品實驗室，純靜態網頁（零建置步驟，直接打開即可預覽，也適合免費部署到 GitHub Pages）。

## 1. 本機預覽

直接雙擊開啟 `index.html`，即可在瀏覽器看到完整畫面與互動效果（淺色／Pro 深色切換、Vibe 靈感機、`⌘K` / `Ctrl+K` Spotlight 搜尋）。

## 2. 如何客製化內容與新增作品

只要編輯 `app.js` 最上方兩個區塊即可：

- **`SITE_CONFIG`**：修改顯示名稱、帳號代號（`handle`）、聯絡信箱（`email`）、GitHub 連結、個人簡介（`bio`）與即時專注狀態（`nowBuilding`）。
- **`PROJECTS`**：新增或修改作品卡片：
  - `category`：填入 `'ai'`（AI 工具）、`'web'`（網頁實驗）或 `'wip'`（進行中）。
  - `status`：填入 `'live'` 或 `'wip'`。
  - `previewTheme`：填入 `'preview-blue'`、`'preview-amber'` 或 `'preview-mint'`。
  - `href`：填入該作品的實際網址或頁面錨點（如 `'#vibe-card'`）。
- **`VIBE_IDEAS`**：可自由擴充 Vibe 靈感機的點子與起手式 Prompt。

## 3. 免費部署到 GitHub Pages（綁定 `vibecodewith.me`）

> ⚠️ 重要提醒：設定網站 DNS 時，請**不要**修改 Namecheap `Advanced DNS` 裡的 `MAIL SETTINGS`（維持 `Email Forwarding`），這樣你的 `@vibecodewith.me` 收信轉寄就會一直正常運作！

### 步驟 A：建立 GitHub Repository 並啟用 Pages
1. 在 GitHub（`codingn2ob`）建立一個公開 Repository（例如 `vibecodewith.me`）。
2. 將本資料夾內所有檔案（含 `index.html`、`styles.css`、`app.js`、`CNAME`、`README.md`）上傳到該 Repository 的 `main` 分支根目錄。
3. 進入 Repository 的 **Settings → Pages**：
   - **Source** 選擇 **Deploy from a branch** → 分支選 **`main`** / **`/(root)`** → **Save**。
   - 確認 **Custom domain** 欄位顯示 `vibecodewith.me`（會自動讀取 `CNAME` 檔案），待 DNS 生效後勾選 **Enforce HTTPS**。

### 步驟 B：到 Namecheap 設定網站 DNS
登入 Namecheap → **Domain List** → `vibecodewith.me` 點 **MANAGE** → 切到 **Advanced DNS** 頁籤 → 在 **HOST RECORDS** 新增以下 5 筆紀錄（若有舊的預設 `A` / `CNAME` 停車頁紀錄可先刪除）：

| Type | Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| A Record | `@` | `185.199.108.153` | Automatic |
| A Record | `@` | `185.199.109.153` | Automatic |
| A Record | `@` | `185.199.110.153` | Automatic |
| A Record | `@` | `185.199.111.153` | Automatic |
| CNAME Record | `www` | `codingn2ob.github.io` | Automatic |

設定完成後等待約 5～15 分鐘 DNS 生效，再到 GitHub Pages 設定頁面勾選 **Enforce HTTPS**，即可透過 `https://vibecodewith.me` 訪問你的網站！
