import { useCallback, useRef, useState } from 'react';
import './ThreeDCard.css';

const toPx = (value) => {
  if (value === null || value === undefined) return '0px';
  return typeof value === 'number' ? `${value}px` : String(value);
};

const toDeg = (value) => {
  if (value === null || value === undefined) return '0deg';
  return typeof value === 'number' ? `${value}deg` : String(value);
};

export function CardContainer({
  children,
  className = '',
  containerClassName = '',
  maxRotation = 12,
  scale = 1.02,
}) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('');
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (maxRotation * (0.5 - y)).toFixed(2);
      const rotateY = (maxRotation * (x - 0.5)).toFixed(2);

      setTransform(
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
      );
    },
    [maxRotation, scale]
  );

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setTransform('');
  }, []);

  return (
    <div
      className={`card-3d-container ${containerClassName}`}
      data-card-hover={hovered ? 'true' : 'false'}
    >
      <div
        ref={ref}
        className={`card-3d-tilt ${className}`}
        style={transform ? { transform } : undefined}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </div>
  );
}

export function CardBody({ children, className = '', ...props }) {
  return (
    <div className={`card-3d-body ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardItem({
  as: Tag = 'div',
  children,
  className = '',
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  style,
  ...props
}) {
  return (
    <Tag
      className={`card-3d-item ${className}`}
      style={{
        '--card-translate-x': toPx(translateX),
        '--card-translate-y': toPx(translateY),
        '--card-translate-z': toPx(translateZ),
        '--card-rotate-x': toDeg(rotateX),
        '--card-rotate-y': toDeg(rotateY),
        '--card-rotate-z': toDeg(rotateZ),
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
