/**
 * Utility functions for physics calculations
 */

// Convert degrees to radians
export const toRadians = (degrees) => (degrees * Math.PI) / 180;

// Convert radians to degrees
export const toDegrees = (radians) => (radians * 180) / Math.PI;

// Round to specified decimal places
export const roundTo = (value, decimals = 2) => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

// Linear interpolation
export const lerp = (start, end, t) => start + (end - start) * t;

// Clamp value between min and max
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Calculate percentage
export const percentage = (value, total) => (value / total) * 100;

// Convert between units
export const units = {
  // Length
  meterToKilometer: (m) => m / 1000,
  kilometerToMeter: (km) => km * 1000,
  meterToCentimeter: (m) => m * 100,
  centimeterToMeter: (cm) => cm / 100,

  // Mass
  kilogramToGram: (kg) => kg * 1000,
  gramToKilogram: (g) => g / 1000,

  // Time
  secondToMillisecond: (s) => s * 1000,
  millisecondToSecond: (ms) => ms / 1000,
  secondToMinute: (s) => s / 60,
  minuteToSecond: (min) => min * 60,

  // Speed
  mpsToKmph: (mps) => mps * 3.6,
  kmphToMps: (kmph) => kmph / 3.6,

  // Angle
  degreeToRadian: toRadians,
  radianToDegree: toDegrees,

  // Force
  newtonToKilonewton: (n) => n / 1000,
  kilonewtonToNewton: (kn) => kn * 1000,

  // Energy
  jouleToKilojoule: (j) => j / 1000,
  kilojouleToJoule: (kj) => kj * 1000,
};

// Physics constants
export const constants = {
  G: 9.81, // Gravitational acceleration (m/s²)
  g: 6.67430e-11, // Gravitational constant (m³/kg/s²)
  c: 299792458, // Speed of light (m/s)
  h: 6.62607015e-34, // Planck constant (J⋅s)
  e: 1.602176634e-19, // Elementary charge (C)
  me: 9.1093837015e-31, // Electron mass (kg)
  mp: 1.67262192369e-27, // Proton mass (kg)
  k: 1.380649e-23, // Boltzmann constant (J/K)
  Na: 6.02214076e23, // Avogadro constant (mol⁻¹)
  R: 8.31446261815324, // Gas constant (J/(mol⋅K))
};