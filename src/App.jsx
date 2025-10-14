import { useState, lazy, Suspense } from 'react'
import styled from '@emotion/styled'
import Navbar from './components/Navbar'
import Home from './pages/Home'

// Lazy load pages and simulations
const SimulationLab = lazy(() => import('./pages/SimulationLab'))
const Documentation = lazy(() => import('./pages/Documentation'))
const NewtonianMotion = lazy(() => import('./simulations/NewtonianMotion'))

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`

const Content = styled.main`
  min-height: calc(100vh - 64px); // Subtract navbar height
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: #666;
`

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [activeSimulation, setActiveSimulation] = useState(null)

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setActiveSimulation(null)
  }

  const renderContent = () => {
    if (activeSimulation) {
      switch (activeSimulation) {
        case 'newtonian-motion':
          return <NewtonianMotion onBack={() => setActiveSimulation(null)} />
        default:
          return null
      }
    }

    switch (currentPage) {
      case 'home':
        return <Home />
      case 'lab':
        return <SimulationLab onSimulationSelect={setActiveSimulation} />
      case 'docs':
        return <Documentation />
      default:
        return <Home />
    }
  }

  return (
    <AppContainer>
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <Content>
        <Suspense fallback={<LoadingContainer>Loading...</LoadingContainer>}>
          {renderContent()}
        </Suspense>
      </Content>
    </AppContainer>
  )
}

export default App