const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', '_data', 'translations', 'case-studies', 'designSystem');

function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;
    if (hex && hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex && hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    } else {
        return "0, 0, 0";
    }
    return `${r}, ${g}, ${b}`;
}

function refactorFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    let data;
    try {
        data = JSON.parse(content);
    } catch (e) {
        console.error(`Error parsing ${filePath}:`, e);
        return;
    }

    // Already refactored?
    if (data.tokens) {
        console.log(`Already refactored: ${filePath}`);
        return;
    }

    const oldColors = data.colorPalette?.colors || [];
    const primaryColor = oldColors[0] || { name: "Primary", hex: "#000000", usage: "" };
    const secondaryColor = oldColors[1] || { name: "Secondary", hex: "#000000", usage: "" };

    const oldFonts = data.typography?.fonts || [];
    const primaryFont = oldFonts[0] || { name: "Inter", weights: "400, 500", category: "Sans" };

    const oldSizes = data.typography?.fontSizes || [];

    const newData = {
        title: data.title || "Design System",
        intro: data.intro || "Presentation of the design system components.",
        tokens: {
            colors: {
                primary: {
                    name: primaryColor.name,
                    hex: primaryColor.hex,
                    rgb: hexToRgb(primaryColor.hex),
                    usage: primaryColor.usage
                },
                secondary: {
                    name: secondaryColor.name,
                    hex: secondaryColor.hex,
                    rgb: hexToRgb(secondaryColor.hex),
                    usage: secondaryColor.usage
                },
                grayscale: {
                    dark: {
                        name: "Text Dark",
                        hex: "#111827",
                        rgb: "17, 24, 39",
                        usage: "Headings and primary text"
                    },
                    medium: {
                        name: "Text Medium",
                        hex: "#6B7280",
                        rgb: "107, 114, 128",
                        usage: "Body text and secondary info"
                    },
                    light: {
                        name: "Background Light",
                        hex: "#F3F4F6",
                        rgb: "243, 244, 246",
                        usage: "App backgrounds"
                    },
                    white: {
                        name: "Surface White",
                        hex: "#FFFFFF",
                        rgb: "255, 255, 255",
                        usage: "Card surfaces"
                    }
                }
            },
            typography: {
                primary: {
                    family: primaryFont.name,
                    weights: [400, 500, 600, 700], // Extracted from string is hard, defaulting
                    category: primaryFont.category
                },
                hierarchy: oldSizes.map(size => ({
                    name: size.name,
                    size: size.size,
                    weight: "400", // Defaulting as old schema didn't have specific weights per size usually
                    usage: size.usage
                }))
            },
            shape: {
                borderRadius: "8px",
                buttonRadius: "100px",
                inputRadius: "6px"
            }
        }
    };

    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf-8');
    console.log(`Refactored: ${filePath}`);
}

const folders = fs.readdirSync(baseDir);
for (const item of folders) {
    const itemPath = path.join(baseDir, item);
    if (fs.statSync(itemPath).isDirectory()) {
        const enFile = path.join(itemPath, 'en.json');
        const esFile = path.join(itemPath, 'es.json');

        if (fs.existsSync(enFile)) refactorFile(enFile);
        if (fs.existsSync(esFile)) refactorFile(esFile);
    }
}

console.log('Migration complete.');
