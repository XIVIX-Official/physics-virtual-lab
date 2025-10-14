import { useState, useCallback, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import PhysicsCanvas from '../../components/Canvas/PhysicsCanvas';
import { config } from './config';
import { NewtonianMotionEngine } from './engine';
import { Vector2D } from '@physics/vectors';

const SimulationContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Controls = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Control = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.25rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 1rem;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const NewtonianMotion = ({ onBack }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [controls, setControls] = useState(config.controls);
  const engineRef = useRef(new NewtonianMotionEngine(config));

  const handleStart = () => setIsRunning(prev => !prev);
  
  const handleReset = () => {
    engineRef.current.reset();
    setControls(config.controls);
  };

  const handleControlChange = (id, value) => {
    setControls(prev =>
      prev.map(control =>
        control.id === id ? { ...control, value: Number(value) } : control
      )
    );
    engineRef.current.updateControl(id, Number(value));
  };

  const setupCanvas = useCallback((context) => {
    const { width, height } = config.canvas;
    context.lineWidth = 2;
    context.font = '14px Arial';
    context.textAlign = 'center';
  }, []);

  const drawGrid = useCallback((context) => {
    const { width, height, scale } = config.canvas;
    context.strokeStyle = '#ddd';
    context.lineWidth = 0.5;

    // Draw grid
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    // Draw grid
    for (let x = -halfWidth; x <= halfWidth; x += scale) {
      context.beginPath();
      context.moveTo(x, -halfHeight);
      context.lineTo(x, halfHeight);
      context.stroke();
    }
    
    for (let y = -halfHeight; y <= halfHeight; y += scale) {
      context.beginPath();
      context.moveTo(-halfWidth, y);
      context.lineTo(halfWidth, y);
      context.stroke();
    }

    // Draw axes
    context.strokeStyle = '#999';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(-halfWidth, 0);
    context.lineTo(halfWidth, 0);
    context.moveTo(0, -halfHeight);
    context.lineTo(0, halfHeight);
    context.stroke();
  }, []);

  const drawObject = useCallback((context, position, velocity) => {
    const { scale } = config.canvas;
    const mass = controls.find(c => c.id === 'mass').value;
    const radius = Math.sqrt(mass) * 10;

    // Draw object
    context.fillStyle = '#007bff';
    context.beginPath();
    context.arc(position.x * scale, position.y * scale, radius, 0, Math.PI * 2);
    context.fill();

    // Draw velocity vector
    if (velocity.magnitude() > 0) {
      const velocityScale = 20;
      const endPoint = position.add(velocity.multiply(velocityScale));
      
      context.strokeStyle = '#ff4444';
      context.beginPath();
      context.moveTo(position.x * scale, position.y * scale);
      context.lineTo(endPoint.x * scale, endPoint.y * scale);
      context.stroke();
    }
  }, [controls]);

  const handleDraw = useCallback((context, deltaTime) => {
    if (!isRunning) return;

    const { width, height } = config.canvas;
    
    // Update physics
    engineRef.current.update(deltaTime);
    const state = engineRef.current.getState();

    // Clear canvas
    context.clearRect(0, 0, width, height);
    
    // Draw background elements
    drawGrid(context);
    
    // Draw physics object
    drawObject(context, state.position, state.velocity);
  }, [isRunning, drawGrid, drawObject]);

  return (
    <SimulationContainer>
      <div>
        <Button onClick={onBack}>← Back to Simulations</Button>
        <PhysicsCanvas
          width={config.canvas.width}
          height={config.canvas.height}
          onSetup={setupCanvas}
          onDraw={handleDraw}
        />
      </div>
      <Controls>
        <Control>
          <Button onClick={handleStart}>
            {isRunning ? 'Pause' : 'Start'} Simulation
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Control>
        {controls.map(control => (
          <Control key={control.id}>
            <Label>
              {control.label} ({control.unit})
            </Label>
            <Input
              type={control.type}
              min={control.min}
              max={control.max}
              step={control.step}
              value={control.value}
              onChange={(e) => handleControlChange(control.id, e.target.value)}
            />
            <div style={{ fontSize: '0.8rem', color: '#666' }}>
              {control.min} - {control.max} {control.unit}
            </div>
          </Control>
        ))}
      </Controls>
    </SimulationContainer>
  );
};

export default NewtonianMotion;