import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, step, unit, onChange, disabled = false }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <span className="text-sm font-mono px-2 py-1 bg-gray-700 rounded-md text-cyan-400">
          {value.toFixed(2)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-cyan-500
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-4
                   [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:bg-cyan-400
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:transition-all
                   [&::-webkit-slider-thumb]:duration-150
                   [&::-webkit-slider-thumb]:ease-in-out
                   [&::-webkit-slider-thumb]:shadow-md
                   [&::-webkit-slider-thumb]:hover:bg-cyan-300
                   [&::-webkit-slider-thumb]:active:scale-110

                   [&::-moz-range-thumb]:w-4
                   [&::-moz-range-thumb]:h-4
                   [&::-moz-range-thumb]:bg-cyan-400
                   [&::-moz-range-thumb]:rounded-full
                   [&::-moz-range-thumb]:transition-all
                   [&::-moz-range-thumb]:duration-150
                   [&::-moz-range-thumb]:ease-in-out
                   [&::-moz-range-thumb]:shadow-md
                   [&::-moz-range-thumb]:hover:bg-cyan-300
                   [&::-moz-range-thumb]:active:scale-110"
      />
    </div>
  );
};

export default Slider;
