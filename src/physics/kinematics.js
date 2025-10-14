import { Vector2D } from './vectors';

/**
 * Kinematics calculations for physics simulations
 */

export class Kinematics {
  /**
   * Calculate displacement given initial velocity, acceleration, and time
   * @param {Vector2D} initialVelocity - Initial velocity vector
   * @param {Vector2D} acceleration - Acceleration vector
   * @param {number} time - Time interval (s)
   * @returns {Vector2D} - Displacement vector
   */
  static displacement(initialVelocity, acceleration, time) {
    return initialVelocity
      .multiply(time)
      .add(acceleration.multiply(0.5 * time * time));
  }

  /**
   * Calculate final velocity given initial velocity, acceleration, and time
   * @param {Vector2D} initialVelocity - Initial velocity vector
   * @param {Vector2D} acceleration - Acceleration vector
   * @param {number} time - Time interval (s)
   * @returns {Vector2D} - Final velocity vector
   */
  static finalVelocity(initialVelocity, acceleration, time) {
    return initialVelocity.add(acceleration.multiply(time));
  }

  /**
   * Calculate projectile motion parameters
   * @param {number} initialVelocity - Initial velocity magnitude (m/s)
   * @param {number} angle - Launch angle (radians)
   * @param {number} height - Initial height (m)
   * @returns {Object} - Projectile motion parameters
   */
  static projectileMotion(initialVelocity, angle, height = 0) {
    const g = 9.81; // gravitational acceleration
    const v0x = initialVelocity * Math.cos(angle);
    const v0y = initialVelocity * Math.sin(angle);

    // Time of flight
    const timeOfFlight =
      (v0y + Math.sqrt(v0y * v0y + 2 * g * height)) / g;

    // Maximum height
    const maxHeight = height + (v0y * v0y) / (2 * g);

    // Range
    const range = v0x * timeOfFlight;

    return {
      timeOfFlight,
      maxHeight,
      range,
      initialVelocityX: v0x,
      initialVelocityY: v0y,
    };
  }

  /**
   * Calculate position at any time during projectile motion
   * @param {number} initialVelocity - Initial velocity magnitude (m/s)
   * @param {number} angle - Launch angle (radians)
   * @param {number} time - Time (s)
   * @param {number} initialHeight - Initial height (m)
   * @returns {Vector2D} - Position vector
   */
  static projectilePosition(
    initialVelocity,
    angle,
    time,
    initialHeight = 0
  ) {
    const g = 9.81;
    const x = initialVelocity * Math.cos(angle) * time;
    const y =
      initialHeight +
      initialVelocity * Math.sin(angle) * time -
      0.5 * g * time * time;
    return new Vector2D(x, y);
  }

  /**
   * Calculate circular motion parameters
   * @param {number} radius - Radius of circular path (m)
   * @param {number} angularVelocity - Angular velocity (rad/s)
   * @returns {Object} - Circular motion parameters
   */
  static circularMotion(radius, angularVelocity) {
    const period = (2 * Math.PI) / angularVelocity;
    const frequency = 1 / period;
    const tangentialVelocity = radius * angularVelocity;
    const centripetalAcceleration = tangentialVelocity * angularVelocity;

    return {
      period,
      frequency,
      tangentialVelocity,
      centripetalAcceleration,
    };
  }
}