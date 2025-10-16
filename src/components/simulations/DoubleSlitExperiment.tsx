import React, { useRef, useEffect, useState, useCallback } from 'react';
import Slider from '../Slider';

const DoubleSlitExperiment: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wavelength, setWavelength] = useState(50); // Corresponds to color/frequency
  const [slitSeparation, setSlitSeparation] = useState(100); // d
  const [screenDistance, setScreenDistance] = useState(300); // L

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    const slitYCenter = height / 2;
    const slitScreenX = 100;

    // 1. Draw the barrier and slits
    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(slitScreenX - 5, 0, 10, height);
    ctx.clearRect(slitScreenX - 5, slitYCenter - slitSeparation / 2 - 5, 10, 10);
    ctx.clearRect(slitScreenX - 5, slitYCenter + slitSeparation / 2 - 5, 10, 10);
    
    const slit1 = { x: slitScreenX, y: slitYCenter - slitSeparation / 2 };
    const slit2 = { x: slitScreenX, y: slitYCenter + slitSeparation / 2 };

    // 2. Draw the interference pattern on the screen
    const screenX = slitScreenX + screenDistance;
    if (screenX < width) {
        ctx.fillStyle = '#9ca3af';
        ctx.fillRect(screenX - 2, 0, 4, height);

        for (let y = 0; y < height; y++) {
            const path1 = Math.sqrt(Math.pow(screenDistance, 2) + Math.pow(y - slit1.y, 2));
            const path2 = Math.sqrt(Math.pow(screenDistance, 2) + Math.pow(y - slit2.y, 2));
            const pathDifference = Math.abs(path1 - path2);

            // Intensity is proportional to cos^2 of the phase difference
            const phaseDifference = (2 * Math.PI * pathDifference) / wavelength;
            const intensity = Math.pow(Math.cos(phaseDifference / 2), 2);
            
            const hue = 180 + (wavelength - 30) * 2; // Simple mapping from wavelength to color
            ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${intensity})`;
            ctx.fillRect(screenX + 2, y, 15, 1);
        }
    }

    // 3. Draw waves (simplified visualization)
    ctx.lineWidth = 1.5;
    for (let i = 1; i < 20; i++) {
        const radius = i * wavelength / 2;
        const hue = 180 + (wavelength - 30) * 2;
        ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${1 - i/25})`;

        // Waves from slit 1
        ctx.beginPath();
        ctx.arc(slit1.x, slit1.y, radius, -Math.PI/2, Math.PI/2);
        ctx.stroke();
        
        // Waves from slit 2
        ctx.beginPath();
        ctx.arc(slit2.x, slit2.y, radius, -Math.PI/2, Math.PI/2);
        ctx.stroke();
    }
    
  }, [wavelength, slitSeparation, screenDistance]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const handleResize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = 400;
        draw(context);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [draw]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    draw(context);
  }, [draw]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3 flex flex-col space-y-6">
        <Slider 
          label="Wavelength (λ)" 
          value={wavelength * 10} 
          min={380} 
          max={750} 
          step={1} 
          unit="nm" 
          onChange={(v) => setWavelength(v/10)} 
        />
        <Slider 
          label="Slit Separation (d)" 
          value={slitSeparation} 
          min={20} 
          max={200} 
          step={1} 
          unit="µm" 
          onChange={setSlitSeparation} 
        />
        <Slider 
          label="Screen Distance (L)" 
          value={screenDistance} 
          min={100} 
          max={500} 
          step={5} 
          unit="cm" 
          onChange={setScreenDistance} 
        />
      </div>
      <div className="md:w-2/3">
        <canvas ref={canvasRef} className="w-full h-[400px] bg-gray-900 rounded-lg border border-gray-700"></canvas>
      </div>
    </div>
  );
};

export default DoubleSlitExperiment;
