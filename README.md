# Atul Tripathi — AI/ML Portfolio

A responsive, recruiter-focused portfolio built with plain HTML, CSS, JavaScript, and a lightweight Three.js WebGL scene. It requires no package installation or build command.

## What is included

- Animated Three.js background made from instanced 3D box geometry
- Wireframe and translucent cubes with depth, drift, rotation, and pointer parallax
- CSS geometric fallback when WebGL is unavailable
- Reduced-motion support for accessibility
- Dark and light themes with a restrained graphite-and-steel palette
- Self-hosted IBM Plex Mono and Manrope fonts
- Projects, skills, experience, education, certifications, and achievements
- Downloadable résumé
- Responsive navigation and layouts
- Contact form powered by FormSubmit
- Automatic GitHub Pages deployment workflow

## Project structure

```text
.
├── .github/workflows/deploy-pages.yml  # Automatic GitHub Pages deployment
├── dist/
│   ├── index.html                      # Page structure and metadata
│   ├── content.js                      # Portfolio data you will update
│   ├── app.js                          # Rendering and interactions
│   ├── styles.css                      # Complete visual system
│   ├── three-scene.js                  # Three.js cube animation
│   ├── assets/                         # Logo, résumé, and fonts
│   └── vendor/                         # Self-hosted Three.js modules
└── README.md
```

## Update your content

Most future edits only require changing [`dist/content.js`](dist/content.js). It contains your profile, links, projects, technical skills, experience, leadership, education, certifications, and achievements.

The `experience` array is intentionally ready for your first company role. Add a record in this format:

```js
experience: [
  {
    role: "Machine Learning Engineer",
    organization: "Company Name",
    dates: "2027 — Present",
    summary: "Describe the product, your contribution, and a measurable result.",
  },
],
```

Project and certification records support an optional `link`. Use an empty string to hide the action until you have a repository, demo, or credential URL.

## Run locally

From the repository directory:

```bash
python3 -m http.server 4173 --directory dist
```

Open [http://localhost:4173](http://localhost:4173). A local server is required because the Three.js scene uses JavaScript modules.

## Publish free with GitHub Pages

### 1. Create the repository

Create a new empty repository on GitHub. Choose one naming pattern:

- `Atul-Tripaaathi.github.io` for `https://Atul-Tripaaathi.github.io/`
- Any other name, such as `portfolio`, for `https://Atul-Tripaaathi.github.io/portfolio/`

Do not initialize the GitHub repository with another README because this project already contains one.

### 2. Push this project

Replace `<repository-name>` below with the repository you created:

```bash
git remote add origin https://github.com/Atul-Tripaaathi/<repository-name>.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

In the GitHub repository:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open the **Actions** tab and wait for “Deploy portfolio to GitHub Pages” to finish.
4. Open the deployment URL shown in the workflow summary.

Every later push to `main` or `master` automatically publishes the latest `dist/` folder.

## Contact form activation

The contact form uses FormSubmit's free email relay. The first real submission triggers a one-time activation email at `atultripaathii@gmail.com`. Confirm that email once; later portfolio messages will arrive in the same inbox.

No FormSubmit password or API key is stored in this repository. If you change your email in `dist/content.js`, activate the new address through FormSubmit again.

## Optional custom domain

GitHub's free `github.io` address works immediately. If you later buy a custom domain, add it under **Settings → Pages → Custom domain** and follow GitHub's DNS instructions. Do not add a `CNAME` file until you know the exact domain.

## Technology

- Semantic HTML5
- Modern responsive CSS
- Vanilla JavaScript
- Three.js 0.186.1, vendored locally
- GitHub Actions and GitHub Pages
