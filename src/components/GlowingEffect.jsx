import { memo, useCallback, useEffect, useRef } from 'react';
import './GlowingEffect.css';

/**
 * GlowingEffect – A cursor-following border glow.
 * Ported from Aceternity's glowing-effect (TypeScript + Tailwind + motion/react)
 * to vanilla JSX + CSS with no extra dependencies.
 *
 * Props:
 *  blur            – px blur on the glow layer (default 0)
 *  inactiveZone    – fraction of half-diagonal where glow deactivates (0–1, default 0.7)
 *  proximity       – extra px radius around the element that counts as "near" (default 0)
 *  spread          – arc width of the conic sweep in degrees (default 20)
 *  variant         – "default" (colourful) or "white"
 *  glow            – always show the glow layer at full opacity (default false)
 *  disabled        – disable the mouse-tracking entirely (default false)
 *  movementDuration– seconds for the angle interpolation animation (default 2)
 *  borderWidth     – px width of the glowing border (default 1)
 */
const GlowingEffect = memo(function GlowingEffect({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = 'default',
    glow = false,
    disabled = false,
    movementDuration = 2,
    borderWidth = 1,
}) {
    const containerRef = useRef(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(0);
    const angleAnimRef = useRef(null); // for our vanilla angle lerp

    // Vanilla replacement for motion's animate():
    // linearly interpolates from `from` to `to` over `duration` seconds
    const animateAngle = useCallback((from, to, duration, onUpdate) => {
        // cancel any running angle animation
        if (angleAnimRef.current) {
            cancelAnimationFrame(angleAnimRef.current);
            angleAnimRef.current = null;
        }

        const startTime = performance.now();
        const durationMs = duration * 1000;

        function tick(now) {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / durationMs, 1);

            // cubic ease-out approximation of [0.16, 1, 0.3, 1]
            const eased = 1 - Math.pow(1 - t, 3);
            const value = from + (to - from) * eased;

            onUpdate(value);

            if (t < 1) {
                angleAnimRef.current = requestAnimationFrame(tick);
            }
        }

        angleAnimRef.current = requestAnimationFrame(tick);
    }, []);

    const handleMove = useCallback(
        (e) => {
            if (!containerRef.current) return;

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            animationFrameRef.current = requestAnimationFrame(() => {
                const element = containerRef.current;
                if (!element) return;

                const { left, top, width, height } = element.getBoundingClientRect();
                const mouseX = e ? e.x ?? e.clientX : lastPosition.current.x;
                const mouseY = e ? e.y ?? e.clientY : lastPosition.current.y;

                if (e) {
                    lastPosition.current = { x: mouseX, y: mouseY };
                }

                const center = [left + width * 0.5, top + height * 0.5];
                const distanceFromCenter = Math.hypot(
                    mouseX - center[0],
                    mouseY - center[1]
                );
                const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

                if (distanceFromCenter < inactiveRadius) {
                    element.style.setProperty('--active', '0');
                    return;
                }

                const isActive =
                    mouseX > left - proximity &&
                    mouseX < left + width + proximity &&
                    mouseY > top - proximity &&
                    mouseY < top + height + proximity;

                element.style.setProperty('--active', isActive ? '1' : '0');

                if (!isActive) return;

                const currentAngle =
                    parseFloat(element.style.getPropertyValue('--start')) || 0;
                let targetAngle =
                    (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
                    Math.PI +
                    90;

                const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
                const newAngle = currentAngle + angleDiff;

                animateAngle(currentAngle, newAngle, movementDuration, (value) => {
                    if (element) {
                        element.style.setProperty('--start', String(value));
                    }
                });
            });
        },
        [inactiveZone, proximity, movementDuration, animateAngle]
    );

    useEffect(() => {
        if (disabled) return;

        const handleScroll = () => handleMove();
        const handlePointerMove = (e) => handleMove(e);

        window.addEventListener('scroll', handleScroll, { passive: true });
        document.body.addEventListener('pointermove', handlePointerMove, {
            passive: true,
        });

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (angleAnimRef.current) {
                cancelAnimationFrame(angleAnimRef.current);
            }
            window.removeEventListener('scroll', handleScroll);
            document.body.removeEventListener('pointermove', handlePointerMove);
        };
    }, [handleMove, disabled]);

    const defaultGradient = `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
    radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
    radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%),
    radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
    repeating-conic-gradient(
      from 236.84deg at 50% 50%,
      #dd7bbb 0%,
      #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
      #5a922c calc(50% / var(--repeating-conic-gradient-times)),
      #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
      #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
    )`;

    const whiteGradient = `repeating-conic-gradient(
    from 236.84deg at 50% 50%,
    #000,
    #000 calc(25% / var(--repeating-conic-gradient-times))
  )`;

    return (
        <>
            {/* Static border fallback when disabled */}
            <div
                className="glowing-effect-disabled-border"
                style={{
                    display: disabled ? 'block' : 'none',
                    opacity: glow ? 1 : 0,
                    borderColor: variant === 'white' ? '#fff' : 'transparent',
                }}
            />

            {/* Animated glow overlay */}
            <div
                ref={containerRef}
                className="glowing-effect-container"
                style={{
                    '--blur': `${blur}px`,
                    '--spread': spread,
                    '--start': '0',
                    '--active': '0',
                    '--glowingeffect-border-width': `${borderWidth}px`,
                    '--repeating-conic-gradient-times': '5',
                    '--gradient': variant === 'white' ? whiteGradient : defaultGradient,
                    display: disabled ? 'none' : undefined,
                    filter: blur > 0 ? `blur(${blur}px)` : undefined,
                    opacity: glow ? 1 : undefined,
                }}
            >
                <div className="glow" />
            </div>
        </>
    );
});

export default GlowingEffect;
