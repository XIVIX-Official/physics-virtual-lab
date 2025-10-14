import { Vector2D } from '@physics/vectors';
import { Force } from '@physics/forces';
import { Kinematics } from '@physics/kinematics';
import { toRadians, toDegrees } from '@physics/utils';

describe('Vector2D', () => {
  it('should create a vector with x and y components', () => {
    const v = new Vector2D(3, 4);
    expect(v.x).toBe(3);
    expect(v.y).toBe(4);
  });

  it('should calculate vector magnitude correctly', () => {
    const v = new Vector2D(3, 4);
    expect(v.magnitude()).toBe(5);
  });

  it('should add vectors correctly', () => {
    const v1 = new Vector2D(1, 2);
    const v2 = new Vector2D(3, 4);
    const result = v1.add(v2);
    expect(result.x).toBe(4);
    expect(result.y).toBe(6);
  });

  it('should calculate dot product correctly', () => {
    const v1 = new Vector2D(2, 3);
    const v2 = new Vector2D(4, 5);
    expect(v1.dot(v2)).toBe(23);
  });
});

describe('Force', () => {
  it('should calculate gravitational force correctly', () => {
    const force = Force.gravity(10);
    expect(force.x).toBe(0);
    expect(force.y).toBeCloseTo(98.1);
  });

  it('should calculate spring force correctly', () => {
    const displacement = new Vector2D(2, 0);
    const k = 10;
    const force = Force.spring(displacement, k);
    expect(force.x).toBe(-20);
    expect(force.y).toBe(0);
  });
});

describe('Kinematics', () => {
  it('should calculate projectile motion parameters correctly', () => {
    const velocity = 10;
    const angle = Math.PI / 4; // 45 degrees
    const height = 0;
    const params = Kinematics.projectileMotion(velocity, angle, height);
    
    expect(params.timeOfFlight).toBeGreaterThan(0);
    expect(params.maxHeight).toBeGreaterThan(0);
    expect(params.range).toBeGreaterThan(0);
  });

  it('should calculate final velocity correctly', () => {
    const initialVelocity = new Vector2D(3, 4);
    const acceleration = new Vector2D(1, 2);
    const time = 2;
    
    const finalVelocity = Kinematics.finalVelocity(
      initialVelocity,
      acceleration,
      time
    );
    
    expect(finalVelocity.x).toBe(5);
    expect(finalVelocity.y).toBe(8);
  });
});

describe('Utilities', () => {
  it('should convert degrees to radians correctly', () => {
    expect(toRadians(180)).toBe(Math.PI);
    expect(toRadians(90)).toBe(Math.PI / 2);
  });

  it('should convert radians to degrees correctly', () => {
    expect(toDegrees(Math.PI)).toBe(180);
    expect(toDegrees(Math.PI / 2)).toBe(90);
  });
});