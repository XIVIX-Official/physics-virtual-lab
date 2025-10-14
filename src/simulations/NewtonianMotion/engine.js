import { Vector2D } from '../../physics/vectors';
import { Force } from '../../physics/forces';
import { Kinematics } from '../../physics/kinematics';
import { toRadians } from '../../physics/utils';

export class NewtonianMotionEngine {
  constructor(config) {
    this.config = config;
    this.reset();
  }

  reset() {
    this.position = new Vector2D(-2, 0); // Start slightly to the left
    this.velocity = new Vector2D(0, 0);
    this.acceleration = new Vector2D(0, 0);
    this.mass = this.config.controls.find(c => c.id === 'mass').value;
    this.force = this.config.controls.find(c => c.id === 'force').value;
    this.angle = this.config.controls.find(c => c.id === 'angle').value;
    this.frictionCoef = this.config.controls.find(
      c => c.id === 'friction'
    ).value;
  }

  update(deltaTime) {
    // Calculate applied force vector
    const appliedForce = Vector2D.fromAngle(
      toRadians(this.angle),
      this.force
    );

    // Calculate normal force (simplified for horizontal surface)
    const normalForce = this.mass * Force.G;

    // Calculate friction force - only applies when moving
    const frictionForce = Force.friction(
      this.velocity,
      this.frictionCoef,
      normalForce
    );

    // Sum all forces
    let netForce;
    if (this.config.physics.gravityEnabled) {
      // For horizontal motion, gravity is balanced by normal force
      netForce = appliedForce.add(frictionForce);
    } else {
      netForce = appliedForce.add(frictionForce);
    }

    // Calculate acceleration (F = ma)
    this.acceleration = netForce.multiply(1 / this.mass);

    // Update velocity and position using kinematics equations
    this.velocity = Kinematics.finalVelocity(
      this.velocity,
      this.acceleration,
      deltaTime
    );

    const displacement = Kinematics.displacement(
      this.velocity,
      this.acceleration,
      deltaTime
    );
    this.position = this.position.add(displacement);

    // Keep object within canvas bounds with elastic collisions
    const { width, height, scale } = this.config.canvas;
    const maxX = (width / 2) / scale;
    const maxY = (height / 2) / scale;

    if (Math.abs(this.position.x) > maxX) {
      this.position.x = Math.sign(this.position.x) * maxX;
      this.velocity.x *= -0.8; // Elastic collision with walls
      this.velocity.y *= 0.99; // Small damping
    }

    if (Math.abs(this.position.y) > maxY) {
      this.position.y = Math.sign(this.position.y) * maxY;
      this.velocity.y *= -0.8; // Elastic collision with floor/ceiling
      this.velocity.x *= 0.99; // Small damping
    }

    // Apply velocity threshold to prevent infinite tiny motion
    if (this.velocity.magnitude() < 0.01) {
      this.velocity = new Vector2D(0, 0);
    }
  }

  getState() {
    return {
      position: this.position,
      velocity: this.velocity,
      acceleration: this.acceleration,
    };
  }

  updateControl(id, value) {
    switch (id) {
      case 'mass':
        this.mass = value;
        break;
      case 'force':
        this.force = value;
        break;
      case 'angle':
        this.angle = value;
        break;
      case 'friction':
        this.frictionCoef = value;
        break;
    }
  }
}