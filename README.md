# Nithish G - Professional Software Developer Portfolio

A fast, lightweight, and accessible single-page developer portfolio built strictly using standard **HTML5**, **CSS3**, and **Vanilla JavaScript** with zero external libraries or heavy dependencies.

---

## 🌟 Key Features

- **Single-Page Application (SPA) Architecture**: Completely tabbed content sections. Only the currently selected section is rendered in the viewport, delivering a focused, distraction-free reading experience.
- **Client-Side Hash Routing**: Supports direct deep-links (`#home`, `#personal`, `#skills`, `#experience`, `#projects`, `#education`, `#certifications`, `#contact`) and browser Back/Forward navigation with no page refreshes.
- **Ultra High-Performance**:
  - Zero external CSS/JS frameworks (no React, Vue, Bootstrap, or Tailwind runtime overhead).
  - Native system font stack eliminating font render-blocking and layout shifts.
  - Inlined SVG icons for instant rendering with zero network latency.
  - Respects `@media (prefers-reduced-motion: reduce)`.
- **Honest Recruiter Experience**:
  - Strictly adheres to authentic resume credentials.
  - Transparent mailto contact dispatch with prefilled subject/body and fallback copy buttons.
  - No simulated/fake submission spinners or fabricated statistics.

---

## 📁 File Structure

```text
portfolio/
│
├── index.html                  # Semantic single-page HTML5 structure
├── style.css                   # Dark theme design system & responsive layout
├── script.js                   # SPA hash router, navigation, & contact logic
│
├── assets/
│   ├── profile.webp            # Optimized developer avatar (400x400)
│   ├── avatar.svg              # Vector fallback graphic
│   └── NITHISH_G_Resume.pdf    # Official developer resume PDF
│
└── README.md                   # Documentation and deployment guide
```

---

## 🚀 Running Locally

Because this project is built entirely with standard web technologies, you do not need any build steps, `npm install`, or bundlers.

### Option 1: Python Built-in HTTP Server (Recommended)
Open your terminal in the `portfolio` root folder:

```bash
# Python 3
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Node.js `npx serve` or `http-server`
```bash
npx serve .
```

### Option 3: VS Code Live Server Extension
1. Open the folder in **VS Code**.
2. Right-click `index.html`.
3. Click **"Open with Live Server"**.

---

## 🔄 Customization Guide

### 1. Replacing Your Profile Image
1. Prepare your photograph (square aspect ratio, recommended `400x400` or `500x500` pixels).
2. Convert it to modern `.webp` format using any image converter or tool.
3. Replace `assets/profile.webp` with your new file (keep the same filename).
4. The page will immediately load your new photo with the built-in circular frame and ambient border.

### 2. Updating Your Resume PDF
1. Export your latest resume as a PDF.
2. Name the file `NITHISH_G_Resume.pdf`.
3. Place it inside the `assets/` directory, overwriting the existing placeholder:
   ```text
   assets/NITHISH_G_Resume.pdf
   ```
4. All download links on the website will instantly point to your updated document.

### 3. Updating Personal or Project Information
All text content is clean and cleanly structured in [index.html](index.html):
- **Hero & Headline**: Edit `<section id="home">` lines `94-118`.
- **Contact Details (Phone / Email / Location)**: Edit `<section id="personal">` lines `176-240` and `<section id="contact">`.
- **Skills Categories**: Edit `<section id="skills">` cards lines `276-390`.
- **Work Experience Roles**: Edit `<section id="experience">` timeline items lines `400-480`.
- **Projects**: Edit `<section id="projects">` articles lines `490-590`.

---

## 🌐 Deploying the Site

This static site can be hosted for free on any modern web host:

### Deploy to GitHub Pages
1. Push this folder to a GitHub repository (e.g. `https://github.com/Nithish450/portfolio`).
2. Navigate to repository **Settings** &rarr; **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://Nithish450.github.io/portfolio/`.

### Deploy to Vercel
1. Run `npx vercel` in the project root or import your GitHub repository at [vercel.com](https://vercel.com).
2. Leave default settings (Framework Preset: **Other**).
3. Click **Deploy**.

### Deploy to Netlify
1. Drag and drop the `portfolio/` folder into [Netlify Drop](https://app.netlify.com/drop).
2. Your site goes live in seconds.

### Deploy to cPanel / Traditional Hosting
1. Compress `index.html`, `style.css`, `script.js`, and the `assets/` directory into a `.zip` archive.
2. Log into your **cPanel** File Manager.
3. Navigate to `public_html/`.
4. Upload and extract the `.zip` archive.
5. Ensure file permissions are set to `644` for files and `755` for folders.

---

## ♿ Accessibility & Standards

- Follows **WCAG 2.1 AA** color contrast ratios.
- All interactive controls feature explicit keyboard `:focus-visible` indicators.
- Navigation links and mobile drawer include proper ARIA attributes (`aria-expanded`, `aria-controls`, `aria-current="page"`).
- Dynamic document titles update on route changes for assistive technology context.
