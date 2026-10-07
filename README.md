# Atul Tripathi — Portfolio

This repository contains the code for my personal portfolio: [atul-tripaathii.github.io](https://atul-tripaathii.github.io/).

I am currently pursuing an M.Tech in Data Science and Artificial Intelligence at IIT Tirupati. I will be joining Virtusa as an Associate Consultant in January 2027, and I am working towards a career in data science and applied machine learning. I also enjoy building with generative AI, retrieval systems, and computer vision when they are the right fit for a problem.

I built this site to keep my work, skills, education, and credentials in one place. I wanted it to feel personal and easy to explore without depending on a large framework or a complicated build process.

## What you will find here

- Selected projects with the problem, approach, tools, and measured results
- A skills section centred on data science, statistics, machine learning, and applied AI
- My incoming role at Virtusa, along with education and leadership experience
- Completed credentials and courses that are currently in progress
- My résumé, social profiles, and a contact form
- A cursor-responsive Three.js particle background with a simpler fallback for unsupported devices

I am currently working through Krish Naik's Data Science/ML/DL/NLP bootcamp and the Python with DSA bootcamp on Udemy. They are marked as **in progress** on the website and will be updated with certificate links after completion.

## Project structure

```text
.
├── .github/workflows/deploy-pages.yml  # GitHub Pages deployment
├── dist/
│   ├── index.html                      # Page structure and metadata
│   ├── content.js                      # Profile and portfolio content
│   ├── app.js                          # Rendering and interactions
│   ├── styles.css                      # Layout, themes, and responsive styles
│   ├── three-scene.js                  # Interactive particle background
│   ├── assets/                         # Portrait, logos, résumé, and fonts
│   └── vendor/                         # Local Three.js files
└── README.md
```

## Updating the portfolio

Most content changes can be made in [`dist/content.js`](dist/content.js). The profile, project cards, skills, experience, education, certifications, and achievements all live there.

For example, a new professional role can be added like this:

```js
{
  role: "Data Scientist",
  organization: "Company name",
  dates: "2027 — Present",
  summary: "Explain what you worked on, what you contributed, and what changed as a result.",
}
```

### Adding a project

Add another object to the `projects` array in `dist/content.js`:

```js
{
  id: "project-slug",
  category: "Machine Learning",
  title: "Project name",
  subtitle: "A short description of the project",
  dates: "Month Year — Month Year",
  problem: "What problem were you trying to solve?",
  solution: "What did you build and why did you choose that approach?",
  impact: [
    "An honest result that you measured",
    "Another useful finding or engineering outcome",
  ],
  stack: ["Python", "Pandas", "scikit-learn"],
  accent: "blue",
  link: "https://github.com/your-account/project",
}
```

The category also becomes a project filter. Keep each `id` unique, use either `blue` or `lime` for the accent, and leave `link` empty until the repository or demo is ready.

## Running it locally

No packages need to be installed. From the repository folder, run:

```bash
python3 -m http.server 4173 --directory dist
```

Then open [http://localhost:4173](http://localhost:4173). A local server is needed because the Three.js background loads through JavaScript modules.

## Publishing changes

The site is hosted with GitHub Pages. After editing the files, I publish an update with:

```bash
git add dist README.md
git commit -m "Update portfolio content"
git pull --rebase origin main
git push origin main
```

The workflow in `.github/workflows/deploy-pages.yml` publishes the `dist` folder automatically. The deployment progress can be checked in the repository's **Actions** tab.

## Contact form

The form uses FormSubmit and sends messages to `atultripaathii@gmail.com`. FormSubmit sends a confirmation email the first time the address is used. After that one-time confirmation, new messages from the portfolio arrive in the same inbox.

No password or API key is included in this repository.

## Built with

- HTML, CSS, and vanilla JavaScript
- Three.js for the interactive background
- Self-hosted IBM Plex Mono and Manrope fonts
- GitHub Actions and GitHub Pages
