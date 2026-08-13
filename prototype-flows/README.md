# 含原型图的流程图（同款 flow.html）

版式与 `theme-list-prototype/flow.html` 一致。

## 本机打不开 localhost？按下面做

云端 Agent 里的 `localhost` **不是你电脑上的地址**，所以直接点链接会打不开。请在**本机仓库**启动服务：

```bash
# 1. 拉最新代码（分支 cursor/search-page-redesign-e12a）
git fetch origin
git checkout cursor/search-page-redesign-e12a
git pull origin cursor/search-page-redesign-e12a

# 2. 在仓库根目录启动
./start-preview.sh
# 或：python3 -m http.server 8080 --bind 127.0.0.1
```

然后在本机浏览器打开：

| 页面 | 地址 |
|------|------|
| 入口 | http://127.0.0.1:8080/flows.html |
| 总览 | http://127.0.0.1:8080/prototype-flows/flow.html |
| 1 壁纸 | http://127.0.0.1:8080/prototype-flows/01-wallpaper-entry.html |
| 2 主题 | http://127.0.0.1:8080/prototype-flows/02-theme-entry.html |
| 3 更换壁纸 | http://127.0.0.1:8080/prototype-flows/03-change-wallpaper.html |
| 4 独立搜索 | http://127.0.0.1:8080/prototype-flows/04-search-independent.html |
| 5 编辑内搜索 | http://127.0.0.1:8080/prototype-flows/05-search-in-edit.html |
| 参考原页 | http://127.0.0.1:8080/theme-list-prototype/flow.html |

## 不想起服务时

在 Cursor 里打开任意 `prototype-flows/*.html` → `Ctrl+P` → **Live Preview: Show Preview**。

或直接打开 PNG：`prototype-flows/previews/01-wallpaper-entry.png` 等。
