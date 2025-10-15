import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SimulationSelector from './components/SimulationSelector';
import PendulumSimulation from './components/simulations/PendulumSimulation';
import ProjectileMotionSimulation from './components/simulations/ProjectileMotionSimulation';
import SpringMassSimulation from './components/simulations/SpringMassSimulation';
import ElectricFieldSimulation from './components/simulations/ElectricFieldSimulation';
import DoubleSlitExperiment from './components/simulations/DoubleSlitExperiment';
import SpecialRelativitySimulation from './components/simulations/SpecialRelativitySimulation';
import QuantumTunnelingSimulation from './components/simulations/QuantumTunnelingSimulation';
import RLCCircuitSimulation from './components/simulations/RLCCircuitSimulation';
import AITutor from './components/AITutor';
import { SimulationType } from './types';

const App: React.FC = () => {
  const [currentSimulation, setCurrentSimulation] = useState<SimulationType>(SimulationType.PENDULUM);

  const simulationComponent = useMemo(() => {
    switch (currentSimulation) {
      case SimulationType.PENDULUM:
        return <PendulumSimulation />;
      case SimulationType.PROJECTILE:
        return <ProjectileMotionSimulation />;
      case SimulationType.SPRING_MASS:
        return <SpringMassSimulation />;
      case SimulationType.ELECTRIC_FIELD:
        return <ElectricFieldSimulation />;
      case SimulationType.DOUBLE_SLIT:
        return <DoubleSlitExperiment />;
      case SimulationType.SPECIAL_RELATIVITY:
        return <SpecialRelativitySimulation />;
      case SimulationType.QUANTUM_TUNNELING:
        return <QuantumTunnelingSimulation />;
      case SimulationType.RLC_CIRCUIT:
        return <RLCCircuitSimulation />;
      default:
        return null;
    }
  }, [currentSimulation]);

  const tutorContext = useMemo(() => {
    switch (currentSimulation) {
      case SimulationType.PENDULUM:
        return "The user is currently interacting with a Simple Pendulum simulation. The goal is to understand the relationship between length, mass, gravity, and the period of a pendulum. Explain concepts clearly and concisely, as if to a high school physics student.";
      case SimulationType.PROJECTILE:
        return "The user is currently interacting with a Projectile Motion simulation. They can adjust initial velocity, angle, and gravity. The goal is to understand how these factors affect the trajectory, range, and maximum height of a projectile. Explain concepts clearly and concisely, as if to a high school physics student.";
      case SimulationType.SPRING_MASS:
        return "The user is interacting with a Spring-Mass System simulation, exploring simple harmonic motion. They can adjust mass, spring constant, and damping. Explain concepts like period, frequency, amplitude, and energy conservation. Explain concepts clearly and concisely, as if to a high school physics student.";
      case SimulationType.ELECTRIC_FIELD:
        return "The user is interacting with an Electric Field simulation. They can place positive and negative point charges on a canvas to visualize the resulting electric field lines. Explain concepts like Coulomb's Law, electric field, superposition, and field line properties. Explain concepts clearly and concisely, as if to a high school physics student.";
      case SimulationType.DOUBLE_SLIT:
        return "The user is interacting with a Double-Slit Experiment simulation. They can adjust wavelength, slit separation, and screen distance. Explain concepts at a university level, including Huygens' principle, path difference, constructive and destructive interference, and the formula for fringe spacing (Δy = λL/d). Discuss the wave-particle duality of light and matter.";
      case SimulationType.SPECIAL_RELATIVITY:
        return "The user is interacting with a Special Relativity simulation. They can adjust the velocity of a spaceship as a fraction of the speed of light (c). Explain the two postulates of special relativity. Define and explain the Lorentz factor (gamma). Describe the phenomena of time dilation and length contraction using the appropriate formulas. Answer questions from the perspective of both a stationary observer and an observer on the spaceship. Use clear, university-level language.";
      case SimulationType.QUANTUM_TUNNELING:
        return "The user is interacting with a Quantum Tunneling simulation. Explain concepts at a university level. Key topics include the wave function (Ψ), probability density (|Ψ|²), the time-independent Schrödinger equation for a square potential barrier, and evanescent waves inside the barrier. Explain how the tunneling probability (transmission coefficient) depends exponentially on the barrier width and the difference between the barrier height and particle energy. Discuss real-world applications like Scanning Tunneling Microscopes (STM) and nuclear fusion.";
      case SimulationType.RLC_CIRCUIT:
        return "The user is interacting with a series RLC Circuit simulation driven by an AC voltage source. Explain concepts at a university level. This includes the roles of resistors, capacitors, and inductors. Define impedance (Z), reactance (capacitive Xc and inductive Xl), and phase angle (φ). Explain the concept of resonance, where the driving frequency matches the natural frequency of the circuit (ω₀ = 1/√(LC)), leading to maximum current amplitude. Discuss the Quality Factor (Q) and its relation to the sharpness of the resonance peak.";
      default:
        return "The user is in a virtual physics lab.";
    }
  }, [currentSimulation]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <SimulationSelector
          activeSimulation={currentSimulation}
          onSelect={setCurrentSimulation}
        />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gray-800/50 rounded-xl shadow-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">{currentSimulation}</h2>
            {simulationComponent}
          </div>
          <div className="lg:col-span-1 bg-gray-800/50 rounded-xl shadow-2xl p-6 border border-gray-700">
            <AITutor simulationContext={tutorContext} />
          </div>
        </div>
      </main>
      <footer className="py-4 bg-gray-800/30 border-t border-gray-700">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          Powered by XIVIX
        </div>
      </footer>
    </div>
  );
};

export default App;