import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import './WebcamPixelGrid.css';

function WebcamPixelGrid({
    gridCols = 64,
    gridRows = 48,
    maxElevation = 15,
    motionSensitivity = 0.4,
    elevationSmoothing = 0.1,
    colorMode = 'webcam',
    monochromeColor = '#00ff88',
    backgroundColor = '#0a0a0a',
    mirror = true,
    gapRatio = 0.1,
    invertColors = false,
    darken = 0,
    borderColor = '#ffffff',
    borderOpacity = 0.08,
    className = '',
    onWebcamError,
    onWebcamReady,
}) {
    const videoRef = useRef(null);
    const processingCanvasRef = useRef(null);
    const displayCanvasRef = useRef(null);
    const previousFrameRef = useRef(null);
    const pixelDataRef = useRef([]);
    const animationRef = useRef(0);
    const streamRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);
    const [showErrorPopup, setShowErrorPopup] = useState(true);

    // Parse hex color to RGB
    const monoRGB = useMemo(() => {
        const hex = monochromeColor.replace('#', '');
        return {
            r: parseInt(hex.slice(0, 2), 16),
            g: parseInt(hex.slice(2, 4), 16),
            b: parseInt(hex.slice(4, 6), 16),
        };
    }, [monochromeColor]);

    const borderRGB = useMemo(() => {
        const hex = borderColor.replace('#', '');
        return {
            r: parseInt(hex.slice(0, 2), 16),
            g: parseInt(hex.slice(2, 4), 16),
            b: parseInt(hex.slice(4, 6), 16),
        };
    }, [borderColor]);

    // Initialize pixel data grid
    useEffect(() => {
        pixelDataRef.current = Array.from({ length: gridRows }, () =>
            Array.from({ length: gridCols }, () => ({
                r: 30, g: 30, b: 30,
                motion: 0,
                targetElevation: 0,
                currentElevation: 0,
            }))
        );
    }, [gridCols, gridRows]);

    // Request camera access
    const requestCameraAccess = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user',
                },
            });

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
                setIsReady(true);
                setError(null);
                setShowErrorPopup(false);
                onWebcamReady?.();
            }
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Webcam access denied');
            setError(error.message);
            onWebcamError?.(error);
        }
    }, [onWebcamError, onWebcamReady]);

    // Start webcam on mount
    useEffect(() => {
        requestCameraAccess();
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, [requestCameraAccess]);

    // Main render loop
    const render = useCallback(() => {
        const video = videoRef.current;
        const processingCanvas = processingCanvasRef.current;
        const displayCanvas = displayCanvasRef.current;

        if (!video || !processingCanvas || !displayCanvas || video.readyState < 2) {
            animationRef.current = requestAnimationFrame(render);
            return;
        }

        const procCtx = processingCanvas.getContext('2d', { willReadFrequently: true });
        const dispCtx = displayCanvas.getContext('2d');

        if (!procCtx || !dispCtx) {
            animationRef.current = requestAnimationFrame(render);
            return;
        }

        // Set processing canvas to grid dimensions
        processingCanvas.width = gridCols;
        processingCanvas.height = gridRows;

        // Draw video to processing canvas (scaled down)
        procCtx.save();
        if (mirror) {
            procCtx.scale(-1, 1);
            procCtx.drawImage(video, -gridCols, 0, gridCols, gridRows);
        } else {
            procCtx.drawImage(video, 0, 0, gridCols, gridRows);
        }
        procCtx.restore();

        // Get pixel data
        const imageData = procCtx.getImageData(0, 0, gridCols, gridRows);
        const currentData = imageData.data;
        const previousData = previousFrameRef.current;

        // Update pixel data with motion detection
        const pixels = pixelDataRef.current;
        for (let row = 0; row < gridRows; row++) {
            for (let col = 0; col < gridCols; col++) {
                const idx = (row * gridCols + col) * 4;
                const r = currentData[idx];
                const g = currentData[idx + 1];
                const b = currentData[idx + 2];

                const pixel = pixels[row]?.[col];
                if (!pixel) continue;

                // Calculate motion
                let motion = 0;
                if (previousData) {
                    const prevR = previousData[idx];
                    const prevG = previousData[idx + 1];
                    const prevB = previousData[idx + 2];
                    const diff = Math.abs(r - prevR) + Math.abs(g - prevG) + Math.abs(b - prevB);
                    motion = Math.min(1, diff / 255 / motionSensitivity);
                }

                // Smooth motion
                pixel.motion = pixel.motion * 0.7 + motion * 0.3;

                // Set colors
                let finalR = r;
                let finalG = g;
                let finalB = b;

                if (colorMode === 'monochrome') {
                    const brightness = (r + g + b) / 3 / 255;
                    finalR = Math.round(monoRGB.r * brightness);
                    finalG = Math.round(monoRGB.g * brightness);
                    finalB = Math.round(monoRGB.b * brightness);
                }

                if (invertColors) {
                    finalR = 255 - finalR;
                    finalG = 255 - finalG;
                    finalB = 255 - finalB;
                }

                if (darken > 0) {
                    const darkenFactor = 1 - darken;
                    finalR = Math.round(finalR * darkenFactor);
                    finalG = Math.round(finalG * darkenFactor);
                    finalB = Math.round(finalB * darkenFactor);
                }

                pixel.r = finalR;
                pixel.g = finalG;
                pixel.b = finalB;

                // Set target elevation based on motion
                pixel.targetElevation = pixel.motion * maxElevation;

                // Smooth elevation transition
                pixel.currentElevation +=
                    (pixel.targetElevation - pixel.currentElevation) * elevationSmoothing;
            }
        }

        // Store current frame for next comparison
        previousFrameRef.current = new Uint8ClampedArray(currentData);

        // Render to display canvas
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = displayCanvas.clientWidth;
        const displayHeight = displayCanvas.clientHeight;

        displayCanvas.width = displayWidth * dpr;
        displayCanvas.height = displayHeight * dpr;
        dispCtx.scale(dpr, dpr);

        // Clear canvas
        dispCtx.fillStyle = backgroundColor;
        dispCtx.fillRect(0, 0, displayWidth, displayHeight);

        // Calculate cell size (square cells, covering the container)
        const cellSize = Math.max(displayWidth / gridCols, displayHeight / gridRows);
        const gap = cellSize * gapRatio;

        // Center the grid
        const gridWidth = cellSize * gridCols;
        const gridHeight = cellSize * gridRows;
        const offsetXGrid = (displayWidth - gridWidth) / 2;
        const offsetYGrid = (displayHeight - gridHeight) / 2;

        // Draw cells with 3D effect
        for (let row = 0; row < gridRows; row++) {
            for (let col = 0; col < gridCols; col++) {
                const pixel = pixels[row]?.[col];
                if (!pixel) continue;

                const x = offsetXGrid + col * cellSize;
                const y = offsetYGrid + row * cellSize;
                const elevation = pixel.currentElevation;

                const offsetX = -elevation * 1.2;
                const offsetY = -elevation * 1.8;

                // Shadow
                if (elevation > 0.5) {
                    dispCtx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.6, elevation * 0.04)})`;
                    dispCtx.fillRect(
                        x + gap / 2 + elevation * 1.5,
                        y + gap / 2 + elevation * 2.0,
                        cellSize - gap,
                        cellSize - gap
                    );
                }

                // Side faces for 3D effect
                if (elevation > 0.5) {
                    // Right side
                    dispCtx.fillStyle = `rgb(${Math.max(0, pixel.r - 80)}, ${Math.max(0, pixel.g - 80)}, ${Math.max(0, pixel.b - 80)})`;
                    dispCtx.beginPath();
                    dispCtx.moveTo(x + cellSize - gap / 2 + offsetX, y + gap / 2 + offsetY);
                    dispCtx.lineTo(x + cellSize - gap / 2, y + gap / 2);
                    dispCtx.lineTo(x + cellSize - gap / 2, y + cellSize - gap / 2);
                    dispCtx.lineTo(x + cellSize - gap / 2 + offsetX, y + cellSize - gap / 2 + offsetY);
                    dispCtx.closePath();
                    dispCtx.fill();

                    // Bottom side
                    dispCtx.fillStyle = `rgb(${Math.max(0, pixel.r - 50)}, ${Math.max(0, pixel.g - 50)}, ${Math.max(0, pixel.b - 50)})`;
                    dispCtx.beginPath();
                    dispCtx.moveTo(x + gap / 2 + offsetX, y + cellSize - gap / 2 + offsetY);
                    dispCtx.lineTo(x + gap / 2, y + cellSize - gap / 2);
                    dispCtx.lineTo(x + cellSize - gap / 2, y + cellSize - gap / 2);
                    dispCtx.lineTo(x + cellSize - gap / 2 + offsetX, y + cellSize - gap / 2 + offsetY);
                    dispCtx.closePath();
                    dispCtx.fill();
                }

                // Top face
                const brightness = 1 + elevation * 0.05;
                dispCtx.fillStyle = `rgb(${Math.min(255, Math.round(pixel.r * brightness))}, ${Math.min(255, Math.round(pixel.g * brightness))}, ${Math.min(255, Math.round(pixel.b * brightness))})`;
                dispCtx.fillRect(
                    x + gap / 2 + offsetX,
                    y + gap / 2 + offsetY,
                    cellSize - gap,
                    cellSize - gap
                );

                // Border
                dispCtx.strokeStyle = `rgba(${borderRGB.r}, ${borderRGB.g}, ${borderRGB.b}, ${borderOpacity + elevation * 0.008})`;
                dispCtx.lineWidth = 0.5;
                dispCtx.strokeRect(
                    x + gap / 2 + offsetX,
                    y + gap / 2 + offsetY,
                    cellSize - gap,
                    cellSize - gap
                );
            }
        }

        animationRef.current = requestAnimationFrame(render);
    }, [
        gridCols, gridRows, mirror, motionSensitivity, colorMode, monoRGB,
        maxElevation, elevationSmoothing, backgroundColor, gapRatio,
        invertColors, darken, borderRGB, borderOpacity,
    ]);

    // Start render loop when webcam is ready
    useEffect(() => {
        if (!isReady) return;
        animationRef.current = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationRef.current);
    }, [isReady, render]);

    return (
        <div className={`wpg-container ${className}`}>
            <video ref={videoRef} className="wpg-hidden" playsInline muted />
            <canvas ref={processingCanvasRef} className="wpg-hidden" />
            <canvas
                ref={displayCanvasRef}
                className={`wpg-display ${isReady ? 'wpg-visible' : 'wpg-invisible'}`}
                style={{ backgroundColor }}
            />
            {error && showErrorPopup && (
                <div className="wpg-error-popup">
                    <p className="wpg-error-text">Camera access needed</p>
                    <p className="wpg-error-sub">Allow camera access to see the pixel grid effect</p>
                    <button onClick={requestCameraAccess} className="wpg-error-btn">
                        Enable Camera
                    </button>
                    <button
                        onClick={() => setShowErrorPopup(false)}
                        className="wpg-error-dismiss"
                    >
                        Dismiss
                    </button>
                </div>
            )}
        </div>
    );
}

export default WebcamPixelGrid;
