import { Vector2D } from './vectors';

/**
 * Common force calculations for physics simulations
 */

// Constants
export const G = 9.81; // Gravitational acceleration (m/s²)

export class Force {
  /**
   * Calculate gravitational force
   * @param {number} mass - Mass of the object (kg)
   * @returns {Vector2D} - Gravitational force vector
   */
  static gravity(mass) {
    return new Vector2D(0, mass * G);
  }

  /**
   * Calculate spring force using Hooke's Law
   * @param {Vector2D} displacement - Spring displacement from rest position
   * @param {number} k - Spring constant (N/m)
   * @returns {Vector2D} - Spring force vector
   */
  static spring(displacement, k) {
    return displacement.multiply(-k);
  }

  /**
   * Calculate friction force
   * @param {Vector2D} velocity - Velocity vector
   * @param {number} coefficient - Coefficient of friction
   * @param {number} normalForce - Normal force magnitude
   * @returns {Vector2D} - Friction force vector
   */
  static friction(velocity, coefficient, normalForce) {
    if (velocity.magnitude() === 0) return new Vector2D(0, 0);
    return velocity.normalize().multiply(-coefficient * normalForce);
  }

  /**
   * Calculate air resistance force
   * @param {Vector2D} velocity - Velocity vector
   * @param {number} coefficient - Drag coefficient
   * @param {number} area - Cross-sectional area (m²)
   * @param {number} airDensity - Air density (kg/m³)
   * @returns {Vector2D} - Air resistance force vector
   */
  static airResistance(velocity, coefficient, area, airDensity = 1.225) {
    const speed = velocity.magnitude();
    const dragMagnitude = 0.5 * coefficient * area * airDensity * speed * speed;
    return speed === 0
      ? new Vector2D(0, 0)
      : velocity.normalize().multiply(-dragMagnitude);
  }

  /**
   * Calculate centripetal force
   * @param {number} mass - Mass of the object (kg)
   * @param {number} velocity - Tangential velocity magnitude (m/s)
   * @param {number} radius - Radius of circular motion (m)
   * @returns {number} - Centripetal force magnitude
   */
  static centripetal(mass, velocity, radius) {
    return (mass * velocity * velocity) / radius;
  }
}