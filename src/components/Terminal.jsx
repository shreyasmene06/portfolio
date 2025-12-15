import { useState, useEffect, useRef } from 'react';
import './Terminal.css';

// Profile data
const PROFILE = {
  name: 'Shreyas Mene',
  title: 'Full Stack Developer & AI/ML Enthusiast',
  education: {
    degree: 'B.Tech Computer Science and Engineering',
    specialization: 'Artificial Intelligence and Machine Learning',
    university: 'VIT Bhopal University',
    year: 'First Year',
    gpa: '9.0'
  },
  experience: {
    role: 'MERN Stack Developer Intern',
    company: 'IIT Ropar',
    description: 'Building robust web applications with hands-on experience in full-stack development'
  },
  skills: {
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'TypeScript'],
    backend: ['Express', 'Python', 'MongoDB', 'MySQL'],
    languages: ['Java', 'C++', 'Python'],
    tools: ['Git', 'GitHub', 'Postman', 'CI/CD']
  },
  projects: [
    {
      name: 'Immersive Web Experience',
      tech: ['Three.js', 'React', 'WebGL', 'Node.js'],
      description: 'Interactive 3D web experience with stunning visuals and smooth animations'
    },
    {
      name: 'AI-Powered Analytics Platform',
      tech: ['Python', 'TensorFlow', 'FastAPI', 'D3.js'],
      description: 'Data analytics platform powered by machine learning algorithms'
    },
    {
      name: 'Interactive 3D Game',
      tech: ['Unity', 'C#', 'WebAssembly', 'Socket.io'],
      description: 'Multiplayer 3D game with real-time networking capabilities'
    }
  ],
  contact: {
    email: 'shreyasmene6@gmail.com',
    phone: '+91 9755792012',
    linkedin: 'linkedin.com/in/shreyasmene',
    location: 'Bhilai, Chhattisgarh, India'
  },
  interests: ['Exploring new technologies', 'Hackathons', 'Personal challenging projects']
};

const COMMANDS = {
  help: {
    description: 'Show available commands',
    usage: 'help'
  },
  about: {
    description: 'Display information about me',
    usage: 'about'
  },
  skills: {
    description: 'List my technical skills',
    usage: 'skills [category]'
  },
  projects: {
    description: 'View my project portfolio',
    usage: 'projects [project-name]'
  },
  experience: {
    description: 'Show my work experience',
    usage: 'experience'
  },
  education: {
    description: 'Display my education details',
    usage: 'education'
  },
  contact: {
    description: 'Get my contact information',
    usage: 'contact'
  },
  clear: {
    description: 'Clear the terminal',
    usage: 'clear'
  },
  neofetch: {
    description: 'Display system info (TUI style)',
    usage: 'neofetch'
  },
  ls: {
    description: 'List available sections',
    usage: 'ls'
  },
  cd: {
    description: 'Navigate to a section',
    usage: 'cd <section>'
  },
  cat: {
    description: 'Display content of a section',
    usage: 'cat <section>'
  },
  whoami: {
    description: 'Display current user',
    usage: 'whoami'
  },
  date: {
    description: 'Show current date and time',
    usage: 'date'
  },
  echo: {
    description: 'Echo a message',
    usage: 'echo <message>'
  },
  matrix: {
    description: 'Toggle matrix rain effect',
    usage: 'matrix'
  },
  social: {
    description: 'Show social links',
    usage: 'social'
  },
  resume: {
    description: 'Download resume',
    usage: 'resume'
  }
};

