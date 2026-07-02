from pathlib import Path

from PIL import Image

LOGO_DIR = Path(__file__).resolve().parents[1] / 'public' / 'images' / 'logo'


def is_fish_pixel(r, g, b):
    spread = max(r, g, b) - min(r, g, b)
    luminance = (r + g + b) / 3

    if spread < 14 and min(r, g, b) > 170:
        return False

    if luminance > 188 and (r - b) < 85:
        return False

    if r > 100 and g > 45 and r > g > b and (r - b) > 35:
        return True

    return False


def extract_fish_lines(im):
    im = im.convert('RGBA')
    px = im.load()
    w, h = im.size

    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            if is_fish_pixel(r, g, b):
                px[x, y] = (r, g, b, 255)
            else:
                px[x, y] = (r, g, b, 0)

    return im


def crop_to_content(im, max_y_ratio=1.0):
    px = im.load()
    w, h = im.size
    limit_y = int(h * max_y_ratio)
    min_x, min_y, max_x, max_y = w, h, 0, 0
    found = False

    for y in range(limit_y):
        for x in range(w):
            if px[x, y][3] > 16:
                found = True
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)

    if not found:
        return im

    pad = max(4, int(max(w, h) * 0.03))
    return im.crop((
        max(0, min_x - pad),
        max(0, min_y - pad),
        min(w, max_x + pad + 1),
        min(h, max_y + pad + 1),
    ))


def process(path, max_y_ratio=1.0):
    im = Image.open(path)
    im = extract_fish_lines(im)
    im = crop_to_content(im, max_y_ratio=max_y_ratio)
    im.save(path, optimize=True)
    return im.size


if __name__ == '__main__':
    print('icon ->', process(LOGO_DIR / 'logo-icon.png'))
    icon = Image.open(LOGO_DIR / 'logo-icon.png')
    icon.save(LOGO_DIR / 'logo-header.png', optimize=True)
    print('header -> copied from icon', icon.size)
