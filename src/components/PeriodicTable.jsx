import './PeriodicTable.css';

// Periodic table elements - each skill mapped to an element
const ELEMENTS = [
  // Row 1 — two corner elements
  { symbol: 'Py', name: 'Python', number: 1, category: 'languages', row: 1, col: 1 },
  { symbol: 'Jv', name: 'Java', number: 2, category: 'languages', row: 1, col: 8 },

  // Row 2
  { symbol: 'Cp', name: 'C++', number: 3, category: 'languages', row: 2, col: 1 },
  { symbol: 'Js', name: 'JavaScript', number: 4, category: 'languages', row: 2, col: 2 },
  { symbol: 'Ts', name: 'TypeScript', number: 5, category: 'languages', row: 2, col: 3 },
  { symbol: 'Ht', name: 'HTML5', number: 6, category: 'languages', row: 2, col: 6 },
  { symbol: 'Cs', name: 'CSS3', number: 7, category: 'languages', row: 2, col: 7 },
  { symbol: 'Sq', name: 'SQL', number: 8, category: 'languages', row: 2, col: 8 },

  // Row 3 — Core CS + Libraries
  { symbol: 'Ds', name: 'Data Struct.', number: 9, category: 'core-cs', row: 3, col: 1 },
  { symbol: 'Al', name: 'Algorithms', number: 10, category: 'core-cs', row: 3, col: 2 },
  { symbol: 'Os', name: 'OS Concepts', number: 11, category: 'core-cs', row: 3, col: 3 },
  { symbol: 'Re', name: 'React', number: 12, category: 'libraries', row: 3, col: 4 },
  { symbol: 'Nd', name: 'Node.js', number: 13, category: 'libraries', row: 3, col: 5 },
  { symbol: 'Ex', name: 'Express', number: 14, category: 'libraries', row: 3, col: 6 },
  { symbol: 'Mg', name: 'MongoDB', number: 15, category: 'data-science', row: 3, col: 7 },
  { symbol: 'My', name: 'MySQL', number: 16, category: 'data-science', row: 3, col: 8 },

  // Row 4 — AI/ML + Data Science
  { symbol: 'Ml', name: 'Mach. Learn.', number: 17, category: 'ai-ml', row: 4, col: 1 },
  { symbol: 'Dl', name: 'Deep Learn.', number: 18, category: 'ai-ml', row: 4, col: 2 },
  { symbol: 'Sk', name: 'scikit-learn', number: 19, category: 'ai-ml', row: 4, col: 3 },
  { symbol: 'Xg', name: 'XGBoost', number: 20, category: 'ai-ml', row: 4, col: 4 },
  { symbol: 'Cb', name: 'CatBoost', number: 21, category: 'ai-ml', row: 4, col: 5 },
  { symbol: 'Np', name: 'NumPy', number: 22, category: 'data-science', row: 4, col: 6 },
  { symbol: 'Pd', name: 'Pandas', number: 23, category: 'data-science', row: 4, col: 7 },
  { symbol: 'Fl', name: 'Flask', number: 24, category: 'libraries', row: 4, col: 8 },

  // Row 5 — Tools
  { symbol: 'Gt', name: 'Git', number: 25, category: 'tools', row: 5, col: 1 },
  { symbol: 'Gh', name: 'GitHub', number: 26, category: 'tools', row: 5, col: 2 },
  { symbol: 'Pm', name: 'Postman', number: 27, category: 'tools', row: 5, col: 3 },
  { symbol: 'Ci', name: 'CI/CD', number: 28, category: 'tools', row: 5, col: 4 },
  { symbol: 'Vs', name: 'VS Code', number: 29, category: 'tools', row: 5, col: 5 },
  { symbol: 'Lx', name: 'Linux', number: 30, category: 'tools', row: 5, col: 6 },
  { symbol: 'Fb', name: 'Firebase', number: 31, category: 'libraries', row: 5, col: 7 },
  { symbol: 'Hy', name: 'Hyprland', number: 32, category: 'tools', row: 5, col: 8 },
];

const CATEGORIES = [
  { key: 'languages', label: 'Languages', color: 'languages' },
  { key: 'core-cs', label: 'Core CS', color: 'core-cs' },
  { key: 'ai-ml', label: 'AI & ML', color: 'ai-ml' },
  { key: 'data-science', label: 'Data Science', color: 'data-science' },
  { key: 'libraries', label: 'Libraries', color: 'libraries' },
  { key: 'tools', label: 'Tools', color: 'tools' },
];

function ElementCell({ element }) {
  return (
    <div
      className="element-cell"
      style={{
        gridRow: element.row,
        gridColumn: element.col,
      }}
      title={element.name}
    >
      <span className="element-number">{element.number}</span>
      <span className="element-symbol">{element.symbol}</span>
      <span className="element-name">{element.name}</span>
    </div>
  );
}

export default function PeriodicTable() {
  return (
    <div className="periodic-table-section">
      <div className="section-header">
        <span className="header-line" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>╭──</span>
        <span className="header-icon"><i className="ri-flask-line"></i></span>
        <span className="header-title" style={{ fontFamily: 'var(--font-serif)' }}>Stack & Strengths</span>
        <span className="header-line flex" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>────────────────────────────────────────────╮</span>
      </div>

      <p className="periodic-subtitle">
        A periodic table of tools, technologies, and concepts powering my projects.
      </p>

      <div
        className="periodic-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridTemplateRows: `repeat(5, 1fr)`,
        }}
      >
        {ELEMENTS.map((el) => (
          <ElementCell key={el.symbol} element={el} />
        ))}
      </div>
    </div>
  );
}
