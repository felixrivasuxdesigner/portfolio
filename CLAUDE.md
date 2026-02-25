# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Félix Rivas, a UX/UI Designer. It is a static site built with Eleventy, featuring bilingual support (Spanish and English), and is deployed to GitHub Pages.

## Common Commands

```bash
# Development with live reload (port 8080)
npm run dev
# or
npm start

# Compile Sass only
npm run sass

# Compile and watch Sass changes
npm run sass:watch

# Production build (outputs to /docs with /portfolio/ prefix)
npm run build:prod
# or
ELEVENTY_ENV=production npm run build

# Simulate GitHub Pages locally (navigate to http://localhost:8000/portfolio/)
npm run serve:prod

# Clean output directory
npm run clean
```

## Architecture

### Tech Stack
- **Eleventy** (v2.0+) - Static site generator
- **Sass** - CSS preprocessor with 7-1 architecture
- **Nunjucks** - Template engine
- **JavaScript** - ES6+ modular JavaScript

### Directory Structure
```
src/
  _data/           # Site data and translation files
  _includes/       # Nunjucks components and layouts
    components/    # Reusable UI components
    layouts/       # Page layouts (base.njk, case-study.njk)
  assets/
    scss/          # 7-1 Sass architecture
    js/            # Modular JavaScript
    img/           # Images
  en/              # English pages
    case-studies/  # Case study pages (EN)
  es/              # Spanish pages
    case-studies/  # Case study pages (ES)
docs/              # Build output for GitHub Pages
```

### Case Studies
The portfolio contains case studies for: Nomadix, Factoring, Wallet, Radio DAO, IntelliResearch, JourneyLaw. Each has language-specific versions in `en/case-studies/` and `es/case-studies/`.

### Design System Architecture
Each case study can have its own design system with project-specific colors, typography, and components. Design system data lives in `src/_data/translations/case-studies/designSystem/{projectKey}/` and styles in `src/assets/scss/pages/_{projectKey}.scss`.

### Translations
Translation files are in JSON format under `src/_data/translations/`. Maintain parity between EN and ES versions when modifying content.

## Git Workflow
- `main` branch: Production-ready code (protected, requires PR)
- Feature branches: Create from main for changes
- Commit messages in Spanish describing changes

## Key Conventions
- 2 spaces for indentation
- CSS classes in kebab-case
- JavaScript variables in camelCase
- Comments in Spanish or English depending on context
- Images use WebP format where possible
