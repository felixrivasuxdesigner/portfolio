import json

sketch_colors = {
  "Basic/black-100": "#000000",
  "Basic/black-25": "#d1d1d1",
  "Basic/black-5": "#eff1f1",
  "Brand/grey": "#686868",
  "Brand/orange": "#f16b23",
  "Indication/danger": "#ff453a",
  "Indication/Info": "#0a83ff",
  "Basic/withe-100": "#ffffff",
  "Complementary/navy": "#112a3c",
  "Complementary/blue": "#1f5275",
  "Indication/Warning": "#ff9f0a",
  "Indication/Success": "#2fd157"
}

def hex_to_rgb(hex_code):
    h = hex_code.lstrip('#')
    return f"{int(h[0:2], 16)}, {int(h[2:4], 16)}, {int(h[4:6], 16)}"

def generate_color_entry(name, hex_code, usage_en, usage_es):
    return {
        "name": name,
        "hex": hex_code,
        "rgb": hex_to_rgb(hex_code),
        "usage_en": usage_en,
        "usage_es": usage_es
    }

# Restructuring colors based on logical grouping
new_colors_en = {
    "primary": generate_color_entry("Brand Orange", sketch_colors["Brand/orange"], "Primary accent color for CTAs", "Color de acento principal para llamados a la acción (CTAs)"),
    "secondary": generate_color_entry("Brand Blue", sketch_colors["Complementary/blue"], "Secondary brand color", "Color secundario de la marca"),
    "grayscale": {
        "dark": generate_color_entry("Brand Black", sketch_colors["Basic/black-100"], "Primary color for text and deep backgrounds", "Color principal para textos y fondos profundos"),
        "medium": generate_color_entry("Brand Grey", sketch_colors["Brand/grey"], "Neutral elements and secondary text", "Elementos neutros y textos secundarios"),
        "light": generate_color_entry("Light Gray", sketch_colors["Basic/black-25"], "Borders and dividers", "Bordes y divisores"),
        "white": generate_color_entry("Brand White", sketch_colors["Basic/withe-100"], "Surfaces and text", "Superficies y textos"),
        "navy": generate_color_entry("Brand Navy", sketch_colors["Complementary/navy"], "Tertiary brand color", "Color terciario de la marca"),
        "extra_light": generate_color_entry("Extra Light Gray", sketch_colors["Basic/black-5"], "Subtle background panels", "Paneles de fondo sutiles"),
        "danger": generate_color_entry("Danger", sketch_colors["Indication/danger"], "Errors and destructive actions", "Errores y acciones destructivas"),
        "info": generate_color_entry("Info", sketch_colors["Indication/Info"], "Informational messages", "Mensajes informativos"),
        "warning": generate_color_entry("Warning", sketch_colors["Indication/Warning"], "Warnings and alerts", "Advertencias y alertas"),
        "success": generate_color_entry("Success", sketch_colors["Indication/Success"], "Successful actions", "Acciones exitosas")
    }
}

en_file = "/Users/felixrivas/Projects/Portfolio/src/_data/translations/case-studies/designSystem/nomadix/en.json"
es_file = "/Users/felixrivas/Projects/Portfolio/src/_data/translations/case-studies/designSystem/nomadix/es.json"

def apply_colors(filename, lang):
    with open(filename, 'r') as f:
        data = json.load(f)
    
    # Restructure color data for specific language
    lang_colors = {}
    
    for key in ["primary", "secondary"]:
        entry = dict(new_colors_en[key])
        entry["usage"] = entry.pop(f"usage_{lang}")
        if f"usage_es" in entry: del entry["usage_es"]
        if f"usage_en" in entry: del entry["usage_en"]
        if lang == "es":
            name_map = {"Brand Orange": "Naranja Marca", "Brand Blue": "Azul Marca"}
            entry["name"] = name_map.get(entry["name"], entry["name"])
        lang_colors[key] = entry
        
    lang_colors["grayscale"] = {}
    
    for color_key, color_val in new_colors_en["grayscale"].items():
        entry = dict(color_val)
        entry["usage"] = entry.pop(f"usage_{lang}")
        if f"usage_es" in entry: del entry["usage_es"]
        if f"usage_en" in entry: del entry["usage_en"]
        
        # Translate name for Spanish
        if lang == "es":
            name_map = {
                "Brand Black": "Negro Marca",
                "Brand Navy": "Marino Marca",
                "Brand Grey": "Gris Marca",
                "Brand White": "Blanco Marca",
                "Light Gray": "Gris Claro",
                "Extra Light Gray": "Gris Extra Claro",
                "Danger": "Peligro",
                "Info": "Información",
                "Warning": "Advertencia",
                "Success": "Éxito"
            }
            entry["name"] = name_map.get(entry["name"], entry["name"])

        lang_colors["grayscale"][color_key] = entry

    # Overwrite the old colors section
    data["tokens"]["colors"] = lang_colors

    with open(filename, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

apply_colors(en_file, "en")
apply_colors(es_file, "es")

print("Color definitions updated.")
