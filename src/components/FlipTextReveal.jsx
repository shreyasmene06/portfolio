import { useEffect, useState } from 'react';
import './FlipTextReveal.css';

export default function FlipTextReveal({
  word = 'SHREYAS MENE',
  className = '',
  titleClassName = '',
}) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [word]);

  return (
    <div
      className={`flip-text-container ${className}`}
      onDoubleClick={() => setKey(prev => prev + 1)}
      title="Double-click to replay"
    >
      <h1 className={`flip-text-title ${titleClassName}`} aria-label={word}>
        {word.split('').map((char, i) => (
          <span
            key={`${key}-${i}`}
            className="flip-char"
            style={{ '--index': i }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
}
