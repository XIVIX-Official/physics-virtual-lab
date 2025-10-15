import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Slider from '../Slider';

interface PlotData {
  time: number;
  current: number;
  voltageSource: number;
  voltageResistor: number;
  voltageInductor: number;
  voltageCapacitor: number;
}

const RLCCircuitSimulation: React.FC = () => {
  const [resistance, setResistance] = useState(10); // R (Ohms)
  const [inductance, setInductance] = useState(50); // L (mH)
  const [capacitance, setCapacitance] = useState(50); // C (uF)
  const [drivingFrequency, setDrivingFrequency] = useState(30); // f (Hz)
  const [vMax, setVMax] = useState(10); // Volts

  const { plotData, metrics } = useMemo(() => {
    const R = resistance;
    const L = inductance * 1e-3; // convert mH to H
    const C = capacitance * 1e-6; // convert uF to F
    const w = 2 * Math.PI * drivingFrequency; // angular frequency

    const Xl = w * L;
    const Xc = 1 / (w * C);
    const Z = Math.sqrt(R ** 2 + (Xl - Xc) ** 2);
    const Imax = vMax / Z;
    const phi = Math.atan2(Xl - Xc, R); // Phase angle

    const resonantFrequency = 1 / (2 * Math.PI * Math.sqrt(L * C));
    const Qfactor = (1 / R) * Math.sqrt(L / C);

    const data: PlotData[] = [];
    const timeStep = 1 / (drivingFrequency * 50); // 50 points per cycle
    const cycles = 5;
    const totalTime = cycles / drivingFrequency;

    for (let t = 0; t <= totalTime; t += timeStep) {
      const current = Imax * Math.cos(w * t - phi);
      const voltageSource = vMax * Math.cos(w * t);
      const voltageResistor = current * R;
      const voltageInductor = Imax * Xl * Math.cos(w * t - phi + Math.PI / 2);
      const voltageCapacitor = Imax * Xc * Math.cos(w * t - phi - Math.PI / 2);
      data.push({ time: t * 1000, current, voltageSource, voltageResistor, voltageInductor, voltageCapacitor }); // time in ms
    }

    return { 
        plotData: data, 
        metrics: { Z, phi: phi * 180 / Math.PI, resonantFrequency, Qfactor, Imax }
    };
  }, [resistance, inductance, capacitance, drivingFrequency, vMax]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Slider label="Resistance (R)" value={resistance} min={1} max={100} step={1} unit="Ω" onChange={setResistance} />
        <Slider label="Inductance (L)" value={inductance} min={1} max={200} step={1} unit="mH" onChange={setInductance} />
        <Slider label="Capacitance (C)" value={capacitance} min={1} max={200} step={1} unit="µF" onChange={setCapacitance} />
        <Slider label="Frequency (f)" value={drivingFrequency} min={1} max={100} step={1} unit="Hz" onChange={setDrivingFrequency} />
      </div>

      <div className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 grid grid-cols-2 md:grid-cols-4 text-center gap-2">
          <div>
              <p className="text-xs text-gray-400">Impedance (Z)</p>
              <p className="text-lg font-mono text-cyan-400">{metrics.Z.toFixed(2)} Ω</p>
          </div>
          <div>
              <p className="text-xs text-gray-400">Phase Angle (φ)</p>
              <p className="text-lg font-mono text-cyan-400">{metrics.phi.toFixed(2)}°</p>
          </div>
          <div>
              <p className="text-xs text-gray-400">Resonant Freq.</p>
              <p className="text-lg font-mono text-cyan-400">{metrics.resonantFrequency.toFixed(2)} Hz</p>
          </div>
          <div>
              <p className="text-xs text-gray-400">Q Factor</p>
              <p className="text-lg font-mono text-cyan-400">{metrics.Qfactor.toFixed(2)}</p>
          </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-2">
        <div className="w-full h-[250px]">
          <h3 className="text-lg font-semibold text-gray-300 mb-2 text-center">Current vs. Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={plotData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis type="number" dataKey="time" name="Time" unit="ms" domain={[0, 'dataMax']} stroke="#a0aec0" />
              <YAxis type="number" dataKey="current" name="Current" unit="A" domain={[-metrics.Imax*1.1, metrics.Imax*1.1]} stroke="#a0aec0" allowDataOverflow={true} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: '#4a5568' }} />
              <Line type="monotone" dataKey="current" stroke="#22d3ee" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full h-[250px]">
          <h3 className="text-lg font-semibold text-gray-300 mb-2 text-center">Voltages vs. Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={plotData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis type="number" dataKey="time" name="Time" unit="ms" domain={[0, 'dataMax']} stroke="#a0aec0" />
              <YAxis type="number" name="Voltage" unit="V" domain={[-vMax*1.5, vMax*1.5]} stroke="#a0aec0" allowDataOverflow={true} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: '#4a5568' }} />
              <Legend />
              <Line dataKey="voltageResistor" name="VR" stroke="#facc15" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line dataKey="voltageInductor" name="VL" stroke="#4ade80" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line dataKey="voltageCapacitor" name="VC" stroke="#f87171" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RLCCircuitSimulation;
