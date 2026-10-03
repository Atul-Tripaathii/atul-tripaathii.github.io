const content = window.PORTFOLIO_CONTENT;

const escapeHTML = (value = "") =>
  String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);

const renderTags = (items) =>
  items.map((item) => `<span class="tag">${escapeHTML(item)}</span>`).join("");

const renderProof = () => {
  document.querySelector("#proof-grid").innerHTML = content.proof
    .map(
      (item, index) => `
        <article class="proof-item reveal" style="--delay:${index * 70}ms">
          <strong>${escapeHTML(item.value)}</strong>
          <span>${escapeHTML(item.label)}</span>
        </article>`,
    )
    .join("");
};

const renderProjects = (filter = "All") => {
  const projects = content.projects.filter(
    (project) => filter === "All" || project.category === filter,
  );

  document.querySelector("#projects-grid").innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card reveal" data-accent="${escapeHTML(project.accent)}" style="--delay:${index * 90}ms">
          <div class="project-topline">
            <span class="eyebrow">${escapeHTML(project.category)}</span>
            <span class="project-date">${escapeHTML(project.dates)}</span>
          </div>
          <div class="project-heading">
            <div>
              <span class="project-index">0${index + 1}</span>
              <h3>${escapeHTML(project.title)}</h3>
            </div>
            <p>${escapeHTML(project.subtitle)}</p>
          </div>
          <div class="project-story">
            <div>
              <span class="story-label">The problem</span>
              <p>${escapeHTML(project.problem)}</p>
            </div>
            <div>
              <span class="story-label">The build</span>
              <p>${escapeHTML(project.solution)}</p>
            </div>
          </div>
          <details>
            <summary>Measured outcomes <span aria-hidden="true">+</span></summary>
            <ul>${project.impact.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
          </details>
          <div class="project-footer">
            <div class="tags">${renderTags(project.stack)}</div>
            ${
              project.link
                ? `<a class="text-link" href="${escapeHTML(project.link)}" target="_blank" rel="noreferrer">View project</a>`
                : `<span class="case-label">Case study</span>`
            }
          </div>
        </article>`,
    )
    .join("");

  observeReveals();
};

const renderProjectFilters = () => {
  const filters = ["All", ...new Set(content.projects.map((project) => project.category))];
  document.querySelector("#project-filters").innerHTML = filters
    .map(
      (filter, index) => `
        <button class="filter-button${index === 0 ? " is-active" : ""}" type="button" data-filter="${escapeHTML(filter)}">
          ${filter === "All" ? "All work" : escapeHTML(filter)}
        </button>`,
    )
    .join("");
};

const renderSkills = () => {
  document.querySelector("#skills-grid").innerHTML = content.skillGroups
    .map(
      (group, index) => `
        <article class="skill-row reveal" style="--delay:${index * 65}ms">
          <div class="skill-title">
            <span>0${index + 1}</span>
            <div>
              <h3>${escapeHTML(group.label)}</h3>
              <p>${escapeHTML(group.note)}</p>
            </div>
          </div>
          <div class="tags skill-tags">${renderTags(group.items)}</div>
        </article>`,
    )
    .join("");
};

const renderExperience = () => {
  const professional = content.experience.length
    ? content.experience
        .map(
          (item) => `
          <article class="timeline-item reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-meta">${escapeHTML(item.dates)}</div>
            <div class="timeline-copy">
              <h3>${escapeHTML(item.role)}</h3>
              <p class="timeline-org">${escapeHTML(item.organization)}</p>
              <p>${escapeHTML(item.summary)}</p>
            </div>
          </article>`,
        )
        .join("")
    : `
      <article class="next-role reveal">
        <span class="pulse" aria-hidden="true"></span>
        <div>
          <p class="eyebrow">Professional experience</p>
          <h3>The next chapter starts here.</h3>
          <p>${escapeHTML(content.profile.availability)}. This section is data-driven and ready for the first company role.</p>
        </div>
        <a class="button button-secondary" href="#contact">Start a conversation</a>
      </article>`;

  document.querySelector("#experience-list").innerHTML = professional;
  document.querySelector("#leadership-list").innerHTML = content.leadership
    .map(
      (item, index) => `
        <article class="timeline-item reveal" style="--delay:${index * 70}ms">
          <div class="timeline-dot"></div>
          <div class="timeline-meta">${escapeHTML(item.dates)}</div>
          <div class="timeline-copy">
            <h3>${escapeHTML(item.role)}</h3>
            <p class="timeline-org">${escapeHTML(item.organization)}</p>
            <p>${escapeHTML(item.summary)}</p>
          </div>
        </article>`,
    )
    .join("");
};

const renderEducation = () => {
  document.querySelector("#education-list").innerHTML = content.education
    .map(
      (item, index) => `
        <article class="education-card reveal" style="--delay:${index * 80}ms">
          <div class="education-year">${escapeHTML(item.dates)}</div>
          <div>
            <h3>${escapeHTML(item.degree)}</h3>
            <p class="education-school">${escapeHTML(item.school)}</p>
            ${item.courses.length ? `<div class="tags">${renderTags(item.courses)}</div>` : ""}
          </div>
          <strong>${escapeHTML(item.score)}</strong>
        </article>`,
    )
    .join("");
};

const renderCredentials = () => {
  document.querySelector("#certifications-grid").innerHTML = content.certifications
    .map((item, index) => {
      const identity = item.logo
        ? `<span class="cert-mark cert-logo"><img src="${escapeHTML(item.logo)}" alt="" /></span>`
        : `<span class="cert-mark">${escapeHTML(item.mark)}</span>`;
      const body = `
        ${identity}
        <span>
          <strong>${escapeHTML(item.title)}</strong>
          <small>${escapeHTML(item.issuer)}</small>
        </span>
        <span class="cert-status">Verified on request</span>`;
      return item.link
        ? `<a class="cert-card reveal" href="${escapeHTML(item.link)}" target="_blank" rel="noreferrer" style="--delay:${index * 75}ms">${body}</a>`
        : `<article class="cert-card reveal" style="--delay:${index * 75}ms">${body}</article>`;
    })
    .join("");

  document.querySelector("#achievements-grid").innerHTML = content.achievements
    .map(
      (item, index) => `
        <article class="achievement-card reveal" style="--delay:${index * 80}ms">
          <strong>${escapeHTML(item.value)}</strong>
          <div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.detail)}</p>
          </div>
        </article>`,
    )
    .join("");
};

const hydrateProfile = () => {
  const profile = content.profile;
  document.querySelectorAll("[data-profile='name']").forEach((el) => (el.textContent = profile.name));
  document.querySelectorAll("[data-profile='shortName']").forEach((el) => (el.textContent = profile.shortName));
  document.querySelectorAll("[data-profile='email']").forEach((el) => {
    const label = el.querySelector("[data-profile-email-label]");
    if (label) label.textContent = profile.email;
    else el.textContent = profile.email;
    if (el.tagName === "A") el.href = `mailto:${profile.email}`;
  });
  document.querySelector("#hero-headline").textContent = profile.headline;
  document.querySelector("#hero-intro").textContent = profile.intro;
  document.querySelector("#availability-text").textContent = profile.availability;
  document.querySelector("#resume-link").href = profile.resume;
  document.querySelector("#resume-link-footer").href = profile.resume;
  document.querySelector("#github-link").href = profile.github;
  document.querySelector("#linkedin-link").href = profile.linkedin;
  document.querySelector("#contact-form").action = `https://formsubmit.co/${profile.email}`;
  document.querySelector("#year").textContent = new Date().getFullYear();
};

