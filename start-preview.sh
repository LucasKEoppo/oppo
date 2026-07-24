#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
PORT="${1:-8080}"
echo ""
echo "  打开这个地址："
echo "  http://127.0.0.1:${PORT}/flows.html"
echo ""
exec python3 -m http.server "$PORT" --bind 127.0.0.1
