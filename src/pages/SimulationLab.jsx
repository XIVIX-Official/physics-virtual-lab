import styled from '@emotion/styled';
import { useState } from 'react';
import SimulationCard from '../components/SimulationCard';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const simulations = [
  {
    id: 'newtonian-motion',
    title: 'Newtonian Motion',
    description: 'Explore Newton\'s laws of motion with interactive force diagrams and real-time calculations.',
    tags: ['Forces', 'Dynamics', 'Interactive']
  },
  {
    id: 'projectile-motion',
    title: 'Projectile Motion',
    description: 'Launch projectiles at various angles and velocities. Study parabolic trajectories and motion analysis.',
    tags: ['Kinematics', 'Gravity', 'Trajectories']
  },
  {
    id: 'circular-motion',
    title: 'Circular Motion',
    description: 'Visualize uniform circular motion and understand centripetal force dynamics.',
    tags: ['Forces', 'Angular Motion', 'Velocity']
  }
];

const SimulationLab = ({ onSimulationSelect }) => {
  return (
    <Container>
      <Title>Physics Simulations</Title>
      <p>Select a simulation to begin exploring physics concepts interactively.</p>
      <Grid>
        {simulations.map(sim => (
          <SimulationCard
            key={sim.id}
            {...sim}
            onClick={() => onSimulationSelect(sim.id)}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default SimulationLab;