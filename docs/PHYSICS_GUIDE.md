# Physics Guide

This guide provides detailed information about the physics concepts and calculations implemented in the Physics Virtual Lab.

## Core Concepts

### Vectors

Vectors are fundamental quantities in physics that have both magnitude and direction. The `Vector2D` class implements vector operations in two dimensions:

```javascript
const velocity = new Vector2D(3, 4); // 3 m/s in x, 4 m/s in y
const speed = velocity.magnitude(); // 5 m/s
```

### Forces

Forces are vectors that cause objects to accelerate according to Newton's laws of motion.

#### Newton's Laws

1. **First Law (Inertia)**: An object remains at rest or in uniform motion unless acted upon by a force.
2. **Second Law (F = ma)**: The acceleration of an object is proportional to the force applied and inversely proportional to its mass.
3. **Third Law**: For every action, there is an equal and opposite reaction.

#### Types of Forces

1. **Gravitational Force**
   - Force due to gravity near Earth's surface
   - F = mg, where g ≈ 9.81 m/s²

2. **Spring Force**
   - Force exerted by a spring (Hooke's Law)
   - F = -kx, where k is spring constant and x is displacement

3. **Friction**
   - Opposes motion between surfaces
   - F = μN, where μ is friction coefficient and N is normal force

4. **Air Resistance**
   - Drag force opposing motion through air
   - F = ½ρCDAv², where ρ is air density, CD is drag coefficient, A is cross-sectional area, v is velocity

### Kinematics

Kinematics describes motion without considering forces:

#### Basic Equations

1. **Position**: x = x₀ + v₀t + ½at²
2. **Velocity**: v = v₀ + at
3. **Acceleration**: a = (v - v₀)/t

#### Projectile Motion

- Horizontal motion: x = x₀ + v₀cosθ·t
- Vertical motion: y = y₀ + v₀sinθ·t - ½gt²
- Range: R = (v₀²sin2θ)/g
- Maximum height: h = (v₀²sin²θ)/(2g)

#### Circular Motion

- Period: T = 2π/ω
- Frequency: f = 1/T
- Angular velocity: ω = v/r
- Centripetal acceleration: a = v²/r

## Implementation Details

### Physics Engine

The physics engine uses numerical integration to simulate motion:

1. Calculate net force
2. Determine acceleration (F = ma)
3. Update velocity (v = v₀ + at)
4. Update position (x = x₀ + vt + ½at²)

### Collision Detection

Simple collision detection is implemented for boundaries:
- Elastic collisions with coefficient of restitution
- Position correction to prevent objects from leaving bounds

### Time Step

The simulation uses a fixed time step for stability:
- Default: 1/60 second (60 FPS)
- Velocity Verlet integration for accuracy

## Adding New Physics Features

1. Define physical quantities and equations
2. Implement calculations in appropriate module
3. Add unit tests for verification
4. Create visualization components
5. Document equations and usage

## References

1. Halliday, Resnick, and Walker. *Fundamentals of Physics*
2. Young and Freedman. *University Physics*
3. Taylor, John R. *Classical Mechanics*

For detailed implementation examples, see the simulation source code in `src/simulations/`.