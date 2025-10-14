import { useState } from 'react';
import { styled } from '@emotion/styled';
import Navbar from '@components/Navbar';
import SimulationLab from '@pages/SimulationLab';
import Home from '@pages/Home';
import Documentation from '@pages/Documentation';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'lab':
        return <SimulationLab />;
      case 'docs':
        return <Documentation />;
      default:
        return <Home />;
    }
  };

  return (
    <AppContainer>
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
    </AppContainer>
  );
};

export default App;