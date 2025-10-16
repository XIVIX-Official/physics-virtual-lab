import React, { useState, useEffect, useRef } from 'react';
import Slider from '../Slider';

// Spaceship SVG component
// Fix: Allow width and height to be string or number to support percentage-based sizing.
const Spaceship: React.FC<{ width: string | number, height: string | number }> = ({ width, height }) => (
  <svg width={width} height={height} viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
    <path d="M 10 25 C 10 10, 30 5, 50 5 S 90 10, 90 25 S 70 45, 50 45 S 10 40, 10 25" fill="#22d3ee" />
    <path d="M 40 20 L 60 20 L 60 30 L 40 30 Z" fill="#083344" />
    <circle cx="50" cy="15" r="3" fill="#f0f9ff" />
    <path d="M 5 25 L 10 20 L 10 30 Z" fill="#f97316" />
    <path d="M 0 25 L 5 22 L 5 28 Z" fill="#ea580c" />
  </svg>
);

const SpecialRelativitySimulation: React.FC = () => {
  const [velocity, setVelocity] = useState(0); // as a fraction of c
  const [time, setTime] = useState(0);
  // Fix: Initialize useRef with null to provide an initial value.
  const animationFrameId = useRef<number | null>(null);

  const lorentzFactor = 1 / Math.sqrt(1 - velocity ** 2);
  const contractedLength = 100 / lorentzFactor; // Initial length is 100
  const dilatedTimeFactor = 1 / lorentzFactor;

  const stationaryTimeRef = useRef(0);
  const movingTimeRef = useRef(0);
  const lastTimestampRef = useRef(0);

  const animate = (timestamp: number) => {
    if (lastTimestampRef.current === 0) {
        lastTimestampRef.current = timestamp;
    }
    const deltaTime = (timestamp - lastTimestampRef.current) / 1000; // in seconds
    
    stationaryTimeRef.current += deltaTime;
    movingTimeRef.current += deltaTime * dilatedTimeFactor;
    
    setTime(stationaryTimeRef.current);
    lastTimestampRef.current = timestamp;

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      lastTimestampRef.current = 0;
    };
  }, [dilatedTimeFactor]);

  const handleReset = () => {
    stationaryTimeRef.current = 0;
    movingTimeRef.current = 0;
    setTime(0);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Slider 
          label="Velocity" 
          value={velocity} 
          min={0} 
          max={0.999} 
          step={0.001} 
          unit="c" 
          onChange={setVelocity} 
        />
        <div className="flex justify-center items-center">
            <button onClick={handleReset} className="w-full max-w-xs bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Reset Clocks
            </button>
        </div>
      </div>

      <div className="w-full p-4 bg-gray-900 rounded-lg border border-gray-700 grid grid-cols-1 md:grid-cols-3 text-center gap-4">
          <div>
              <p className="text-sm text-gray-400">Lorentz Factor (γ)</p>
              <p className="text-2xl font-mono text-cyan-400">{lorentzFactor.toFixed(4)}</p>
          </div>
          <div>
              <p className="text-sm text-gray-400">Apparent Length</p>
              <p className="text-2xl font-mono text-cyan-400">{contractedLength.toFixed(2)}%</p>
          </div>
          <div>
              <p className="text-sm text-gray-400">Time Rate</p>
              <p className="text-2xl font-mono text-cyan-400">{(dilatedTimeFactor * 100).toFixed(2)}%</p>
          </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {/* Stationary Frame */}
        <div className="p-4 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4 text-center">Stationary Observer's Frame</h3>
            <div className="relative h-32 bg-gray-800/50 rounded-lg overflow-hidden p-2">
                <div 
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ 
                        width: `${contractedLength}%`,
                        left: `calc(${time * 20 % 120 - 20}%)`, // Animate position
                    }}
                >
                    <Spaceship width="100%" height="50" />
                </div>
            </div>
            <div className="mt-4 text-center">
                <p className="text-gray-400">Elapsed Time</p>
                <p className="text-4xl font-mono bg-gray-800 py-2 rounded-lg text-white">{stationaryTimeRef.current.toFixed(2)}s</p>
            </div>
        </div>

        {/* Moving Frame */}
        <div className="p-4 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4 text-center">Spaceship's Frame</h3>
            <div className="relative h-32 bg-gray-800/50 rounded-lg flex justify-center items-center p-2">
                 <div style={{ width: `100%`}}>
                    <Spaceship width="100%" height="50" />
                </div>
            </div>
            <div className="mt-4 text-center">
                <p className="text-gray-400">Elapsed Time</p>
                <p className="text-4xl font-mono bg-gray-800 py-2 rounded-lg text-white">{movingTimeRef.current.toFixed(2)}s</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialRelativitySimulation;
