# 5 条交互流程图（从头重建）

版式与你能打开的 `theme-list-prototype/flow.html` **完全同款**。

## 本机打开（唯一推荐方式）

在**你自己电脑**的仓库根目录执行：

```bash
git fetch origin
git checkout cursor/prototype-flow-boards-e12a
git pull origin cursor/prototype-flow-boards-e12a

python3 -m http.server 8080
```

浏览器打开：

**http://127.0.0.1:8080/flows.html**

## 5 条直链

1. http://127.0.0.1:8080/wallpaper-labels/flow.html
2. http://127.0.0.1:8080/theme-list-prototype/flow.html
3. http://127.0.0.1:8080/wallpaper-labels/change-flow.html
4. http://127.0.0.1:8080/search-prototype/flow.html
5. http://127.0.0.1:8080/search-prototype/in-edit-flow.html

> 不要点 GitHub 上的 `.html` 源码页；也不要用云端对话里的 localhost（那是远程机器，你电脑访问不到）。

## 本地下载包

仓库根目录文件：**五条交互流程图.zip**（约 5.3MB）

解压后双击 `打开这里.html` 即可离线查看 5 条流程图，无需启动 python 服务。
