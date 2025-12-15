import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'home', icon: 'ri-home-4-line', label: 'home', shortcut: 'h' },
  { id: 'about', icon: 'ri-user-line', label: 'about', shortcut: 'a' },
  { id: 'skills', icon: 'ri-tools-line', label: 'skills', shortcut: 's' },
  { id: 'projects', icon: 'ri-rocket-line', label: 'projects', shortcut: 'p' },
  { id: 'experience', icon: 'ri-briefcase-line', label: 'experience', shortcut: 'e' },
  { id: 'education', icon: 'ri-graduation-cap-line', label: 'education', shortcut: 'd' },
  { id: 'contact', icon: 'ri-mail-line', label: 'contact', shortcut: 'c' },
];

function Sidebar({ activeSection, onSectionChange, profile }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo">
            <span className="logo-bracket text-purple">[</span>
            <span className="logo-text text-cyan glow-cyan">SM</span>
            <span className="logo-bracket text-purple">]</span>
          </div>
          <div className="logo-name text-green">shreyas</div>
        </div>
        <div className="version-tag">
          <span className="text-muted">v1.0.0</span>
        </div>
      </div>

      <div className="sidebar-divider">
        <span className="text-muted">├──────────────────┤</span>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title text-muted">
            ╭─ NAVIGATION ─╮
          </div>
          
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <span className="nav-indicator">{activeSection === item.id ? '▸' : ' '}</span>
              <span className={`nav-icon ${activeSection === item.id ? 'text-cyan' : 'text-muted'}`}><i className={item.icon}></i></span>
              <span className="nav-label">{item.label}</span>
              <span className="nav-shortcut text-muted">{item.shortcut}</span>
            </button>
          ))}
          
          <div className="nav-section-title text-muted" style={{ marginTop: '8px' }}>
            ╰──────────────╯
          </div>
        </div>
      </nav>

      <div className="sidebar-stats">
        <div className="stat-row">
          <span className="text-muted">CGPA:</span>
          <span className="text-green glow-green">{profile?.education?.cgpa || '9.0'}</span>
        </div>
        <div className="stat-row">
          <span className="text-muted">Status:</span>
          <span className="text-yellow">● Active</span>
        </div>
      </div>
      
      <div className="sidebar-footer">
        <div className="social-links">
          <a 
            href="https://github.com/shreyasmene" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            title="GitHub"
          >
            <span className="text-cyan">[</span>
            <span>gh</span>
            <span className="text-cyan">]</span>
          </a>
          <a 
            href="https://linkedin.com/in/shreyasmene" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            title="LinkedIn"
          >
            <span className="text-cyan">[</span>
            <span>in</span>
            <span className="text-cyan">]</span>
          </a>
          <a 
            href="mailto:shreyasmene6@gmail.com"
            className="social-link"
            title="Email"
          >
            <span className="text-cyan">[</span>
            <span>@</span>
            <span className="text-cyan">]</span>
          </a>
        </div>
        
        <div className="copyright">
          <span className="text-muted">© 2024 shreyas</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
