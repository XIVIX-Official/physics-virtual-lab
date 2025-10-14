# API Reference

This document provides detailed documentation for the Physics Virtual Lab's core APIs and components.

## Physics API

### Vector2D

```typescript
class Vector2D {
  constructor(x: number = 0, y: number = 0)
  
  // Properties
  x: number
  y: number
  
  // Methods
  add(vector: Vector2D): Vector2D
  subtract(vector: Vector2D): Vector2D
  multiply(scalar: number): Vector2D
  dot(vector: Vector2D): number
  magnitude(): number
  normalize(): Vector2D
  angle(): number
  clone(): Vector2D
  
  // Static Methods
  static fromAngle(angle: number, magnitude: number = 1): Vector2D
}
```

### Force

```typescript
class Force {
  // Static Methods
  static gravity(mass: number): Vector2D
  static spring(displacement: Vector2D, k: number): Vector2D
  static friction(velocity: Vector2D, coefficient: number, normalForce: number): Vector2D
  static airResistance(velocity: Vector2D, coefficient: number, area: number, airDensity?: number): Vector2D
  static centripetal(mass: number, velocity: number, radius: number): number
}
```

### Kinematics

```typescript
class Kinematics {
  // Static Methods
  static displacement(initialVelocity: Vector2D, acceleration: Vector2D, time: number): Vector2D
  static finalVelocity(initialVelocity: Vector2D, acceleration: Vector2D, time: number): Vector2D
  static projectileMotion(initialVelocity: number, angle: number, height?: number): ProjectileParams
  static projectilePosition(initialVelocity: number, angle: number, time: number, initialHeight?: number): Vector2D
  static circularMotion(radius: number, angularVelocity: number): CircularMotionParams
}
```

## React Components

### PhysicsCanvas

```typescript
interface PhysicsCanvasProps {
  width?: number
  height?: number
  onSetup?: (context: CanvasRenderingContext2D) => void
  onDraw?: (context: CanvasRenderingContext2D, deltaTime: number) => void
  isRunning?: boolean
}

const PhysicsCanvas: React.FC<PhysicsCanvasProps>
```

### ControlPanel

```typescript
interface Control {
  id: string
  label: string
  type: string
  min?: number
  max?: number
  step?: number
  value: number
  unit?: string
}

interface ControlPanelProps {
  title: string
  controls: Control[]
  onControlChange: (id: string, value: number) => void
  onReset: () => void
  onStart: () => void
  isRunning: boolean
}

const ControlPanel: React.FC<ControlPanelProps>
```

### SimulationCard

```typescript
interface SimulationCardProps {
  title: string
  description: string
  tags: string[]
  onClick?: () => void
}

const SimulationCard: React.FC<SimulationCardProps>
```

## Custom Hooks

### useAnimation

```typescript
function useAnimation(callback: (deltaTime: number) => void, isRunning: boolean): void
```

### usePhysicsEngine

```typescript
interface PhysicsState {
  position: Vector2D
  velocity: Vector2D
  acceleration: Vector2D
}

function usePhysicsEngine(config: SimulationConfig): {
  state: PhysicsState
  updateControl: (id: string, value: number) => void
  reset: () => void
}
```

## Configuration Types

### SimulationConfig

```typescript
interface SimulationConfig {
  canvas: {
    width: number
    height: number
    scale: number
    origin: {
      x: number
      y: number
    }
  }
  physics: {
    timeStep: number
    gravityEnabled: boolean
    frictionEnabled: boolean
    airResistanceEnabled: boolean
  }
  controls: Control[]
}
```

## Usage Examples

### Creating a New Simulation

```javascript
import { PhysicsCanvas, ControlPanel } from '@components';
import { Vector2D } from '@physics/vectors';
import { config } from './config';

const MySimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const engine = usePhysicsEngine(config);

  const handleDraw = useCallback((context, deltaTime) => {
    engine.update(deltaTime);
    // Draw simulation state
  }, [engine]);

  return (
    <div>
      <PhysicsCanvas
        width={800}
        height={600}
        onDraw={handleDraw}
        isRunning={isRunning}
      />
      <ControlPanel
        title="My Simulation"
        controls={config.controls}
        onControlChange={engine.updateControl}
        onReset={engine.reset}
        onStart={() => setIsRunning(!isRunning)}
        isRunning={isRunning}
      />
    </div>
  );
};
```

For implementation details and examples, refer to the simulation source code in `src/simulations/`.