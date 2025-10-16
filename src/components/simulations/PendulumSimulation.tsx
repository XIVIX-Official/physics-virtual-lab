import React, { useRef, useEffect, useState, useCallback } from 'react';
import Slider from '../Slider';

const PendulumSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const [length, setLength] = useState(150); // in pixels
  const [gravity, setGravity] = useState(0.4);
  const [mass, setMass] = useState(20);
  const [isRunning, setIsRunning] = useState(false);

  const angle = useRef(Math.PI / 4);
  const angularVelocity = useRef(0);
  const angularAcceleration = useRef(0);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const pivotX = ctx.canvas.width / 2;
    const pivotY = 50;
    const bobX = pivotX + length * Math.sin(angle.current);
    const bobY = pivotY + length * Math.cos(angle.current);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(pivotX - 10, pivotY - 5, 20, 10);

    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(bobX, bobY, mass, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgb(34 211 238)';
    ctx.fill();
    ctx.strokeStyle = 'rgb(107 114 128)';
    ctx.stroke();
  }, [length, mass]);

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    angle.current = Math.PI / 2;
    angularVelocity.current = 0;
    angularAcceleration.current = 0;
    
    // Force a redraw in the reset state
    const canvas = canvasRef.current;
    if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
            draw(context);
        }
    }
  }, [draw]);

  const animate = useCallback(() => {
    angularAcceleration.current = (-gravity / length) * Math.sin(angle.current);
    angularVelocity.current += angularAcceleration.current;
    angle.current += angularVelocity.current;
    angularVelocity.current *= 0.995; // Damping

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        draw(context);
      }
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [draw, gravity, length]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    
    const handleResize = () => {
        if (canvas && context) {
            const container = canvas.parentElement;
            if(container) {
                canvas.width = container.clientWidth;
                canvas.height = 400;
                draw(context);
            }
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, [draw]);


  useEffect(() => {
    if (isRunning) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRunning, animate]);
  
  useEffect(() => {
    resetSimulation();
  }, [length, gravity, mass, resetSimulation]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3 flex flex-col space-y-6">
        <Slider label="Length" value={length/100} min={0.5} max={2.5} step={0.01} unit="m" onChange={(v) => setLength(v * 100)} disabled={isRunning} />
        <Slider label="Gravity" value={gravity * 24.5} min={2} max={25} step={0.1} unit="m/s²" onChange={(v) => setGravity(v / 24.5)} disabled={isRunning} />
        <Slider label="Bob Mass" value={mass} min={5} max={30} step={1} unit="kg" onChange={setMass} disabled={isRunning} />
        <div className="flex space-x-4 pt-4">
          <button onClick={() => setIsRunning(!isRunning)} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetSimulation} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Reset
          </button>
        </div>
      </div>
      <div className="md:w-2/3">
        <canvas ref={canvasRef} className="w-full h-[400px] bg-gray-900 rounded-lg border border-gray-700"></canvas>
      </div>
    </div>
  );
};

export default PendulumSimulation;