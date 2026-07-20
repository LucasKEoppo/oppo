# 含原型图的流程图（同款 flow.html）

版式与 `http://localhost:8080/theme-list-prototype/flow.html` 一致：手机截图 + 箭头操作标注，可点击进入原型页。

## 本地打开（推荐）

先确保仓库根目录已起静态服务（端口 8080），然后浏览器打开：

| # | 流程 | 链接 |
|---|------|------|
| 总览 | 5 条入口 | http://localhost:8080/prototype-flows/flow.html |
| 1 | 壁纸独立入口 | http://localhost:8080/prototype-flows/01-wallpaper-entry.html |
| 2 | 主题独立入口 | http://localhost:8080/prototype-flows/02-theme-entry.html |
| 3 | 更换壁纸页 | http://localhost:8080/prototype-flows/03-change-wallpaper.html |
| 4 | 独立入口搜索 | http://localhost:8080/prototype-flows/04-search-independent.html |
| 5 | 编辑框架内搜索 | http://localhost:8080/prototype-flows/05-search-in-edit.html |

参考原页：http://localhost:8080/theme-list-prototype/flow.html

## 若 8080 未启动

在仓库根目录执行：

```bash
python3 -m http.server 8080
```
