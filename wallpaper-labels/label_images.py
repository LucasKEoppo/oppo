#!/usr/bin/env python3
"""
批量为壁纸图片添加右上角「免费」/「付费」标识

规则：
  - 绿野闲行 栏目 → 免费
  - 其他栏目     → 付费

用法：
  python label_images.py --input ./images/绿野闲行 --category 绿野闲行 --output ./output/绿野闲行
  python label_images.py --input ./images/青空漫行 --category 青空漫行 --output ./output/青空漫行
"""

import argparse
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

FREE_CATEGORY = "绿野闲行"

BADGE_CONFIG = {
    "免费": {"bg": (76, 175, 80, 235), "text": (255, 255, 255, 255)},
    "付费": {"bg": (255, 152, 0, 235), "text": (255, 255, 255, 255)},
}

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}


def get_label(category_name: str) -> str:
    return "免费" if category_name == FREE_CATEGORY else "付费"


def find_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    font_paths = [
        "/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc",
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
        "/System/Library/Fonts/PingFang.ttc",
        "C:/Windows/Fonts/msyh.ttc",
        "C:/Windows/Fonts/simhei.ttf",
    ]
    for path in font_paths:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def add_badge(image: Image.Image, label: str) -> Image.Image:
    img = image.convert("RGBA")
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    config = BADGE_CONFIG[label]
    font_size = max(14, img.width // 22)
    font = find_font(font_size)

    bbox = draw.textbbox((0, 0), label, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]

    padding_x = max(6, img.width // 40)
    padding_y = max(3, img.height // 80)
    badge_w = text_w + padding_x * 2
    badge_h = text_h + padding_y * 2

    margin = max(6, img.width // 50)
    x = img.width - badge_w - margin
    y = margin
    radius = max(4, img.width // 60)

    draw.rounded_rectangle(
        [x, y, x + badge_w, y + badge_h],
        radius=radius,
        fill=config["bg"],
    )
    draw.text(
        (x + padding_x, y + padding_y - bbox[1]),
        label,
        font=font,
        fill=config["text"],
    )

    return Image.alpha_composite(img, overlay)


def process_directory(input_dir: Path, output_dir: Path, category_name: str) -> int:
    label = get_label(category_name)
    output_dir.mkdir(parents=True, exist_ok=True)
    count = 0

    for file_path in sorted(input_dir.iterdir()):
        if file_path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            continue

        with Image.open(file_path) as img:
            result = add_badge(img, label)

        out_path = output_dir / file_path.name
        if file_path.suffix.lower() in {".jpg", ".jpeg"}:
            result = result.convert("RGB")
        result.save(out_path, quality=95)
        print(f"  [{label}] {file_path.name} → {out_path}")
        count += 1

    return count


def main():
    parser = argparse.ArgumentParser(description="为壁纸图片批量添加免费/付费标识")
    parser.add_argument("--input", "-i", required=True, help="输入图片目录")
    parser.add_argument("--output", "-o", required=True, help="输出目录")
    parser.add_argument(
        "--category", "-c", required=True,
        help=f"栏目名称（如：{FREE_CATEGORY}、青空漫行、幻彩花绽）",
    )
    args = parser.parse_args()

    input_dir = Path(args.input)
    output_dir = Path(args.output)
    category_name = args.category

    if not input_dir.is_dir():
        raise SystemExit(f"输入目录不存在: {input_dir}")

    label = get_label(category_name)
    print(f"栏目: {category_name} → 标识: {label}")
    print(f"输入: {input_dir}")
    print(f"输出: {output_dir}")
    print("-" * 40)

    count = process_directory(input_dir, output_dir, category_name)
    print("-" * 40)
    print(f"完成，共处理 {count} 张图片")


if __name__ == "__main__":
    main()
