import { useState, useEffect } from 'react';
import './StatusBar.css';

function StatusBar({ activeSection, profile }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  };

  return (
    <footer className="status-bar">
      <div className="status-left">
        <div className="mode-indicator">
          <span className="text-green">●</span>
          <span>ONLINE</span>
        </div>
        <div className="status-item">
          <span className="text-cyan">~/</span>
          <span>{activeSection}</span>
        </div>
        <div className="status-item separator">
          <span className="text-muted">│</span>
        </div>
        <div className="status-item">
          <span className="text-purple">◆</span>
          <span className="text-muted">react</span>
        </div>
      </div>
      
      <div className="status-center">
        <span className="text-muted">[</span>
        <span className="text-cyan">shreyas</span>
        <span className="text-green">@</span>
        <span className="text-yellow">portfolio</span>
        <span className="text-muted">]</span>
      </div>
      
      <div className="status-right">
        <div className="status-item">
          <span className="text-muted">GPA:</span>
          <span className="text-green">{profile?.education?.gpa || '9.0'}</span>
        </div>
        <div className="status-item separator">
          <span className="text-muted">│</span>
        </div>
        <div className="status-item">
          <span className="text-purple">⏱</span>
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </footer>
  );
}

export default StatusBar;
