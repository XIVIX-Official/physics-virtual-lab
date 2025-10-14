export const config = {
  canvas: {
    width: 800,
    height: 600,
    scale: 50, // pixels per meter (smaller scale to see more of the world)
  },
  physics: {
    timeStep: 1 / 60, // 60 FPS
    gravityEnabled: true,
    frictionEnabled: true,
    airResistanceEnabled: false,
  },
  controls: [
    {
      id: 'mass',
      label: 'Mass',
      type: 'number',
      min: 0.1,
      max: 5.0,
      step: 0.1,
      value: 1.0,
      unit: 'kg',
    },
    {
      id: 'force',
      label: 'Applied Force',
      type: 'number',
      min: 0,
      max: 20,
      step: 0.5,
      value: 5,
      unit: 'N',
    },
    {
      id: 'angle',
      label: 'Force Angle',
      type: 'number',
      min: -180,
      max: 180,
      step: 1,
      value: 0,
      unit: '°',
    },
    {
      id: 'friction',
      label: 'Friction Coefficient',
      type: 'number',
      min: 0,
      max: 1,
      step: 0.01,
      value: 0.1,
      unit: '',
    },
  ],
};