function Terminal({ activeSection, onCommand, onSectionChange }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    // Initial welcome message
    const welcomeOutput = getWelcomeMessage();
    setHistory([{ type: 'output', content: welcomeOutput }]);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Focus input on click anywhere in terminal
    const handleClick = () => inputRef.current?.focus();
    const terminal = terminalRef.current;
    terminal?.addEventListener('click', handleClick);
    return () => terminal?.removeEventListener('click', handleClick);
  }, []);

  const getWelcomeMessage = () => {
    return (
      <div className="welcome-message">
        <pre className="ascii-art text-cyan glow-cyan">
{`
  ███████╗██╗  ██╗██████╗ ███████╗██╗   ██╗ █████╗ ███████╗
  ██╔════╝██║  ██║██╔══██╗██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝
  ███████╗███████║██████╔╝█████╗   ╚████╔╝ ███████║███████╗
  ╚════██║██╔══██║██╔══██╗██╔══╝    ╚██╔╝  ██╔══██║╚════██║
  ███████║██║  ██║██║  ██║███████╗   ██║   ██║  ██║███████║
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝
`}
        </pre>
        <div className="welcome-text">
          <p><span className="text-green">Welcome to my interactive terminal portfolio!</span></p>
          <p className="text-muted">Type <span className="text-yellow">'help'</span> to see available commands.</p>
          <p className="text-muted">Navigate using commands or click on sidebar items.</p>
        </div>
      </div>
    );
  };

  const processCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(' ');
    const command = args[0];
    const params = args.slice(1);

    switch (command) {
      case 'help':
        return renderHelp();
      case 'about':
        onSectionChange('about');
        return renderAbout();
      case 'skills':
        onSectionChange('skills');
        return renderSkills(params[0]);
      case 'projects':
        onSectionChange('projects');
        return renderProjects();
      case 'experience':
        onSectionChange('experience');
        return renderExperience();
      case 'education':
        onSectionChange('education');
        return renderEducation();
      case 'contact':
        onSectionChange('contact');
        return renderContact();
      case 'clear':
        setHistory([]);
        return null;
      case 'neofetch':
        return renderNeofetch();
      case 'ls':
        return renderLs();
      case 'cd':
        if (params[0]) {
          const validSections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
          if (validSections.includes(params[0])) {
            onSectionChange(params[0]);
            return <span className="text-green">Changed directory to ~/{params[0]}</span>;
          }
          return <span className="text-red">cd: no such directory: {params[0]}</span>;
        }
        onSectionChange('home');
        return <span className="text-green">Changed directory to ~/home</span>;
      case 'cat':
        if (params[0]) {
          return processCat(params[0]);
        }
        return <span className="text-red">cat: missing operand</span>;
      case 'whoami':
        return <span className="text-cyan">shreyas_mene</span>;
      case 'date':
        return <span className="text-yellow">{new Date().toString()}</span>;
      case 'echo':
        return <span>{params.join(' ')}</span>;
      case 'social':
        return renderSocial();
      case 'resume':
        return <span className="text-yellow">📄 Resume download would be triggered here!</span>;
      case 'pwd':
        return <span className="text-cyan">/home/shreyas/{activeSection}</span>;
      case 'history':
        return renderCommandHistory();
      case '':
        return null;
      default:
        return (
          <span className="text-red">
            Command not found: {command}. Type <span className="text-yellow">'help'</span> for available commands.
          </span>
        );
    }
  };

  const processCat = (section) => {
    switch (section) {
      case 'about':
      case 'about.txt':
        return renderAbout();
      case 'skills':
      case 'skills.json':
        return renderSkills();
      case 'projects':
      case 'projects.md':
        return renderProjects();
      case 'experience':
      case 'experience.txt':
        return renderExperience();
      case 'education':
      case 'education.txt':
        return renderEducation();
      case 'contact':
      case 'contact.json':
        return renderContact();
      default:
        return <span className="text-red">cat: {section}: No such file or directory</span>;
    }
  };

  const renderHelp = () => (
    <div className="help-output">
      <div className="section-header">
        <span className="text-cyan">╭──────────────────────────────────────────╮</span>
      </div>
      <div className="section-header">
        <span className="text-cyan">│</span> <span className="text-green glow-green">Available Commands</span>
      </div>
      <div className="section-header">
        <span className="text-cyan">╰──────────────────────────────────────────╯</span>
      </div>
      <div className="command-list">
        {Object.entries(COMMANDS).map(([cmd, info]) => (
          <div key={cmd} className="command-item">
            <span className="text-yellow">{cmd.padEnd(12)}</span>
            <span className="text-muted">{info.description}</span>
          </div>
        ))}
      </div>
      <div className="help-tip">
        <span className="text-muted">Tip: Use </span>
        <span className="text-purple">↑/↓</span>
        <span className="text-muted"> arrows to navigate command history</span>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="about-output">
      <div className="section-box">
        <div className="box-header">
          <span className="text-purple">┌─</span>
          <span className="text-cyan"> 👤 About Me </span>
          <span className="text-purple">─────────────────────────────────────┐</span>
        </div>
        <div className="box-content">
          <p><span className="text-green">Name:</span> {PROFILE.name}</p>
          <p><span className="text-green">Role:</span> {PROFILE.title}</p>
          <p><span className="text-green">Status:</span> <span className="text-yellow">● Available for opportunities</span></p>
          <br />
          <p className="text-muted">
            First-year B.Tech CSE student specializing in AI/ML, currently 
            interning at IIT Ropar as a MERN Stack Developer. Passionate about 
            building innovative web applications and exploring cutting-edge 
            technologies.
          </p>
        </div>
        <div className="box-footer">
          <span className="text-purple">└──────────────────────────────────────────────────────┘</span>
        </div>
      </div>
    </div>
  );

  const renderSkills = (category) => (
    <div className="skills-output">
      <div className="section-box">
        <div className="box-header">
          <span className="text-purple">┌─</span>
          <span className="text-cyan"> 🛠️ Technical Skills </span>
          <span className="text-purple">───────────────────────────────┐</span>
        </div>
        <div className="box-content skills-grid">
          <div className="skill-category">
            <span className="text-yellow">▸ Frontend</span>
            <div className="skill-tags">
              {PROFILE.skills.frontend.map(skill => (
                <span key={skill} className="skill-tag frontend">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <span className="text-green">▸ Backend</span>
            <div className="skill-tags">
              {PROFILE.skills.backend.map(skill => (
                <span key={skill} className="skill-tag backend">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <span className="text-cyan">▸ Languages</span>
            <div className="skill-tags">
              {PROFILE.skills.languages.map(skill => (
                <span key={skill} className="skill-tag language">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <span className="text-purple">▸ Tools</span>
            <div className="skill-tags">
              {PROFILE.skills.tools.map(skill => (
                <span key={skill} className="skill-tag tool">{skill}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="box-footer">
          <span className="text-purple">└──────────────────────────────────────────────────────┘</span>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="projects-output">
      <div className="section-box">
        <div className="box-header">
          <span className="text-purple">┌─</span>
          <span className="text-cyan"> 🚀 Projects </span>
          <span className="text-purple">──────────────────────────────────────┐</span>
        </div>
        <div className="box-content">
          {PROFILE.projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <span className="text-green">◆ {project.name}</span>
              </div>
              <p className="text-muted project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              {index < PROFILE.projects.length - 1 && (
                <div className="project-divider">
                  <span className="text-muted">├────────────────────────────────────────────────────┤</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="box-footer">
          <span className="text-purple">└──────────────────────────────────────────────────────┘</span>
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="experience-output">
      <div className="section-box">
        <div className="box-header">
          <span className="text-purple">┌─</span>
          <span className="text-cyan"> 💼 Experience </span>
          <span className="text-purple">────────────────────────────────────┐</span>
        </div>
        <div className="box-content">
          <div className="exp-item">
            <div className="exp-header">
              <span className="text-yellow">{PROFILE.experience.role}</span>
            </div>
            <div className="exp-company">
              <span className="text-cyan">@ {PROFILE.experience.company}</span>
              <span className="text-muted"> • Current</span>
            </div>
            <p className="text-muted exp-desc">{PROFILE.experience.description}</p>
            <div className="exp-highlights">
              <span className="text-green">▸</span>
              <span className="text-muted"> Building robust web applications</span>
            </div>
            <div className="exp-highlights">
              <span className="text-green">▸</span>
              <span className="text-muted"> Hands-on MERN stack development</span>
            </div>
            <div className="exp-highlights">
              <span className="text-green">▸</span>
              <span className="text-muted"> Collaborating with research teams</span>
            </div>
          </div>
        </div>
        <div className="box-footer">
          <span className="text-purple">└──────────────────────────────────────────────────────┘</span>
        </div>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="education-output">
      <div className="section-box">
        <div className="box-header">
          <span className="text-purple">┌─</span>
          <span className="text-cyan"> 🎓 Education </span>
          <span className="text-purple">─────────────────────────────────────┐</span>
        </div>
        <div className="box-content">
          <div className="edu-item">
            <span className="text-yellow">{PROFILE.education.degree}</span>
            <p>
              <span className="text-muted">Specialization: </span>
              <span className="text-cyan">{PROFILE.education.specialization}</span>
            </p>
            <p>
              <span className="text-muted">University: </span>
              <span className="text-green">{PROFILE.education.university}</span>
            </p>
            <p>
              <span className="text-muted">Year: </span>
              <span>{PROFILE.education.year}</span>
            </p>
            <p>
              <span className="text-muted">GPA: </span>
              <span className="text-yellow glow-green">{PROFILE.education.gpa}</span>
              <span className="text-green"> ★</span>
            </p>
          </div>
        </div>
        <div className="box-footer">
          <span className="text-purple">└──────────────────────────────────────────────────────┘</span>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="contact-output">
      <div className="section-box">
        <div className="box-header">
          <span className="text-purple">┌─</span>
          <span className="text-cyan"> 📬 Contact </span>
          <span className="text-purple">──────────────────────────────────────┐</span>
        </div>
        <div className="box-content contact-grid">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <span className="text-green">Email:</span>
            <a href={`mailto:${PROFILE.contact.email}`} className="text-cyan contact-link">
              {PROFILE.contact.email}
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📱</span>
            <span className="text-green">Phone:</span>
            <span className="text-yellow">{PROFILE.contact.phone}</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">💼</span>
            <span className="text-green">LinkedIn:</span>
            <a href={`https://${PROFILE.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-cyan contact-link">
              {PROFILE.contact.linkedin}
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span className="text-green">Location:</span>
            <span className="text-muted">{PROFILE.contact.location}</span>
          </div>
        </div>
        <div className="box-footer">
          <span className="text-purple">└──────────────────────────────────────────────────────┘</span>
        </div>
      </div>
    </div>
  );

  const renderNeofetch = () => (
    <div className="neofetch-output">
      <div className="neofetch-container">
        <pre className="ascii-logo text-cyan">
{`       .---.
      /     \\
      \\.@-@./
      /\`\\_/\`\\
     //  _  \\\\
    | \\     )|_
   /\`\\_\`>  <_/ \\
   \\__/'---'\\__/`}
        </pre>
        <div className="system-info">
          <div><span className="text-cyan">shreyas</span><span className="text-muted">@</span><span className="text-cyan">portfolio</span></div>
          <div className="info-divider">────────────────────</div>
          <div><span className="text-green">OS:</span> <span>Web Browser</span></div>
          <div><span className="text-green">Host:</span> <span>VIT Bhopal University</span></div>
          <div><span className="text-green">Kernel:</span> <span>React 18.2.0</span></div>
          <div><span className="text-green">Uptime:</span> <span>19 years</span></div>
          <div><span className="text-green">Shell:</span> <span>zsh (interactive)</span></div>
          <div><span className="text-green">Resolution:</span> <span>Responsive</span></div>
          <div><span className="text-green">Theme:</span> <span>Cyberpunk Matrix</span></div>
          <div><span className="text-green">Terminal:</span> <span>Portfolio TUI v1.0</span></div>
          <div><span className="text-green">CPU:</span> <span>AI/ML Specialization</span></div>
          <div><span className="text-green">Memory:</span> <span>9.0 GPA / 10.0</span></div>
          <div className="color-blocks">
            <span className="color-block" style={{background: '#2e3440'}}></span>
            <span className="color-block" style={{background: '#bf616a'}}></span>
            <span className="color-block" style={{background: '#a3be8c'}}></span>
            <span className="color-block" style={{background: '#ebcb8b'}}></span>
            <span className="color-block" style={{background: '#81a1c1'}}></span>
            <span className="color-block" style={{background: '#b48ead'}}></span>
            <span className="color-block" style={{background: '#88c0d0'}}></span>
            <span className="color-block" style={{background: '#e5e9f0'}}></span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLs = () => (
    <div className="ls-output">
      <span className="text-cyan">📁 about/</span>
      <span className="text-cyan">📁 skills/</span>
      <span className="text-cyan">📁 projects/</span>
      <span className="text-cyan">📁 experience/</span>
      <span className="text-cyan">📁 education/</span>
      <span className="text-cyan">📁 contact/</span>
      <span className="text-green">📄 README.md</span>
      <span className="text-yellow">📄 resume.pdf</span>
    </div>
  );

  const renderSocial = () => (
    <div className="social-output">
      <div className="social-links">
        <a href={`mailto:${PROFILE.contact.email}`} className="social-link">
          <span className="social-icon">📧</span>
          <span>Email</span>
        </a>
        <a href={`https://${PROFILE.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="social-link">
          <span className="social-icon">💼</span>
          <span>LinkedIn</span>
        </a>
        <a href="https://github.com/shreyasmene" target="_blank" rel="noopener noreferrer" className="social-link">
          <span className="social-icon">🐙</span>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );

  const renderCommandHistory = () => (
    <div className="history-output">
      {commandHistory.map((cmd, index) => (
        <div key={index}>
          <span className="text-muted">{index + 1}</span>
          <span className="text-yellow"> {cmd}</span>
        </div>
      ))}
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (input.trim()) {
      setCommandHistory(prev => [...prev, input]);
      onCommand(input);
    }
    
    const output = processCommand(input);
    
    setHistory(prev => [
      ...prev,
      { type: 'command', content: input },
      ...(output ? [{ type: 'output', content: output }] : [])
    ]);
    
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      const commands = Object.keys(COMMANDS);
      const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <div className="terminal" ref={terminalRef}>
      <div className="terminal-output">
        {history.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            {item.type === 'command' ? (
              <div className="command-line">
                <span className="prompt">
                  <span className="text-green">shreyas</span>
                  <span className="text-muted">@</span>
                  <span className="text-cyan">portfolio</span>
                  <span className="text-muted">:</span>
                  <span className="text-purple">~/{activeSection}</span>
                  <span className="text-yellow">$</span>
                </span>
                <span className="command-text">{item.content}</span>
              </div>
            ) : (
              <div className="output-content animate-fadeIn">{item.content}</div>
            )}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="terminal-input-form">
        <span className="prompt">
          <span className="text-green">shreyas</span>
          <span className="text-muted">@</span>
          <span className="text-cyan">portfolio</span>
          <span className="text-muted">:</span>
          <span className="text-purple">~/{activeSection}</span>
          <span className="text-yellow">$</span>
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <span className="cursor-blink text-green">█</span>
      </form>
    </div>
  );
}

export default Terminal;