let revealObserver;
const observeReveals = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
  }
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
};

const setupProjectFilters = () => {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderProjects(button.dataset.filter);
    });
  });
};

const setupTheme = () => {
  const button = document.querySelector("#theme-toggle");
  const savedTheme = localStorage.getItem("atul-theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;

  const updateLabel = () => {
    const light = document.documentElement.dataset.theme === "light";
    button.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    button.querySelector("span").textContent = light ? "Dark" : "Light";
  };

  updateLabel();
  button.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("atul-theme", next);
    updateLabel();
  });
};

const setupNavigation = () => {
  const menuButton = document.querySelector("#menu-toggle");
  const nav = document.querySelector("#site-nav");
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }),
  );

  const sections = document.querySelectorAll("main section[id]");
  const links = [...document.querySelectorAll("#site-nav a")];
  const navObserver = new IntersectionObserver(
    (entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      links.forEach((link) => link.classList.toggle("is-active", link.hash === `#${active.target.id}`));
    },
    { rootMargin: "-35% 0px -55%", threshold: [0.05, 0.25, 0.5] },
  );
  sections.forEach((section) => navObserver.observe(section));
};

const setupUtilities = () => {
  const progress = document.querySelector("#scroll-progress");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelector("#copy-email").addEventListener("click", async () => {
    const button = document.querySelector("#copy-email");
    try {
      await navigator.clipboard.writeText(content.profile.email);
      button.textContent = "Email copied";
    } catch {
      window.location.href = `mailto:${content.profile.email}`;
    }
    window.setTimeout(() => (button.textContent = "Copy email"), 1800);
  });
};

hydrateProfile();
renderProof();
renderProjects();
renderProjectFilters();
renderSkills();
renderExperience();
renderEducation();
renderCredentials();
setupProjectFilters();
setupTheme();
setupNavigation();
setupUtilities();
observeReveals();
