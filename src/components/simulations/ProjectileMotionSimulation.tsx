import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Slider from '../Slider';

interface TrajectoryData {
  x: number;
  y: number;
}

const ProjectileMotionSimulation: React.FC = () => {
  const [initialVelocity, setInitialVelocity] = useState(50);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.8);
  const [trajectoryData, setTrajectoryData] = useState<TrajectoryData[]>([]);
  const [hasLaunched, setHasLaunched] = useState(false);

  const launch = () => {
    const data: TrajectoryData[] = [];
    const angleRad = angle * (Math.PI / 180);
    const timeStep = 0.1;
    let t = 0;
    let y = 0;
    
    do {
      const x = initialVelocity * Math.cos(angleRad) * t;
      y = initialVelocity * Math.sin(angleRad) * t - 0.5 * gravity * t * t;
      if (y >= 0) {
        data.push({ x, y });
      }
      t += timeStep;
    } while (y >= 0);

    if (data.length > 1) {
        const t_flight = (2 * initialVelocity * Math.sin(angleRad)) / gravity;
        const x_final = initialVelocity * Math.cos(angleRad) * t_flight;
        data.push({ x: x_final, y: 0 });
    }

    setTrajectoryData(data);
    setHasLaunched(true);
  };
  
  const reset = () => {
    setTrajectoryData([]);
    setHasLaunched(false);
  };

  const metrics = useMemo(() => {
    if (!hasLaunched) return { range: 0, maxHeight: 0, timeOfFlight: 0 };
    
    const angleRad = angle * (Math.PI / 180);
    const timeOfFlight = (2 * initialVelocity * Math.sin(angleRad)) / gravity;
    const range = (initialVelocity ** 2 * Math.sin(2 * angleRad)) / gravity;
    const maxHeight = (initialVelocity ** 2 * Math.sin(angleRad) ** 2) / (2 * gravity);

    return { range, maxHeight, timeOfFlight };
  }, [hasLaunched, initialVelocity, angle, gravity]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3 flex flex-col space-y-6">
        <Slider label="Initial Velocity" value={initialVelocity} min={1} max={100} step={1} unit="m/s" onChange={setInitialVelocity} />
        <Slider label="Launch Angle" value={angle} min={0} max={90} step={1} unit="°" onChange={setAngle} />
        <Slider label="Gravity" value={gravity} min={1} max={25} step={0.1} unit="m/s²" onChange={setGravity} />
        <div className="flex space-x-4 pt-4">
          <button onClick={launch} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Launch
          </button>
          <button onClick={reset} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Reset
          </button>
        </div>
        <div className="pt-4 space-y-3 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-cyan-400 border-b border-gray-600 pb-2 mb-2">Metrics</h3>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Range:</span> <span className="font-mono text-white">{metrics.range.toFixed(2)} m</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Max Height:</span> <span className="font-mono text-white">{metrics.maxHeight.toFixed(2)} m</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-400">Time of Flight:</span> <span className="font-mono text-white">{metrics.timeOfFlight.toFixed(2)} s</span></div>
        </div>
      </div>
      <div className="md:w-2/3 h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trajectoryData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis type="number" dataKey="x" name="Distance" unit="m" domain={['dataMin', 'dataMax']} stroke="#a0aec0" />
            <YAxis type="number" dataKey="y" name="Height" unit="m" domain={[0, 'dataMax + 10']} stroke="#a0aec0" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4a5568',
                color: '#e2e8f0',
              }}
              labelStyle={{ color: '#90cdf4' }}
            />
            <Legend wrapperStyle={{color: '#a0aec0'}} />
            <Line type="monotone" dataKey="y" stroke="#22d3ee" strokeWidth={2} dot={false} name="Trajectory" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectileMotionSimulation;
