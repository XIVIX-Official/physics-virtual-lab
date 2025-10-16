import React, { useRef, useEffect, useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import Slider from '../Slider';

interface PositionData {
  time: number;
  position: number;
}

const SpringMassSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const simTime = useRef(0);

  const [mass, setMass] = useState(10);
  const [springConstant, setSpringConstant] = useState(2); // k
  const [damping, setDamping] = useState(0.1);
  const [isRunning, setIsRunning] = useState(false);
  const [positionData, setPositionData] = useState<PositionData[]>([]);

  const position = useRef(150); // initial displacement from equilibrium
  const velocity = useRef(0);
  const equilibrium = 100;

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const wallX = 50;
    const massY = ctx.canvas.height / 2;
    const massWidth = mass * 3;
    const massHeight = mass * 3;
    
    const bobX = wallX + equilibrium + position.current;
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Wall
    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(wallX - 10, massY - 50, 10, 100);

    // Spring
    drawSpring(ctx, wallX, massY, bobX - massWidth/2, massY, 20, 15);

    // Mass
    ctx.fillStyle = 'rgb(34 211 238)';
    ctx.fillRect(bobX - massWidth/2, massY - massHeight/2, massWidth, massHeight);
    ctx.strokeStyle = 'rgb(107 114 128)';
    ctx.strokeRect(bobX - massWidth/2, massY - massHeight/2, massWidth, massHeight);

  }, [mass]);

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    position.current = 150;
    velocity.current = 0;
    simTime.current = 0;
    setPositionData([{ time: 0, position: 150 }]);
    
    const canvas = canvasRef.current;
    if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
            draw(context);
        }
    }
  }, [draw]);
  
  const drawSpring = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, segments: number, width: number) => {
    const dx = endX - startX;
    const dy = endY - startY;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    
    ctx.save();
    ctx.translate(startX, startY);
    ctx.rotate(angle);
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    
    const segmentLength = length / segments;
    for (let i = 1; i < segments; i++) {
        const y = i % 2 === 0 ? -width : width;
        ctx.lineTo(i * segmentLength, y);
    }
    
    ctx.lineTo(length, 0);
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.restore();
  };

  const animate = useCallback(() => {
    const forceSpring = -springConstant * position.current;
    const forceDamping = -damping * velocity.current;
    const acceleration = (forceSpring + forceDamping) / mass;

    velocity.current += acceleration * 0.1; // dt = 0.1
    position.current += velocity.current * 0.1;
    simTime.current += 0.1;

    setPositionData(prevData => [...prevData.slice(-200), { time: simTime.current, position: position.current }]);

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        draw(context);
      }
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [draw, springConstant, damping, mass]);
  
  useEffect(() => {
    resetSimulation();
  }, [mass, springConstant, damping, resetSimulation]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    
    const handleResize = () => {
        if (canvas && context) {
            const container = canvas.parentElement;
            if(container) {
                canvas.width = container.clientWidth;
                canvas.height = 200;
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

  return (
    <div className="flex flex-col gap-6">
      <div className="grid md:grid-cols-3 gap-6">
          <Slider label="Mass" value={mass} min={1} max={30} step={1} unit="kg" onChange={setMass} disabled={isRunning} />
          <Slider label="Spring Constant" value={springConstant} min={0.1} max={5} step={0.1} unit="N/m" onChange={setSpringConstant} disabled={isRunning} />
          <Slider label="Damping" value={damping} min={0} max={1} step={0.05} unit="" onChange={setDamping} disabled={isRunning} />
      </div>
       <div className="flex space-x-4">
          <button onClick={() => setIsRunning(!isRunning)} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetSimulation} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Reset
          </button>
        </div>
      <div className="w-full h-[200px] bg-gray-900 rounded-lg border border-gray-700">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      <div className="w-full h-[200px]">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Position vs. Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={positionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis type="number" dataKey="time" name="Time" unit="s" domain={['dataMin', 'dataMax']} stroke="#a0aec0" />
            <YAxis type="number" dataKey="position" name="Position" unit="m" domain={[-200, 200]} stroke="#a0aec0" allowDataOverflow={true} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: '#4a5568' }}
              labelStyle={{ color: '#90cdf4' }}
            />
            <Line type="monotone" dataKey="position" stroke="#22d3ee" strokeWidth={2} dot={false} name="Position" isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpringMassSimulation;