import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

const Canvas = styled.canvas`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PhysicsCanvas = ({
  width = 800,
  height = 600,
  onSetup,
  onDraw,
  isRunning = true,
}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimestampRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set up canvas resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // Apply retina scale transform
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    // Move origin to center for easier physics calculations
    context.translate(width / 2, height / 2);

    contextRef.current = context;

    // Initialize canvas with setup function if provided
    if (onSetup) {
      onSetup(context);
    }

    // Clear any existing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const animate = (timestamp) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const deltaTime = (timestamp - lastTimestampRef.current) / 1000; // Convert to seconds
      lastTimestampRef.current = timestamp;

      context.save();
      context.clearRect(-width / 2, -height / 2, width, height);
      
      if (onDraw) {
        onDraw(context, deltaTime);
      }
      
      context.restore();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (isRunning) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height, onSetup, onDraw, isRunning]);

  return <Canvas ref={canvasRef} />;
};

export default PhysicsCanvas;