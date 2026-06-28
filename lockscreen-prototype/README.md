# 锁屏付费资源交互原型

模拟锁屏编辑页点击「应用」后的付费资源弹窗流程。

## 交互流程

```
锁屏编辑页
  └─ 点击「应用」
       └─ 弹窗1：「***」为付费资源
            ├─ 做任务免费领 → 弹窗4：免费领（金币进度）
            ├─ ¥ 6.0 购买   → 弹窗3：购买方式（VIP / 单次购买）
            └─ 取消         → 关闭弹窗
```

## 预览

在浏览器中打开 `index.html`，或启动本地服务：

```bash
cd lockscreen-prototype
python3 -m http.server 8081
```

访问 http://localhost:8081/index.html

## 自定义资源名

修改 `app.js` 中的 `RESOURCE_NAME` 即可更换弹窗标题中的资源名称。
