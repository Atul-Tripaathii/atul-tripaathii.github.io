// Portfolio content lives here. Edit this file to update the website without
// touching the layout or styling. Empty links are hidden automatically.
window.PORTFOLIO_CONTENT = {
  profile: {
    name: "Atul Tripathi",
    shortName: "AT",
    role: "Data Scientist · Applied AI",
    location: "Tirupati, India",
    email: "atultripaathii@gmail.com",
    github: "https://github.com/Atul-Tripaaathi",
    linkedin: "https://www.linkedin.com/in/halfcodeblood/",
    resume: "assets/Atul-Tripathi-Resume.pdf",
    availability: "Incoming Associate Consultant · Virtusa · Jan 2027",
    headline: "I turn data into decisions — and models into dependable systems.",
    intro:
      "Incoming Associate Consultant at Virtusa and M.Tech (DSAI) candidate at IIT Tirupati, focused on statistical modelling, machine learning, and production-minded AI — with applied work in RAG and computer vision.",
  },

  proof: [
    { value: "Grounded", label: "RAG responses backed by retrieved source passages" },
    { value: "30 FPS", label: "football analysis pipeline throughput" },
    { value: "Top 3.2%", label: "GATE 2025 performance" },
  ],

  projects: [
    {
      id: "mediq",
      category: "Generative AI",
      title: "MediQuery",
      subtitle: "Offline AI medical document assistant",
      dates: "Jan 2026 — Mar 2026",
      problem:
        "Medical LLM answers can sound confident even when they are not grounded in source material.",
      solution:
        "Designed an offline retrieval-augmented generation pipeline that converts PDFs into searchable chunks and constrains answers to verified documents.",
      impact: [
        "Indexed 10+ documents into 800-character chunks in under 2 minutes",
        "Retrieved the top 4 relevant chunks using cosine similarity",
        "Added retrieval and response checks to reduce unsupported answers",
        "Shipped a compact Gradio interface that runs without an API key or internet connection",
      ],
      stack: ["Python", "LangChain", "Llama 3.2", "Ollama", "ChromaDB", "Gradio", "PyPDF"],
      accent: "lime",
      link: "",
    },
    {
      id: "footvision",
      category: "Computer Vision",
      title: "FootVision",
      subtitle: "Automated football match analysis",
      dates: "Oct 2025 — Dec 2025",
      problem:
        "Manual match-stat tagging is slow and makes per-player movement analysis difficult to scale.",
      solution:
        "Built a four-module vision pipeline for tracking, team assignment, speed estimation, and automated annotation.",
      impact: [
        "Detected 22 players per frame at 30 FPS with 85%+ accuracy",
        "Used optical flow to correct camera motion across match footage",
        "Mapped pixels to real-world distances with under 5% positional error",
        "Generated player-level speed, distance, and possession statistics",
      ],
      stack: ["Python", "YOLOv5", "OpenCV", "Kalman Filter", "Optical Flow", "K-Means", "NumPy"],
      accent: "blue",
      link: "",
    },
  ],

  skillGroups: [
    {
      label: "Data Science / Statistics",
      note: "From exploration to defensible decisions",
      items: ["Python", "SQL", "Statistics", "Probability", "EDA", "Feature Engineering", "Pandas"],
    },
    {
      label: "Machine Learning",
      note: "Model development, evaluation, and interpretation",
      items: ["Regression", "Classification", "Clustering", "Cross-validation", "Model Evaluation", "scikit-learn", "NumPy"],
    },
    {
      label: "Applied AI",
      note: "NLP, retrieval, and computer-vision systems",
      items: ["LLMs", "RAG", "LangChain", "Hugging Face", "ChromaDB", "OpenCV", "YOLOv5"],
    },
    {
      label: "Engineering",
      note: "Tools used to package and communicate work",
      items: ["Git", "GitHub", "Gradio", "Matplotlib", "Seaborn", "JavaScript", "HTML", "CSS", "C++", "C"],
    },
  ],

  experience: [
    {
      role: "Associate Consultant (Incoming)",
      organization: "Virtusa",
      dates: "Joining January 2027",
      summary:
        "Selected to join Virtusa as an Associate Consultant, with an intended growth path across data science, machine learning, and applied AI through training and client delivery.",
    },
  ],

  leadership: [
    {
      role: "Founder",
      organization: "HopeToHope Foundation",
      dates: "Present",
      summary:
        "Co-founded and managed the “For the People Wall” initiative, coordinating collection, sorting, and distribution of stationery, clothing, books, and household essentials for underserved communities.",
    },
    {
      role: "Coordinator",
      organization: "TechFizz · Oriental College of Technology",
      dates: "2018 — 2022",
      summary:
        "Helped coordinate student technology activities and community participation across the undergraduate years.",
    },
    {
      role: "Coordinator",
      organization: "NSS Unit · Oriental College of Technology",
      dates: "Undergraduate tenure",
      summary:
        "Supported student-led social responsibility and community welfare initiatives.",
    },
  ],

  education: [
    {
      degree: "M.Tech in Computer Science (Data Science & Artificial Intelligence)",
      school: "Indian Institute of Technology, Tirupati",
      dates: "2025 — 2027",
      score: "CGPA 7.44",
      courses: ["Machine Learning", "Artificial Intelligence", "Deep Learning", "Data Science", "Probability"],
    },
    {
      degree: "B.Tech in Computer Science & Engineering",
      school: "Oriental College of Technology, Bhopal",
      dates: "2018 — 2022",
      score: "CGPA 8.91",
      courses: [],
    },
  ],

  certifications: [
    {
      title: "Agentic AI Foundation",
      issuer: "Oracle",
      link: "",
      logo: "assets/oracle-logo.svg",
      status: "Verified on request",
    },
    {
      title: "Machine Learning Specialization",
      issuer: "Coursera · Andrew Ng",
      link: "",
      logo: "assets/coursera-logo.svg",
      status: "Verified on request",
    },
    {
      title: "Divide and Conquer Algorithms",
      issuer: "Coursera · Stanford",
      link: "",
      logo: "assets/coursera-logo.svg",
      status: "Verified on request",
    },
    {
      title: "Complete Data Science, Machine Learning, Deep Learning & NLP Bootcamp",
      issuer: "Udemy · Krish Naik",
      link: "",
      mark: "U",
      status: "In progress · Expected Dec 2026",
      statusTone: "progress",
    },
    {
      title: "Complete Python with DSA Bootcamp + LeetCode Exercises",
      issuer: "Udemy · Krish Naik & Mayank Aggarwal",
      link: "",
      mark: "U",
      status: "In progress · Expected Dec 2026",
      statusTone: "progress",
    },
  ],

  achievements: [
    {
      value: "AIR 5691",
      title: "GATE 2025",
      detail: "Placed in the top 3.2% among approximately 180,000 candidates.",
    },
    {
      value: "13×",
      title: "State volleyball player",
      detail: "Represented at the state level thirteen times — a long-running lesson in composure, teamwork, and repetition.",
    },
  ],
};
