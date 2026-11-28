# PROGRESS — vibecodewith.me（交棒筆記，2026-11-29）

## 目前目標
維護並優化個人網站 https://vibecodewith.me/（純靜態，GitHub Pages）。

## 已完成
- cc 版設計（灰白紙底、墨黑、朱紅；Gloock + Noto Serif/Sans TC；導覽列＋區塊板塊＋作品卡片）已在根目錄並上線。
- repo：github.com/codingn2ob/vibecodewith.me（main）；Pages 網域 vibecodewith.me，HTTPS 已強制。網域原本掛在 codingn2ob.github.io（只有 README+CNAME 的空殼），已移過來。
- 網站圖示（favicon.ico、icon-512.png、apple-touch-icon.png）與分享預覽圖 og-image.png＋OG/Twitter 標籤。
- UI Moments 動效（MIT，github.com/luojiaping/ui-moments）：導覽列／篩選的彈性滑塊、按鈕壓扁回彈；THIRD_PARTY_NOTICES.md 保留授權。
- Chrome Modern Web Guidance 技能裝在專案 `.agents/skills/modern-web-guidance`（連結到 `.claude/skills/`，不進版控）。依指南修正：color-scheme meta + light-dark()、dialog closedby/進出動畫/overscroll、篩選改 aria-pressed 群組、toast 改 live region + popover、複製按鈕狀態與焦點還原、scrollspy 改 IntersectionObserver、頂欄 scroll-state、font-size-adjust。legacy-scan 0 項。最新 commit 32388a8。

## 下一步／未解決
- **claude 指令找不到**：`C:\Users\ASUS\.local\bin\claude.exe` 存在但該資料夾不在 PATH。主人要自己把它加進使用者 PATH（見下方指令），之後就能跑 `claude plugin marketplace add GoogleChrome/modern-web-guidance` 與 `claude plugin install modern-web-guidance@googlechrome`（可選，專案內技能已可用）。
- www.vibecodewith.me 的 HTTPS 尚未生效：Namecheap 的 www CNAME 應改指向 `codingn2ob.github.io`（主人自己改，MAIL SETTINGS 不動）。
- 可選：複製按鈕改用 Invoker Commands（command/commandfor）＋備援；scrollspy 加原生 scroll-target-group。

## 重要檔案
- 網站：index.html、styles.css、app.js（內容設定在 app.js 最上方 SITE_CONFIG / PROJECTS / VIBE_IDEAS）
- 草稿與備份（不上傳）：versions/cc、versions/agy、versions/original
- 本機預覽：.claude/launch.json（python http.server 8123）
- 工作記錄：python D:\AgentFlow\worklog.py show --project "D:\vibecodewith-me"

## 模型
主對話 Opus（claude-opus-5-5）。

## PATH 修正指令（主人執行）
```powershell
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path","User") + ";$env:USERPROFILE\.local\bin", "User")
```
執行後關掉並重開終端機，再跑 `claude --version` 確認。
