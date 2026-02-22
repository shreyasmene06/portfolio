import { useState, useRef, useCallback } from 'react';
import './CardTilt3D.css';

/**
 * CardTilt3D – wraps any card-like element to give it an interactive
 * 3D perspective tilt that follows the cursor on hover.
 *
 * Props:
 *  - children: the card content
 *  - className: forwarded to the outer container
 *  - style: forwarded to the outer container
 *  - maxRotation: max tilt angle in degrees (default 8)
 *  - scale: hover scale factor (default 1.02)
 */
export default function CardTilt3D({
    children,
    className = '',
    style = {},
    maxRotation = 8,
    scale = 1.02,
}) {
    const ref = useRef(null);
    const [transform, setTransform] = useState('');

    const handleMouseMove = useCallback(
        (e) => {
            const el = ref.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // -1 to 1 range from center
            const px = (e.clientX - centerX) / (rect.width / 2);
            const py = (e.clientY - centerY) / (rect.height / 2);

            // rotateX is inverted: moving mouse down → positive py → negative rotateX
            const rotateX = (-py * maxRotation).toFixed(2);
            const rotateY = (px * maxRotation).toFixed(2);

            setTransform(
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
            );
        },
        [maxRotation, scale]
    );

    const handleMouseLeave = useCallback(() => {
        setTransform('');
    }, []);

    return (
        <div
            className={`card-tilt-container ${className}`}
            style={style}
        >
            <div
                ref={ref}
                className="card-tilt-body"
                style={{ transform }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>
        </div>
    );
}
