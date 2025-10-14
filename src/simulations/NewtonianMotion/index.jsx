import { useState, useCallback, useRef } from 'react';
import { styled } from '@emotion/styled';
import PhysicsCanvas from '@components/Canvas/PhysicsCanvas';
import ControlPanel from '@components/ControlPanel';
import { config } from './config';
import { NewtonianMotionEngine } from './engine';
import { Vector2D } from '@physics/vectors';

const SimulationContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  align-items: flex-start;
`;

const NewtonianMotion = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [controls, setControls] = useState(config.physics.controls);
  const engineRef = useRef(new NewtonianMotionEngine(config));

  const handleControlChange = useCallback((id, value) => {
    setControls((prev) =>
      prev.map((control) =>
        control.id === id
          ? { ...control, value: Number(value) }
          : control
      )
    );
    engineRef.current.updateControl(id, Number(value));
  }, []);

  const handleReset = useCallback(() => {
    engineRef.current.reset();
    setControls(config.physics.controls);
  }, []);

  const handleStart = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleDraw = useCallback((context, deltaTime) => {
    const { width, height, scale, origin } = config.canvas;
    engineRef.current.update(deltaTime);
    const { position, velocity } = engineRef.current.getState();

    // Clear and set up coordinate system
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(origin.x, origin.y);
    context.scale(1, -1); // Flip Y axis to match physics coordinates

    // Draw grid
    context.strokeStyle = '#eee';
    context.lineWidth = 1;
    const gridSize = scale;
    for (let x = -width / 2; x < width / 2; x += gridSize) {
      context.beginPath();
      context.moveTo(x, -height / 2);
      context.lineTo(x, height / 2);
      context.stroke();
    }
    for (let y = -height / 2; y < height / 2; y += gridSize) {
      context.beginPath();
      context.moveTo(-width / 2, y);
      context.lineTo(width / 2, y);
      context.stroke();
    }

    // Draw object
    const radius = 20;
    context.beginPath();
    context.arc(
      position.x * scale,
      position.y * scale,
      radius,
      0,
      Math.PI * 2
    );
    context.fillStyle = '#333';
    context.fill();

    // Draw velocity vector
    const velocityScale = 50;
    context.beginPath();
    context.moveTo(position.x * scale, position.y * scale);
    context.lineTo(
      position.x * scale + velocity.x * velocityScale,
      position.y * scale + velocity.y * velocityScale
    );
    context.strokeStyle = '#00f';
    context.lineWidth = 2;
    context.stroke();

    context.restore();
  }, []);

  return (
    <SimulationContainer>
      <PhysicsCanvas
        width={config.canvas.width}
        height={config.canvas.height}
        onDraw={handleDraw}
        isRunning={isRunning}
      />
      <ControlPanel
        title="Newtonian Motion"
        controls={controls}
        onControlChange={handleControlChange}
        onReset={handleReset}
        onStart={handleStart}
        isRunning={isRunning}
      />
    </SimulationContainer>
  );
};

export default NewtonianMotion;