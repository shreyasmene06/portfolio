import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatusBar from './components/StatusBar';
import './App.css';
import Snowfall from 'react-snowfall';
const PROFILE = {
  name: 'Shreyas Mene',
  title: 'Full Stack Developer & AI/ML Enthusiast',
  tagline: 'Building the future, one line of code at a time',
  education: {
    degree: 'B.Tech Computer Science and Engineering',
    specialization: 'Artificial Intelligence and Machine Learning',
    university: 'VIT Bhopal University',
    year: 'Second Year',
    cgpa: '9.0'
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
  experience: {
    role: 'MERN Stack Developer Intern',
    company: 'IIT Ropar',
    duration: 'May 2025 – Dec 2025',
    description: 'Built robust web applications with hands-on experience in full-stack development',
    highlights: [
      'Developed scalable web applications using MERN stack',
      'Collaborated with research teams on innovative projects',
      'Implemented best practices in code quality and testing'
    ]
  },
  skills: {
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'TypeScript'],
    backend: ['Express', 'Python', 'MongoDB', 'MySQL'],
    languages: ['Java', 'C++', 'Python'],
    tools: ['Git', 'GitHub', 'Postman', 'CI/CD']
  },
  projects: [
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
      name: 'URL Shortener',
      tech: ['Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'Mongoose'],
      description: 'Scalable link management service with RESTful API, custom short URLs, analytics tracking, and type-safe backend architecture built for production deployment.',
      icon: 'ri-link',
      liveUrl: null,
      sourceUrl: 'https://github.com/shreyasmene06/Url-shortner'
    }
  ],
  contact: {
    email: 'shreyasmene6@gmail.com',
    phone: '+91 9755792012',
    linkedin: 'linkedin.com/in/shreyasmene',
    github: 'github.com/shreyasmene',
    location: 'Bhilai, Chhattisgarh, India'
  },
  interests: ['Exploring new technologies', 'Hackathons', 'Personal challenging projects']
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isBooting, setIsBooting] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const bootTimer = setTimeout(() => setIsBooting(false), 2500);
    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (isBooting) {
    return <BootScreen />;
  }

  return (
    <div className="app-container">
      <div className="scanlines"></div>
      <Snowfall 
        color="#82C3D9"
        snowflakeCount={150}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 999,
          pointerEvents: 'none'
        }}
      />
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
              <span className="text-green">:</span>
              <span className="text-cyan">~/{activeSection}</span>
              <span className="cursor-blink">█</span>
            </div>
            <div className="window-time">
              <span className="text-muted">{currentTime.toLocaleTimeString()}</span>
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
      <div className="ascii-banner">
        <pre className="ascii-art glow-cyan">
{`
  ███████╗██╗  ██╗██████╗ ███████╗██╗   ██╗ █████╗ ███████╗
  ██╔════╝██║  ██║██╔══██╗██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝
  ███████╗███████║██████╔╝█████╗   ╚████╔╝ ███████║███████╗
  ╚════██║██╔══██║██╔══██╗██╔══╝    ╚██╔╝  ██╔══██║╚════██║
  ███████║██║  ██║██║  ██║███████╗   ██║   ██║  ██║███████║
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝
`}
        </pre>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-name">
            <span className="text-green glow-green">$ </span>
            <span className="typing-text">{profile.name}</span>
          </h1>
          <h2 className="hero-title text-cyan">{profile.title}</h2>
          <p className="hero-tagline text-muted">{profile.tagline}</p>
        </div>

        <div className="status-box">
          <div className="box-border">
            <span className="corner tl">╭</span>
            <span className="border-h"></span>
            <span className="box-title">STATUS</span>
            <span className="border-h"></span>
            <span className="corner tr">╮</span>
          </div>
          <div className="status-content">
            <div className="status-item">
              <span className="status-icon">●</span>
              <span className="text-green">Available for opportunities</span>
            </div>
            <div className="status-item">
              <span className="status-icon text-cyan">◆</span>
              <span>Former Intern @ <span className="text-yellow">IIT Ropar</span></span>
            </div>
            <div className="status-item">
              <span className="status-icon text-purple">▸</span>
              <span>CGPA: <span className="text-green">{profile.education.cgpa}</span></span>
            </div>
          </div>
          <div className="box-border bottom">
            <span className="corner bl">╰</span>
            <span className="border-h full"></span>
            <span className="corner br">╯</span>
          </div>
        </div>
      </div>

      <div className="quick-nav">
        <span className="text-muted">Quick Navigation:</span>
        <div className="nav-buttons">
          {['about', 'skills', 'projects', 'experience', 'contact'].map(section => (
            <button 
              key={section} 
              className="nav-btn"
              onClick={() => onNavigate(section)}
            >
              <span className="text-cyan">[</span>
              <span className="text-yellow">{section}</span>
              <span className="text-cyan">]</span>
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
      
      <div className="about-grid">
        <div className="panel info-panel">
          <PanelHeader title="whoami" />
          <div className="panel-content">
            <div className="info-row">
              <span className="info-label text-green">name</span>
              <span className="info-separator">:</span>
              <span className="info-value">{profile.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label text-green">role</span>
              <span className="info-separator">:</span>
              <span className="info-value text-cyan">{profile.title}</span>
            </div>
            <div className="info-row">
              <span className="info-label text-green">location</span>
              <span className="info-separator">:</span>
              <span className="info-value">{profile.contact.location}</span>
            </div>
            <div className="info-row">
              <span className="info-label text-green">status</span>
              <span className="info-separator">:</span>
              <span className="info-value text-yellow">● Available</span>
            </div>
          </div>
        </div>

        <div className="panel bio-panel">
          <PanelHeader title="cat bio.txt" />
          <div className="panel-content">
            <p className="bio-text">
              I'm a second-year B.Tech Computer Science and Engineering student at 
              <span className="text-cyan"> VIT Bhopal University</span>, specializing in 
              <span className="text-purple"> Artificial Intelligence and Machine Learning</span>.
            </p>
            <p className="bio-text">
              Former <span className="text-yellow">MERN Stack Developer Intern</span> at 
              <span className="text-green"> IIT Ropar</span>, now channeling that experience into 
              <span className="text-cyan"> Data Science</span>, <span className="text-yellow">MERN Stack</span>, 
              and sharpening my <span className="text-purple">DSA skills in Java</span>.
            </p>
            <p className="bio-text">
              Always exploring, always building from hackathons to side projects that push my limits.
            </p>
          </div>
        </div>

        <div className="panel interests-panel">
          <PanelHeader title="interests.json" />
          <div className="panel-content">
            <div className="interests-list">
              {profile.interests.map((interest, i) => (
                <div key={i} className="interest-item">
                  <span className="text-purple">▸</span>
                  <span>{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SKILLS SECTION
// ═══════════════════════════════════════════════════════════════
function SkillsSection({ profile }) {
  const skillCategories = [
    { key: 'frontend', icon: 'ri-palette-line', title: 'Frontend', color: 'yellow' },
    { key: 'backend', icon: 'ri-settings-3-line', title: 'Backend', color: 'green' },
    { key: 'languages', icon: 'ri-code-line', title: 'Languages', color: 'cyan' },
    { key: 'tools', icon: 'ri-tools-line', title: 'Tools', color: 'purple' }
  ];

  return (
    <div className="section skills-section">
      <SectionHeader icon="ri-tools-fill" title="Technical Skills" />
      
      <div className="skills-grid">
        {skillCategories.map(({ key, icon, title, color }) => (
          <div key={key} className="panel skill-panel">
            <PanelHeader title={title} icon={icon} />
            <div className="panel-content">
              <div className="skill-bars">
                {profile.skills[key].map((skill, i) => (
                  <div key={skill} className="skill-item">
                    <div className="skill-name">
                      <span className={`text-${color}`}>▸</span>
                      <span>{skill}</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className={`skill-fill ${color}`} 
                        style={{ 
                          width: `${85 - i * 5}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="skills-summary panel">
        <PanelHeader title="stats --summary" />
        <div className="panel-content stats-grid">
          <div className="stat-item">
            <span className="stat-value text-green glow-green">{Object.values(profile.skills).flat().length}+</span>
            <span className="stat-label">Technologies</span>
          </div>
          <div className="stat-item">
            <span className="stat-value text-cyan glow-cyan">{profile.projects.length}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-value text-yellow">{profile.education.cgpa}</span>
            <span className="stat-label">CGPA</span>
          </div>
          <div className="stat-item">
            <span className="stat-value text-purple glow-purple">∞</span>
            <span className="stat-label">Curiosity</span>
          </div>
        </div>
      </div>
    </div>
  );
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
          <div key={index} className="panel project-panel">
            <div className="project-header">
              <span className="project-icon"><i className={project.icon}></i></span>
              <span className="project-name text-green glow-green">{project.name}</span>
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
                  <span className="text-cyan">[</span>
                  <span className="text-yellow"><i className="ri-external-link-line"></i> live</span>
                  <span className="text-cyan">]</span>
                </a>
              )}
              {project.sourceUrl && (
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
                  <span className="text-cyan">[</span>
                  <span className="text-yellow"><i className="ri-github-line"></i> source</span>
                  <span className="text-cyan">]</span>
                </a>
              )}
            </div>
          </div>
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
        <div className="timeline-item">
          <div className="timeline-marker">
            <span className="marker-dot"></span>
            <span className="marker-line"></span>
          </div>
          <div className="panel experience-panel">
            <div className="exp-header">
              <div className="exp-title-row">
                <span className="exp-role text-yellow glow-yellow">{profile.experience.role}</span>
                <span className="exp-duration text-muted">{profile.experience.duration}</span>
              </div>
              <div className="exp-company">
                <span className="text-cyan">@ {profile.experience.company}</span>
              </div>
            </div>
            <div className="panel-content">
              <p className="exp-description">{profile.experience.description}</p>
              <div className="exp-highlights">
                <span className="text-muted">// highlights</span>
                {profile.experience.highlights.map((highlight, i) => (
                  <div key={i} className="highlight-item">
                    <span className="text-green">▸</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel future-panel">
        <PanelHeader title="what's next?" />
        <div className="panel-content">
          <p className="text-muted">
            Actively seeking opportunities to grow as a developer and contribute to 
            innovative projects. Open to internships, collaborations, and exciting challenges!
          </p>
        </div>
      </div>
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
      <div className="panel education-panel">
        <div className="edu-header">
          <div className="edu-icon"><i className="ri-building-2-line"></i></div>
          <div className="edu-info">
            <h3 className="edu-university text-cyan glow-cyan">{profile.education.university}</h3>
            <p className="edu-degree text-green">{profile.education.degree}</p>
            <p className="edu-spec text-purple">Specialization: {profile.education.specialization}</p>
          </div>
        </div>
        <div className="panel-content">
          <div className="edu-stats">
            <div className="edu-stat">
              <span className="stat-label">Year</span>
              <span className="stat-value text-yellow">{profile.education.year}</span>
            </div>
            <div className="edu-stat">
              <span className="stat-label">CGPA</span>
              <span className="stat-value text-green glow-green">{profile.education.cgpa}</span>
            </div>
            <div className="edu-stat">
              <span className="stat-label">Status</span>
              <span className="stat-value text-cyan">● Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schooling */}
      <div className="panel education-panel">
        <div className="edu-header">
          <div className="edu-icon"><i className="ri-school-line"></i></div>
          <div className="edu-info">
            <h3 className="edu-university text-cyan glow-cyan">{profile.schooling.school}</h3>
            <p className="edu-degree text-green">{profile.schooling.degree}</p>
            <p className="edu-spec text-muted">{profile.schooling.location} • {profile.schooling.duration}</p>
          </div>
        </div>
        <div className="panel-content">
          <div className="edu-stats">
            <div className="edu-stat">
              <span className="stat-label">Class 12</span>
              <span className="stat-value text-green glow-green">{profile.schooling.class12}</span>
            </div>
            <div className="edu-stat">
              <span className="stat-label">Class 10</span>
              <span className="stat-value text-green glow-green">{profile.schooling.class10}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="panel certifications-panel">
        <PanelHeader title="certifications" icon="ri-award-line" />
        <div className="panel-content">
          <div className="cert-list">
            {profile.certifications.map((cert, i) => (
              <div key={i} className="cert-item">
                <span className="text-green">▸</span>
                <span className="cert-name">{cert.name}</span>
                <span className="text-muted"> — </span>
                <span className="text-cyan">{cert.provider}</span>
                {cert.badge && <span className="cert-badge text-yellow"> ({cert.badge})</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel coursework-panel">
        <PanelHeader title="relevant coursework" />
        <div className="panel-content">
          <div className="course-grid">
            {['Data Structures', 'Algorithms', 'Machine Learning', 'Web Development', 'Database Systems', 'AI Fundamentals'].map((course, i) => (
              <div key={i} className="course-item">
                <span className="text-purple">◆</span>
                <span>{course}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
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
        <div className="panel contact-panel">
          <PanelHeader title="cat contact.json" />
          <div className="panel-content contact-json">
            <span className="text-purple">{'{'}</span>
            {contactLinks.map((link, i) => (
              <div key={i} className="json-row">
                <span className="json-key text-cyan">"{link.label.toLowerCase()}"</span>
                <span className="text-muted">: </span>
                {link.href ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="json-value text-yellow">
                    "{link.value}"
                  </a>
                ) : (
                  <span className="json-value text-yellow">"{link.value}"</span>
                )}
                {i < contactLinks.length - 1 && <span className="text-muted">,</span>}
              </div>
            ))}
            <span className="text-purple">{'}'}</span>
          </div>
        </div>

        <div className="panel message-panel">
          <PanelHeader title="send_message()" />
          <div className="panel-content">
            <p className="text-muted">
              Feel free to reach out! I'm always open to discussing new projects, 
              creative ideas, or opportunities to be part of something amazing.
            </p>
            <div className="cta-buttons">
              <a href={`mailto:${profile.contact.email}`} className="cta-btn primary">
                <span className="text-green">[</span>
                <span><i className="ri-mail-line"></i> Send Email</span>
                <span className="text-green">]</span>
              </a>
              <a href={`https://${profile.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="cta-btn">
                <span className="text-cyan">[</span>
                <span><i className="ri-linkedin-box-line"></i> LinkedIn</span>
                <span className="text-cyan">]</span>
              </a>
            </div>
          </div>
        </div>
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
      <span className="header-title text-cyan glow-cyan">{title}</span>
      <span className="header-line flex">────────────────────────────────────────────╮</span>
    </div>
  );
}

function PanelHeader({ title, icon }) {
  return (
    <div className="panel-header">
      <span className="text-muted">$</span>
      {icon && <span className="panel-icon"><i className={icon}></i></span>}
      <span className="text-green"> {title}</span>
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
            className={`boot-line ${line.includes('✓') ? 'text-green' : ''} ${line.includes('█▓') ? 'text-cyan glow-cyan' : ''}`}
          >
            {line}
          </div>
        ))}
        <span className="cursor-blink text-green">█</span>
      </div>
    </div>
  );
}

export default App;
