import zipfile
import json
import sys

sketch_file = sys.argv[1]

with zipfile.ZipFile(sketch_file, 'r') as z:
    with z.open('document.json') as f:
        doc = json.load(f)

def parse_color(c):
    r = int(c.get('red', 0) * 255)
    g = int(c.get('green', 0) * 255)
    b = int(c.get('blue', 0) * 255)
    a = c.get('alpha', 1.0)
    if a < 1.0:
        return f"rgba({r}, {g}, {b}, {a:.2f})"
    else:
        return f"#{r:02x}{g:02x}{b:02x}"

colors = {}

def add_colors(source, source_name):
    print(f"Checking {source_name}...")
    
    if isinstance(source, list):
        for i, item in enumerate(source):
             if 'value' in item:
                 name = item.get('name', f"{source_name}_{i}")
                 colors[name] = parse_color(item['value'])
             elif 'red' in item and 'green' in item and 'blue' in item:
                 name = item.get('name', f"{source_name}_{i}")
                 colors[name] = parse_color(item)

# 1. sharedSwatches
if 'sharedSwatches' in doc and 'objects' in doc['sharedSwatches']:
    add_colors(doc['sharedSwatches']['objects'], 'sharedSwatches')

# 2. assets -> colorAssets
if 'assets' in doc and 'colorAssets' in doc['assets']:
    add_colors(doc['assets']['colorAssets'], 'assets.colorAssets')

# 3. assets -> colors
if 'assets' in doc and 'colors' in doc['assets']:
    add_colors(doc['assets']['colors'], 'assets.colors')

print("\nFinal Collected Colors:")
print(json.dumps(colors, indent=2))
