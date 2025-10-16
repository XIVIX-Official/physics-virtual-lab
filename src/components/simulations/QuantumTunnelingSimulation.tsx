import React, { useRef, useEffect, useState, useCallback } from 'react';
import Slider from '../Slider';

const QuantumTunnelingSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Fix: Initialize useRef with null to provide an initial value.
  const animationFrameId = useRef<number | null>(null);
  const [particleEnergy, setParticleEnergy] = useState(0.7); // as a fraction of barrier height
  const [barrierWidth, setBarrierWidth] = useState(20);
  const [barrierHeight, setBarrierHeight] = useState(50);
  const [isRunning, setIsRunning] = useState(false);

  const wavePacket = useRef({ x: 50, width: 40, k: 5 }); // x, spatial width, wave number
  const reflectedPacket = useRef({ x: 50, amplitude: 0, active: false });
  const transmittedPacket = useRef({ x: 0, amplitude: 0, active: false });

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    wavePacket.current = { x: 50, width: 40, k: 5 };
    reflectedPacket.current = { x: 50, amplitude: 0, active: false };
    transmittedPacket.current = { x: 0, amplitude: 0, active: false };
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) draw(context);
    }
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;
    const groundLevel = height - 50;
    const barrierStartX = width / 2 - barrierWidth / 2;
    const barrierEndX = width / 2 + barrierWidth / 2;
    
    ctx.clearRect(0, 0, width, height);

    // Draw Potential Barrier
    ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.strokeStyle = 'rgb(239, 68, 68)';
    ctx.lineWidth = 2;
    ctx.fillRect(barrierStartX, groundLevel - barrierHeight, barrierWidth, barrierHeight);
    ctx.strokeRect(barrierStartX, groundLevel - barrierHeight, barrierWidth, barrierHeight);
    
    // Draw Energy Level line
    const energyY = groundLevel - (particleEnergy * barrierHeight);
    ctx.beginPath();
    ctx.moveTo(0, energyY);
    ctx.lineTo(width, energyY);
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.8)';
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgb(34, 211, 238)';
    ctx.font = '12px sans-serif';
    ctx.fillText('Particle Energy', 10, energyY - 5);

    // Draw Wave Packets
    const drawPacket = (x_center: number, amplitude: number, k: number) => {
      if(amplitude === 0) return;
      ctx.beginPath();
      const packetWidth = wavePacket.current.width;
      for (let x_rel = -packetWidth * 2; x_rel < packetWidth * 2; x_rel += 0.5) {
        const x = x_center + x_rel;
        const envelope = Math.exp(-Math.pow(x_rel / packetWidth, 2));
        const wave = Math.cos(k * x_rel);
        const y = energyY - (amplitude * envelope * wave * 20); // Scale for visibility
        if (x_rel === -packetWidth * 2) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    drawPacket(wavePacket.current.x, 1.0, wavePacket.current.k); // Incident
    if (reflectedPacket.current.active) {
        drawPacket(reflectedPacket.current.x, reflectedPacket.current.amplitude, -wavePacket.current.k); // Reflected
    }
    if (transmittedPacket.current.active) {
        drawPacket(transmittedPacket.current.x, transmittedPacket.current.amplitude, wavePacket.current.k); // Transmitted
    }

  }, [barrierHeight, barrierWidth, particleEnergy]);

  const animate = useCallback(() => {
    const barrierStartX = canvasRef.current!.width / 2 - barrierWidth / 2;
    const velocity = 1;

    // Incident packet moves right
    if (wavePacket.current.x < barrierStartX - wavePacket.current.width) {
        wavePacket.current.x += velocity;
    } else {
        // At the barrier, calculate T and R, and create new packets
        const E = particleEnergy;
        const V0 = 1; // Normalized barrier height
        const a = barrierWidth / 10; // Scaled width
        const k1_sq = E;
        const k2_sq = Math.abs(E - V0);

        let T;
        if (E > V0) {
            T = 1; // Simplified for E>V0
        } else {
            // Tunneling probability
            T = 1 / (1 + (V0*V0 * Math.sinh(Math.sqrt(k2_sq) * a)**2) / (4*E*(V0-E)));
        }
        T = isNaN(T) ? 0 : T;

        const R = 1 - T;

        reflectedPacket.current = { x: wavePacket.current.x, amplitude: Math.sqrt(R), active: true };
        transmittedPacket.current = { x: barrierStartX + barrierWidth + wavePacket.current.width, amplitude: Math.sqrt(T), active: true };

        // Hide original packet
        wavePacket.current.x = -1000; 
    }
    
    // Reflected packet moves left
    if(reflectedPacket.current.active) {
        reflectedPacket.current.x -= velocity;
    }
    // Transmitted packet moves right
    if(transmittedPacket.current.active) {
        transmittedPacket.current.x += velocity;
    }

    const canvas = canvasRef.current;
    if (canvas) {
        const context = canvas.getContext('2d');
        if (context) draw(context);
    }
    
    // Stop condition
    if(transmittedPacket.current.x > canvasRef.current!.width + 50) {
        resetSimulation();
        return;
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [draw, particleEnergy, barrierWidth, resetSimulation]);

  useEffect(() => {
    resetSimulation();
  }, [particleEnergy, barrierWidth, barrierHeight, resetSimulation]);

  useEffect(() => {
    if (isRunning) {
        animationFrameId.current = requestAnimationFrame(animate);
    } else {
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    }
    return () => {
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isRunning, animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const handleResize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = 300;
        draw(context);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [draw]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Slider label="Particle Energy / Barrier Height" value={particleEnergy} min={0.1} max={1.5} step={0.05} unit="" onChange={setParticleEnergy} disabled={isRunning} />
        <Slider label="Barrier Width" value={barrierWidth} min={5} max={80} step={1} unit="fm" onChange={setBarrierWidth} disabled={isRunning} />
        <Slider label="Barrier Height" value={barrierHeight} min={20} max={150} step={5} unit="MeV" onChange={setBarrierHeight} disabled={isRunning} />
      </div>
      <div className="flex space-x-4">
        <button onClick={() => setIsRunning(true)} disabled={isRunning} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
          Start
        </button>
        <button onClick={resetSimulation} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Reset
        </button>
      </div>
      <div className="w-full h-[300px]">
        <canvas ref={canvasRef} className="w-full h-full bg-gray-900 rounded-lg border border-gray-700"></canvas>
      </div>
    </div>
  );
};

export default QuantumTunnelingSimulation;
