import { render, fireEvent, screen } from '@testing-library/react';
import NewtonianMotion from '@simulations/NewtonianMotion';

describe('NewtonianMotion Simulation', () => {
  it('should render the simulation with controls', () => {
    render(<NewtonianMotion />);
    
    // Check if controls are present
    expect(screen.getByLabelText('Mass')).toBeInTheDocument();
    expect(screen.getByLabelText('Applied Force')).toBeInTheDocument();
    expect(screen.getByLabelText('Force Angle')).toBeInTheDocument();
    expect(screen.getByLabelText('Friction Coefficient')).toBeInTheDocument();
  });

  it('should update control values when changed', () => {
    render(<NewtonianMotion />);
    
    const massInput = screen.getByLabelText('Mass');
    fireEvent.change(massInput, { target: { value: '2.0' } });
    expect(massInput.value).toBe('2.0');
  });

  it('should toggle simulation state when start/stop button is clicked', () => {
    render(<NewtonianMotion />);
    
    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);
    expect(screen.getByText('Stop')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Stop'));
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('should reset controls when reset button is clicked', () => {
    render(<NewtonianMotion />);
    
    const massInput = screen.getByLabelText('Mass');
    fireEvent.change(massInput, { target: { value: '2.0' } });
    
    fireEvent.click(screen.getByText('Reset'));
    expect(massInput.value).toBe('1.0'); // Default value from config
  });
});