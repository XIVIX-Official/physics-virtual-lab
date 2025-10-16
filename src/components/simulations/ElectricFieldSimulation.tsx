import React, { useRef, useEffect, useState, useCallback } from 'react';

type Charge = {
  x: number;
  y: number;
  q: number; // +1 for positive, -1 for negative
};

type ChargeMode = 'positive' | 'negative';

const ElectricFieldSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [charges, setCharges] = useState<Charge[]>([]);
  const [mode, setMode] = useState<ChargeMode>('positive');
  
  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw Charges
    charges.forEach(charge => {
      ctx.beginPath();
      ctx.arc(charge.x, charge.y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = charge.q > 0 ? 'rgb(239 68 68)' : 'rgb(59 130 246)';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw '+' or '-'
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(charge.q > 0 ? '+' : '-', charge.x, charge.y);
    });
    
    // Draw Field Lines
    drawFieldLines(ctx, charges);

  }, [charges]);

  const getElectricField = (x: number, y: number, allCharges: Charge[]) => {
    let Ex = 0, Ey = 0;
    for (const charge of allCharges) {
      const dx = x - charge.x;
      const dy = y - charge.y;
      const rSq = dx * dx + dy * dy;
      if (rSq < 25) continue; // Prevent extreme values near charge
      
      const r = Math.sqrt(rSq);
      const E = charge.q / rSq; // k = 1 for simplicity
      
      Ex += E * (dx / r);
      Ey += E * (dy / r);
    }
    return { Ex, Ey };
  };

  const drawFieldLines = (ctx: CanvasRenderingContext2D, allCharges: Charge[]) => {
    const positiveCharges = allCharges.filter(c => c.q > 0);
    const stepSize = 3;
    const maxSteps = 300;
    const linesPerCharge = 16;
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.7)';
    
    for (const pCharge of positiveCharges) {
      for (let i = 0; i < linesPerCharge; i++) {
        const angle = (i / linesPerCharge) * 2 * Math.PI;
        let x = pCharge.x + Math.cos(angle) * 10;
        let y = pCharge.y + Math.sin(angle) * 10;
        
        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let step = 0; step < maxSteps; step++) {
          const { Ex, Ey } = getElectricField(x, y, allCharges);
          const E_mag = Math.sqrt(Ex * Ex + Ey * Ey);
          if (E_mag === 0) break;
          
          const dx = (Ex / E_mag) * stepSize;
          const dy = (Ey / E_mag) * stepSize;
          
          x += dx;
          y += dy;
          
          ctx.lineTo(x, y);
          
          // Draw arrow head
          if(step % 40 === 0 && step > 0) {
              const arrowAngle = Math.atan2(dy, dx);
              ctx.moveTo(x,y);
              ctx.lineTo(x - 6 * Math.cos(arrowAngle - Math.PI / 6), y - 6 * Math.sin(arrowAngle - Math.PI / 6));
              ctx.moveTo(x,y);
              ctx.lineTo(x - 6 * Math.cos(arrowAngle + Math.PI / 6), y - 6 * Math.sin(arrowAngle + Math.PI / 6));
          }

          // Check for termination
          if (x < 0 || x > ctx.canvas.width || y < 0 || y > ctx.canvas.height) break;

          let nearNegative = false;
          for (const charge of allCharges) {
            if (charge.q < 0) {
              const distSq = (x - charge.x) ** 2 + (y - charge.y) ** 2;
              if (distSq < 100) {
                nearNegative = true;
                break;
              }
            }
          }
          if (nearNegative) break;
        }
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const handleResize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        draw(context);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    draw(context);

    return () => window.removeEventListener('resize', handleResize);
  }, [draw]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setCharges(prev => [...prev, { x, y, q: mode === 'positive' ? 1 : -1 }]);
  };

  return (
    <div className="flex flex-col gap-4 h-[500px]">
       <div className="flex items-center justify-center space-x-4 p-2 bg-gray-900 rounded-lg">
          <button 
            onClick={() => setMode('positive')}
            className={`px-4 py-2 rounded-lg transition-colors w-40 ${mode === 'positive' ? 'bg-red-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
            Add Positive Charge
          </button>
           <button 
            onClick={() => setMode('negative')}
            className={`px-4 py-2 rounded-lg transition-colors w-40 ${mode === 'negative' ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
            Add Negative Charge
          </button>
          <button 
            onClick={() => setCharges([])}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors w-24">
            Clear
          </button>
      </div>
      <div className="flex-grow w-full h-full bg-gray-900 rounded-lg border border-gray-700 cursor-crosshair">
        <canvas ref={canvasRef} onClick={handleCanvasClick} className="w-full h-full"></canvas>
      </div>
    </div>
  );
};

export default ElectricFieldSimulation;
