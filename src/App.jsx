import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatusBar from './components/StatusBar';
import FlipTextReveal from './components/FlipTextReveal';
import GlowingEffect from './components/GlowingEffect';
import WebcamPixelGrid from './components/WebcamPixelGrid';
import CardTilt3D from './components/CardTilt3D';
import DotShaderBackground from './components/DotShaderBackground';
import PeriodicTable from './components/PeriodicTable';
import './App.css';

const PROFILE = {
  name: 'Shreyas Mene',
  title: 'Full Stack Developer & AI/ML Enthusiast',
  tagline: 'Building the future, one line of code at a time',
  education: {
    degree: 'B.Tech Computer Science and Engineering',
    specialization: 'Artificial Intelligence and Machine Learning',
    university: 'VIT Bhopal University',
    year: 'Second Year',
    cgpa: '9.02'
  },
  schooling: {
    school: 'Delhi Public School, Bhilai',
    degree: 'Higher Secondary Education in Science with Computer Science',
    location: 'Bhilai, IND',
    duration: 'Mar 2020 – May 2024',
    class12: '86.7%',
    class10: '89.91%'
  },
  certifications: [
    { name: 'Joy of Computing using Python', provider: 'NPTEL', badge: 'Elite Gold (Top 5%)' },
    { name: 'Programming in Java', provider: 'NPTEL', badge: 'Elite Silver' },
    { name: 'Introduction to Generative AI', provider: 'Google', badge: null },
    { name: 'Applied Machine Learning in Python', provider: 'University of Michigan', badge: null },
    { name: 'Python for Data Science, AI & Development', provider: 'IBM', badge: null }
  ],
  experience: [
    {
      role: 'Intern',
      company: 'Vicharanashala Lab for Education Design',
      duration: 'May 2026 – Present',
      description: 'Worked on real-world open-source projects focused on India-centric problem statements',
      highlights: [
        'Contributed to live repositories with real-world impact',
        'Collaborated with mentors and team members on active projects',
        'Worked in a structured development environment',
        'Followed industry workflows like Git, pull requests, and code reviews'
      ]
    },
    {
      role: 'MERN Stack Developer Intern',
      company: 'IIT Ropar',
      duration: 'May 2025 – Dec 2025',
      description: 'Built robust web applications with hands-on experience in full-stack development',
      highlights: [
        'Developed scalable web applications using MERN stack',
        'Collaborated with research teams on innovative projects',
        'Implemented best practices in code quality and testing'
      ]
    }
  ],
  skills: {
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'TypeScript'],
    backend: ['Express', 'Python', 'MongoDB', 'MySQL'],
    languages: ['Java', 'C++', 'Python'],
    tools: ['Git', 'GitHub', 'Postman', 'CI/CD']
  },
  projects: [
    {
      name: 'VaxTrust',
      tech: ['Python', 'Flask', 'React', 'React Native', 'Firebase', 'scikit-learn', 'NumPy', 'Pandas'],
      description: 'AI-driven transparency platform democratizing vaccine safety data through decentralized peer reporting and automated anomaly detection. Utilizes an ensemble of user feedback and official health records to generate dynamic trust scores, identifying safety signals with 90% anomaly detection precision across distributed vaccine batches.',
      icon: 'ri-health-book-line',
      liveUrl: 'https://nimble-rolypoly-04e203.netlify.app/',
      sourceUrl: null
    },
    {
      name: 'CatXForest',
      tech: ['Python', 'Flask', 'scikit-learn', 'XGBoost', 'CatBoost', 'Chart.js'],
      description: 'AI-powered career recommendation system using hybrid ensemble learning (Random Forest + XGBoost + CatBoost) with 84.97% accuracy across 17 career categories. Features real-time predictions and visual analytics.',
      icon: 'ri-graduation-cap-line',
      liveUrl: 'https://catxforest.onrender.com',
      sourceUrl: 'https://github.com/shreyasmene06/CatXForest'
    },
    {
      name: 'pyvm',
      tech: ['Python', 'Click', 'Requests', 'BeautifulSoup', 'Packaging'],
      description: 'Cross-platform Python version manager CLI for safe side-by-side installations. Zero system modification, security-focused updates, and seamless integration with Homebrew, apt, and Windows installers.',
      icon: 'ri-terminal-box-line',
      liveUrl: 'https://pypi.org/project/pyvm-updater/',
      sourceUrl: 'https://github.com/shreyasmene06/pyvm-updater'
    },
    {
      name: 'Omarchy Scripts',
      tech: ['Bash', 'Hyprland', 'Wayland', 'GLSL', 'hyprshade'],
      description: 'Workflow automation scripts for Arch Linux + Hyprland. Features automated workspace ricing, dynamic motion wallpapers, OLED display enhancement, and keyboard-driven productivity tools.',
      icon: 'ri-code-s-slash-line',
      liveUrl: null,
      sourceUrl: 'https://github.com/shreyasmene06/OmarchyMadeEasy'
    },
    {
      name: 'HazardX',
      tech: ['Python', 'FastAPI', 'React (Vite)', 'scikit-learn', 'Pandas', 'NumPy'],
      description: 'AI-powered risk analysis platform that predicts accident severity and surfaces critical safety signals in industrial environments. Combines machine learning with a high-performance FastAPI backend and React (Vite) frontend to enable real-time risk assessment and data-driven decision-making for improved workplace safety.',
      icon: 'ri-shield-check-line',
      liveUrl: null,
      sourceUrl: null
    }
  ],
  contact: {
    email: 'shreyasmene6@gmail.com',
    phone: '+91 9755792012',
    linkedin: 'linkedin.com/in/shreyasmene',
    github: 'github.com/shreyasmene',
    location: 'Bhilai, Chhattisgarh, India'
  },
  interests: ['Exploring new technologies', 'Hackathons', 'Personal challenging projects'],
  resumeUrl: import.meta.env.BASE_URL + 'resume.pdf',
  profilePhoto: import.meta.env.BASE_URL + 'profile.jpg'
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isBooting, setIsBooting] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const bootTimer = setTimeout(() => setIsBooting(false), 2500);
    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcuts for navigation
  useEffect(() => {
    const shortcutMap = {
      h: 'home',
      s: 'skills',
      p: 'projects',
      e: 'experience',
      d: 'education',
      c: 'contact',
    };

    const handleKeyDown = (e) => {
      // Don't trigger when typing in inputs/textareas
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
      // Don't trigger with modifier keys
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const section = shortcutMap[e.key.toLowerCase()];
      if (section) {
        setActiveSection(section);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isBooting) {
    return <BootScreen />;
  }

  return (
    <div className="app-container">
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <DotShaderBackground />
      </div>
      <div className="noise-overlay" />
      <div className="main-layout">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          profile={PROFILE}
        />

        <main className="content-area">
          <div className="window-header">
            <div className="window-controls">
              <span className="control close"></span>
              <span className="control minimize"></span>
              <span className="control maximize"></span>
            </div>
            <div className="window-title">
              <span className="text-muted">shreyas@portfolio</span>
              <span className="text-muted">:</span>
              <span className="text-secondary">~/{activeSection}</span>
              <span className="cursor-blink">█</span>
            </div>
            <div className="window-actions">
              <span className="text-muted window-time">{currentTime.toLocaleTimeString()}</span>
              <button className="theme-toggle" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                <i className={theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}></i>
              </button>
            </div>
          </div>

          <div className="content-wrapper">
            {activeSection === 'home' && <HomeSection profile={PROFILE} onNavigate={setActiveSection} />}
            {activeSection === 'about' && <AboutSection profile={PROFILE} />}
            {activeSection === 'skills' && <SkillsSection profile={PROFILE} />}
            {activeSection === 'projects' && <ProjectsSection profile={PROFILE} />}
            {activeSection === 'experience' && <ExperienceSection profile={PROFILE} />}
            {activeSection === 'education' && <EducationSection profile={PROFILE} />}
            {activeSection === 'contact' && <ContactSection profile={PROFILE} />}
          </div>
        </main>
      </div>

      <StatusBar
        activeSection={activeSection}
        profile={PROFILE}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOME SECTION
// ═══════════════════════════════════════════════════════════════
function HomeSection({ profile, onNavigate }) {
  return (
    <div className="section home-section">
      {/* Floating Orbs Removed in favor of BubbleBackground */}

      {/* Clean Hero Layout */}
      <div className="hero-container">
        {/* Left: Photo */}
        <div className="hero-photo-section">
          <div className="photo-wrapper">
            <div className="photo-ring"></div>
            <div className="photo-frame-clean">
              <img
                src={profile.profilePhoto}
                alt={profile.name}
                className="profile-photo"
              />
            </div>
            <div className="photo-status">
              <span className="status-dot"></span>
              <span>Available</span>
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="hero-content-section">
          <div className="hero-intro">
            <span className="intro-label text-muted">Hello, I'm</span>
            <h1 className="hero-name-clean">
              <span className="name-text">{profile.name}</span>
            </h1>
            <h2 className="hero-role">
              <span className="role-bracket text-muted">&lt;</span>
              <span className="role-text text-secondary" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                {profile.title}
              </span>
              <span className="role-bracket text-muted">/&gt;</span>
            </h2>
          </div>

          <p className="hero-description">
            {profile.tagline}
          </p>

          <div className="hero-highlights">
            <div className="highlight-item">
              <i className="ri-graduation-cap-line text-muted"></i>
              <span>B.Tech CSE @ <span className="text-secondary">VIT Bhopal</span></span>
            </div>
            <div className="highlight-item">
              <i className="ri-cpu-line text-muted"></i>
              <span>AI & Machine Learning</span>
            </div>
            <div className="highlight-item">
              <i className="ri-building-line text-muted"></i>
              <span>Ex-Intern @ <span className="text-secondary">IIT Ropar</span></span>
            </div>
          </div>

          <div className="hero-actions">
            <a
              href={profile.resumeUrl}
              download="Shreyas_Mene_Resume.pdf"
              className="action-btn-primary"
            >
              <i className="ri-download-2-line"></i>
              <span>Download CV</span>
            </a>
            <button
              className="action-btn-secondary"
              onClick={() => onNavigate('contact')}
            >
              <i className="ri-mail-line"></i>
              <span>Contact Me</span>
            </button>
          </div>

          <div className="hero-socials">
            <a href={`https://${profile.contact.github}`} target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="ri-github-fill"></i>
            </a>
            <a href={`https://${profile.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="ri-linkedin-fill"></i>
            </a>
            <a href={`mailto:${profile.contact.email}`} className="social-link">
              <i className="ri-mail-fill"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <CardTilt3D>
        <div className="stats-bar">
          <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
          <div className="stat-item-home">
            <span className="stat-number">{profile.education.cgpa}</span>
            <span className="stat-label-home">CGPA</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item-home">
            <span className="stat-number">{profile.projects.length}+</span>
            <span className="stat-label-home">Projects</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item-home">
            <span className="stat-number">{profile.certifications.length}</span>
            <span className="stat-label-home">Certifications</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item-home">
            <span className="stat-number">2</span>
            <span className="stat-label-home">Internships</span>
          </div>
        </div>
      </CardTilt3D>

      {/* About Me Section */}
      <CardTilt3D>
        <div className="home-about">
          <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
          <div className="about-header-home">
            <span className="about-line"></span>
            <h3 className="about-title-home">
              <i className="ri-user-3-line text-muted"></i>
              About Me
            </h3>
            <span className="about-line"></span>
          </div>

          <div className="about-content-home">
            <p className="about-text">
              I'm a second-year <span className="text-secondary">B.Tech CSE</span> student at
              <span className="text-secondary"> VIT Bhopal University</span>, specializing in
              <span className="text-secondary"> AI & Machine Learning</span>. As a former
              <span className="text-secondary"> MERN Stack Intern at IIT Ropar</span>, I blend
              full-stack development with data science expertise to build intelligent,
              scalable applications.
            </p>
          </div>

          <div className="interests-row">
            {profile.interests.map((interest, i) => (
              <div key={i} className="interest-chip">
                <i className="ri-star-line text-muted"></i>
                <span>{interest}</span>
              </div>
            ))}
          </div>
        </div>
      </CardTilt3D>

      {/* Quick Nav */}
      <div className="quick-nav-clean">
        <span className="nav-hint text-muted">
          <i className="ri-arrow-down-line"></i> Explore More
        </span>
        <div className="nav-pills">
          {['skills', 'projects', 'experience', 'education', 'contact'].map(section => (
            <button
              key={section}
              className="nav-pill"
              onClick={() => onNavigate(section)}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════════════════════
function AboutSection({ profile }) {
  return (
    <div className="section about-section">
      <SectionHeader icon="ri-user-line" title="About Me" />

      {/* Profile Photo with Glitch Effect */}
      <div className="profile-hero">
        <div className="profile-photo-container">
          <div className="photo-frame">
            <div className="photo-glitch" data-text="SHREYAS">
              <img
                src={profile.profilePhoto}
                alt={profile.name}
                className="profile-photo"
              />
              <div className="photo-overlay"></div>
              <div className="photo-scanline"></div>
            </div>
            <div className="photo-corners">
              <span className="corner tl"></span>
              <span className="corner tr"></span>
              <span className="corner bl"></span>
              <span className="corner br"></span>
            </div>
          </div>
          <div className="photo-label">
            <span className="text-muted">$</span> cat profile.jpg
          </div>
        </div>
        <div className="profile-actions">
          <a
            href={profile.resumeUrl}
            download="Shreyas_Mene_Resume.pdf"
            className="resume-btn"
          >
            <span className="btn-icon"><i className="ri-file-download-line"></i></span>
            <span className="btn-text">Download Resume</span>
            <span className="btn-glow"></span>
          </a>
        </div>
      </div>

      <div className="about-grid">
        <CardTilt3D>
          <div className="panel info-panel">
            <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
            <PanelHeader title="whoami" />
            <div className="panel-content">
              <div className="info-row">
                <span className="info-label text-muted">name</span>
                <span className="info-separator">:</span>
                <span className="info-value">{profile.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label text-muted">role</span>
                <span className="info-separator">:</span>
                <span className="info-value text-secondary">{profile.title}</span>
              </div>
              <div className="info-row">
                <span className="info-label text-muted">location</span>
                <span className="info-separator">:</span>
                <span className="info-value">{profile.contact.location}</span>
              </div>
              <div className="info-row">
                <span className="info-label text-muted">status</span>
                <span className="info-separator">:</span>
                <span className="info-value text-secondary">● Available</span>
              </div>
            </div>
          </div>
        </CardTilt3D>

        <CardTilt3D>
          <div className="panel bio-panel">
            <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
            <PanelHeader title="cat bio.txt" />
            <div className="panel-content">
              <p className="bio-text">
                I'm a second-year B.Tech Computer Science and Engineering student at
                <span className="text-secondary"> VIT Bhopal University</span>, specializing in
                <span className="text-secondary"> Artificial Intelligence and Machine Learning</span>.
              </p>
              <p className="bio-text">
                Former <span className="text-secondary">MERN Stack Developer Intern</span> at
                <span className="text-secondary"> IIT Ropar</span>, now channeling that experience into
                Data Science, MERN Stack, and sharpening my DSA skills in Java.
              </p>
              <p className="bio-text">
                Always exploring, always building — from hackathons to side projects that push my limits.
              </p>
            </div>
          </div>
        </CardTilt3D>

        <CardTilt3D>
          <div className="panel interests-panel">
            <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
            <PanelHeader title="interests.json" />
            <div className="panel-content">
              <div className="interests-list">
                {profile.interests.map((interest, i) => (
                  <div key={i} className="interest-item">
                    <span className="text-muted">▸</span>
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardTilt3D>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SKILLS SECTION
// ═══════════════════════════════════════════════════════════════
function SkillsSection() {
  return <PeriodicTable />;
}

// ═══════════════════════════════════════════════════════════════
// PROJECTS SECTION
// ═══════════════════════════════════════════════════════════════
function ProjectsSection({ profile }) {
  return (
    <div className="section projects-section">
      <SectionHeader icon="ri-rocket-line" title="Projects" />

      <div className="projects-grid">
        {profile.projects.map((project, index) => (
          <CardTilt3D key={index}>
            <div className="panel project-panel">
              <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
              <div className="project-header">
                <span className="project-icon"><i className={project.icon}></i></span>
                <span className="project-name">{project.name}</span>
              </div>
              <div className="panel-content">
                <p className="project-description">{project.description}</p>
                <div className="tech-stack">
                  <span className="text-muted">tech_stack: [</span>
                  <div className="tech-tags">
                    {project.tech.map((tech, i) => (
                      <span key={tech} className="tech-tag">
                        "{tech}"{i < project.tech.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                  <span className="text-muted">]</span>
                </div>
              </div>
              <div className="project-actions">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
                    <span className="text-muted">[</span>
                    <span className="text-secondary"><i className="ri-external-link-line"></i> live</span>
                    <span className="text-muted">]</span>
                  </a>
                )}
                {project.sourceUrl && (
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
                    <span className="text-muted">[</span>
                    <span className="text-secondary"><i className="ri-github-line"></i> source</span>
                    <span className="text-muted">]</span>
                  </a>
                )}
              </div>
            </div>
          </CardTilt3D>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EXPERIENCE SECTION
// ═══════════════════════════════════════════════════════════════
function ExperienceSection({ profile }) {
  return (
    <div className="section experience-section">
      <SectionHeader icon="ri-briefcase-line" title="Experience" />

      <div className="timeline">
        {profile.experience.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker">
              <span className="marker-dot"></span>
              <span className="marker-line"></span>
            </div>
            <CardTilt3D>
              <div className="panel experience-panel">
                <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
                <div className="exp-header">
                  <div className="exp-title-row">
                    <span className="exp-role">{exp.role}</span>
                    <span className="exp-duration text-muted">{exp.duration}</span>
                  </div>
                  <div className="exp-company">
                    <span className="text-secondary">@ {exp.company}</span>
                  </div>
                </div>
                <div className="panel-content">
                  <p className="exp-description">{exp.description}</p>
                  <div className="exp-highlights">
                    <span className="text-muted">// highlights</span>
                    {exp.highlights.map((highlight, i) => (
                      <div key={i} className="highlight-item">
                        <span className="text-muted">▸</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardTilt3D>
          </div>
        ))}
      </div>

      <CardTilt3D>
        <div className="panel future-panel">
          <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
          <PanelHeader title="what's next?" />
          <div className="panel-content">
            <p className="text-muted">
              Actively seeking opportunities to grow as a developer and contribute to
              innovative projects. Open to internships, collaborations, and exciting challenges!
            </p>
          </div>
        </div>
      </CardTilt3D>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EDUCATION SECTION
// ═══════════════════════════════════════════════════════════════
function EducationSection({ profile }) {
  return (
    <div className="section education-section">
      <SectionHeader icon="ri-graduation-cap-line" title="Education" />

      {/* University */}
      <CardTilt3D>
        <div className="panel education-panel">
          <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
          <div className="edu-header">
            <div className="edu-icon"><i className="ri-building-2-line"></i></div>
            <div className="edu-info">
              <h3 className="edu-university">{profile.education.university}</h3>
              <p className="edu-degree text-secondary">{profile.education.degree}</p>
              <p className="edu-spec text-muted">Specialization: {profile.education.specialization}</p>
            </div>
          </div>
          <div className="panel-content">
            <div className="edu-stats">
              <div className="edu-stat">
                <span className="stat-label">Year</span>
                <span className="stat-value">{profile.education.year}</span>
              </div>
              <div className="edu-stat">
                <span className="stat-label">CGPA</span>
                <span className="stat-value">{profile.education.cgpa}</span>
              </div>
              <div className="edu-stat">
                <span className="stat-label">Status</span>
                <span className="stat-value text-green">● Active</span>
              </div>
            </div>
          </div>
        </div>
      </CardTilt3D>

      {/* Schooling */}
      <CardTilt3D>
        <div className="panel education-panel">
          <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
          <div className="edu-header">
            <div className="edu-icon"><i className="ri-school-line"></i></div>
            <div className="edu-info">
              <h3 className="edu-university">{profile.schooling.school}</h3>
              <p className="edu-degree text-secondary">{profile.schooling.degree}</p>
              <p className="edu-spec text-muted">{profile.schooling.location} • {profile.schooling.duration}</p>
            </div>
          </div>
          <div className="panel-content">
            <div className="edu-stats">
              <div className="edu-stat">
                <span className="stat-label">Class 12</span>
                <span className="stat-value">{profile.schooling.class12}</span>
              </div>
              <div className="edu-stat">
                <span className="stat-label">Class 10</span>
                <span className="stat-value">{profile.schooling.class10}</span>
              </div>
            </div>
          </div>
        </div>
      </CardTilt3D>

      {/* Certifications */}
      <CardTilt3D>
        <div className="panel certifications-panel">
          <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
          <PanelHeader title="certifications" icon="ri-award-line" />
          <div className="panel-content">
            <div className="cert-list">
              {profile.certifications.map((cert, i) => (
                <div key={i} className="cert-item">
                  <span className="text-muted">▸</span>
                  <span className="cert-name">{cert.name}</span>
                  <span className="text-muted"> — </span>
                  <span className="text-secondary">{cert.provider}</span>
                  {cert.badge && <span className="cert-badge text-muted"> ({cert.badge})</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardTilt3D>

      <CardTilt3D>
        <div className="panel coursework-panel">
          <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
          <PanelHeader title="relevant coursework" />
          <div className="panel-content">
            <div className="course-grid">
              {['Data Structures', 'Algorithms', 'Machine Learning', 'Web Development', 'Database Systems', 'AI Fundamentals'].map((course, i) => (
                <div key={i} className="course-item">
                  <span className="text-muted">◆</span>
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardTilt3D>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════════════════════
function ContactSection({ profile }) {
  const contactLinks = [
    { icon: 'ri-mail-line', label: 'Email', value: profile.contact.email, href: `mailto:${profile.contact.email}` },
    { icon: 'ri-phone-line', label: 'Phone', value: profile.contact.phone, href: `tel:${profile.contact.phone.replace(/\s/g, '')}` },
    { icon: 'ri-linkedin-box-line', label: 'LinkedIn', value: profile.contact.linkedin, href: `https://${profile.contact.linkedin}` },
    { icon: 'ri-github-line', label: 'GitHub', value: profile.contact.github, href: `https://${profile.contact.github}` },
    { icon: 'ri-map-pin-line', label: 'Location', value: profile.contact.location, href: null }
  ];

  return (
    <div className="section contact-section">
      <SectionHeader icon="ri-mail-send-line" title="Contact" />

      <div className="contact-content">
        <CardTilt3D>
          <div className="panel contact-panel">
            <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
            <PanelHeader title="cat contact.json" />
            <div className="panel-content contact-json">
              <span className="text-muted">{'{'}</span>
              {contactLinks.map((link, i) => (
                <div key={i} className="json-row">
                  <span className="json-key text-muted">"{link.label.toLowerCase()}"</span>
                  <span className="text-muted">: </span>
                  {link.href ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="json-value text-secondary">
                      "{link.value}"
                    </a>
                  ) : (
                    <span className="json-value text-secondary">"{link.value}"</span>
                  )}
                  {i < contactLinks.length - 1 && <span className="text-muted">,</span>}
                </div>
              ))}
              <span className="text-muted">{'}'}</span>
            </div>
          </div>
        </CardTilt3D>

        <CardTilt3D>
          <div className="panel message-panel">
            <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} borderWidth={2} />
            <PanelHeader title="send_message()" />
            <div className="panel-content">
              <p className="text-muted">
                Feel free to reach out! I'm always open to discussing new projects,
                creative ideas, or opportunities to be part of something amazing.
              </p>
              <div className="cta-buttons">
                <a href={`mailto:${profile.contact.email}`} className="cta-btn primary">
                  <span className="text-muted">[</span>
                  <span><i className="ri-mail-line"></i> Send Email</span>
                  <span className="text-muted">]</span>
                </a>
                <a href={`https://${profile.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="cta-btn">
                  <span className="text-muted">[</span>
                  <span><i className="ri-linkedin-box-line"></i> LinkedIn</span>
                  <span className="text-muted">]</span>
                </a>
              </div>
            </div>
          </div>
        </CardTilt3D>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════
function SectionHeader({ icon, title }) {
  return (
    <div className="section-header">
      <span className="header-line">╭──</span>
      <span className="header-icon"><i className={icon}></i></span>
      <span className="header-title">{title}</span>
      <span className="header-line flex">────────────────────────────────────────────╮</span>
    </div>
  );
}

function PanelHeader({ title, icon }) {
  return (
    <div className="panel-header">
      <span className="text-muted">$</span>
      {icon && <span className="panel-icon"><i className={icon}></i></span>}
      <span className="text-secondary">{title}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BOOT SCREEN
// ═══════════════════════════════════════════════════════════════
function BootScreen() {
  const [bootLines, setBootLines] = useState([]);

  const bootSequence = [
    { text: '█▓▒░ SHREYAS_PORTFOLIO v1.0.0 ░▒▓█', delay: 0 },
    { text: '', delay: 100 },
    { text: '[    0.000000] Initializing terminal...', delay: 200 },
    { text: '[    0.124532] Loading modules: [████████████████] 100%', delay: 400 },
    { text: '[    0.256789] Mounting filesystem...', delay: 600 },
    { text: '[    0.389012] Starting network services...', delay: 800 },
    { text: '[    0.512345] Loading user configuration...', delay: 1000 },
    { text: '[    0.645678] Initializing graphics subsystem...', delay: 1200 },
    { text: '[    0.778901] Starting portfolio daemon...', delay: 1400 },
    { text: '', delay: 1600 },
    { text: '✓ System ready. Welcome, visitor.', delay: 1800 },
    { text: '', delay: 2000 },
    { text: '> Starting interactive session...', delay: 2200 },
  ];

  useEffect(() => {
    bootSequence.forEach(({ text, delay }) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, text]);
      }, delay);
    });
  }, []);

  return (
    <div className="boot-screen">
      <div className="boot-content">
        {bootLines.map((line, index) => (
          <div
            key={index}
            className={`boot-line ${line.includes('✓') ? 'text-secondary' : ''} ${line.includes('█▓') ? 'text-muted' : ''}`}
          >
            {line}
          </div>
        ))}
        <span className="cursor-blink text-muted">█</span>
      </div>
    </div>
  );
}

export default App;
