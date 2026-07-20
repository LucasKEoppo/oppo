#!/usr/bin/env bash
# 在本机仓库根目录启动预览服务（不要用云端 localhost）
set -euo pipefail
cd "$(dirname "$0")"
PORT="${1:-8080}"
echo "=============================================="
echo "  原型预览已启动"
echo "  请在本机浏览器打开："
echo "  http://127.0.0.1:${PORT}/flows.html"
echo "  http://127.0.0.1:${PORT}/prototype-flows/flow.html"
echo "  http://127.0.0.1:${PORT}/theme-list-prototype/flow.html"
echo "=============================================="
exec python3 -m http.server "$PORT" --bind 127.0.0.1
