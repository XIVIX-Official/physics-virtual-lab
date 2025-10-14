/**
 * Vector operations for physics calculations
 */

export class Vector2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // Vector addition
  add(vector) {
    return new Vector2D(this.x + vector.x, this.y + vector.y);
  }

  // Vector subtraction
  subtract(vector) {
    return new Vector2D(this.x - vector.x, this.y - vector.y);
  }

  // Scalar multiplication
  multiply(scalar) {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  // Dot product
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  // Vector magnitude
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  // Unit vector
  normalize() {
    const mag = this.magnitude();
    return mag === 0 ? new Vector2D(0, 0) : this.multiply(1 / mag);
  }

  // Vector angle (in radians)
  angle() {
    return Math.atan2(this.y, this.x);
  }

  // Create vector from angle and magnitude
  static fromAngle(angle, magnitude = 1) {
    return new Vector2D(
      magnitude * Math.cos(angle),
      magnitude * Math.sin(angle)
    );
  }

  // Create a copy of the vector
  clone() {
    return new Vector2D(this.x, this.y);
  }
}