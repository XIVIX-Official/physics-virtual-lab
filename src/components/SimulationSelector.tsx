import React from 'react';
import { SimulationType } from '../types';

interface SimulationSelectorProps {
  activeSimulation: SimulationType;
  onSelect: (simulation: SimulationType) => void;
}

const SimulationSelector: React.FC<SimulationSelectorProps> = ({ activeSimulation, onSelect }) => {
  const simulations = Object.values(SimulationType);

  return (
    <nav aria-label="Select a simulation">
      {/* Mobile and Tablet View: Dropdown */}
      <div className="lg:hidden">
        <label htmlFor="simulation-select" className="sr-only">Select a simulation</label>
        <div className="relative">
          <select
            id="simulation-select"
            value={activeSimulation}
            onChange={(e) => onSelect(e.target.value as SimulationType)}
            className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none text-center font-semibold"
          >
            {simulations.map((sim) => (
              <option key={sim} value={sim}>
                {sim}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Desktop View: Buttons */}
      <div className="hidden lg:flex justify-center flex-wrap gap-2 bg-gray-800 p-2 rounded-lg">
        {simulations.map((sim) => (
          <button
            key={sim}
            onClick={() => onSelect(sim)}
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 ${
              activeSimulation === sim
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            {sim}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SimulationSelector;
