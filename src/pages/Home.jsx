import styled from '@emotion/styled';

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome to Physics Virtual Lab</Title>
      <p>Interactive physics simulations for remote students.</p>
    </HomeContainer>
  );
};

export default Home;