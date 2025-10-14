import styled from '@emotion/styled';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  color: #333;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const Documentation = () => {
  return (
    <Container>
      <Title>Documentation</Title>
      <Section>
        <h2>Getting Started</h2>
        <p>Welcome to the Physics Virtual Lab documentation. This guide will help you understand how to use our interactive simulations effectively.</p>
      </Section>
      <Section>
        <h2>Available Simulations</h2>
        <h3>Newtonian Motion</h3>
        <p>This simulation demonstrates Newton's laws of motion through interactive experiments:</p>
        <ul>
          <li>First Law: Objects in motion stay in motion unless acted upon by an external force</li>
          <li>Second Law: Force equals mass times acceleration (F = ma)</li>
          <li>Third Law: For every action, there is an equal and opposite reaction</li>
        </ul>
      </Section>
      <Section>
        <h2>Using the Controls</h2>
        <p>Each simulation comes with a control panel that allows you to adjust various parameters:</p>
        <ul>
          <li>Use sliders to adjust continuous values like velocity and mass</li>
          <li>Toggle buttons to enable/disable forces and effects</li>
          <li>Reset button to return to initial conditions</li>
        </ul>
      </Section>
    </Container>
  );
};

export default Documentation;