# Development Guide

This guide provides detailed information for developers working on the Physics Virtual Lab project.

## Development Environment Setup

1. **Prerequisites**
   - Node.js (v14.0 or higher)
   - npm (v6.0 or higher) or yarn
   - Git
   - A modern IDE (VS Code recommended)

2. **Initial Setup**
   ```bash
   # Clone the repository
   git clone https://github.com/XIVIX-Official/physics-virtual-lab.git
   cd physics-virtual-lab

   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

## Project Structure

```
physics-virtual-lab/
├── public/              # Static assets
│   ├── index.html
│   └── assets/
│       ├── icons/
│       ├── images/
│       └── styles/
│
├── src/
│   ├── index.js        # Application entry point
│   ├── App.jsx         # Root component
│   ├── styles/         # Global styles
│   │
│   ├── components/     # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── SimulationCard.jsx
│   │   ├── ControlPanel.jsx
│   │   └── Canvas/
│   │       └── PhysicsCanvas.jsx
│   │
│   ├── simulations/   # Individual simulation implementations
│   │   └── NewtonianMotion/
│   │       ├── index.jsx
│   │       ├── engine.js
│   │       └── config.js
│   │
│   ├── physics/       # Physics calculation modules
│   │   ├── vectors.js
│   │   ├── forces.js
│   │   ├── kinematics.js
│   │   └── utils.js
│   │
│   ├── hooks/        # Custom React hooks
│   │   ├── useAnimation.js
│   │   └── usePhysicsEngine.js
│   │
│   └── pages/        # Page components
│       ├── Home.jsx
│       └── SimulationLab.jsx
│
├── tests/            # Test files
│   ├── unit/
│   └── integration/
│
└── docs/            # Documentation
```

## Development Workflow

1. **Creating a New Feature**
   - Create a new branch: `git checkout -b feature/your-feature`
   - Implement your changes
   - Write tests
   - Update documentation
   - Submit a pull request

2. **Adding a New Simulation**
   - Create directory in `src/simulations/`
   - Create required files:
     - `index.jsx`: Main component
     - `engine.js`: Physics logic
     - `config.js`: Configuration
   - Add tests
   - Update documentation

3. **Testing**
   ```bash
   # Run all tests
   npm test

   # Run specific test file
   npm test physics.test.js

   # Run tests in watch mode
   npm test -- --watch
   ```

4. **Code Style**
   ```bash
   # Check style
   npm run lint

   # Fix style issues
   npm run format
   ```

## Best Practices

### React Components

1. **Use Functional Components**
   ```javascript
   const MyComponent = ({ prop1, prop2 }) => {
     // Component logic
     return (
       // JSX
     );
   };
   ```

2. **Custom Hooks**
   ```javascript
   const useMyHook = (param) => {
     const [state, setState] = useState(initialValue);
     useEffect(() => {
       // Effect logic
     }, [param]);
     return state;
   };
   ```

### Physics Implementations

1. **Vector Operations**
   ```javascript
   const velocity = new Vector2D(3, 4);
   const acceleration = new Vector2D(0, -9.81);
   const newVelocity = velocity.add(acceleration.multiply(deltaTime));
   ```

2. **Force Calculations**
   ```javascript
   const gravity = Force.gravity(mass);
   const friction = Force.friction(velocity, coefficient, normalForce);
   const netForce = gravity.add(friction);
   ```

### Testing

1. **Unit Tests**
   ```javascript
   describe('Vector2D', () => {
     it('should calculate magnitude correctly', () => {
       const vector = new Vector2D(3, 4);
       expect(vector.magnitude()).toBe(5);
     });
   });
   ```

2. **Integration Tests**
   ```javascript
   describe('NewtonianMotion', () => {
     it('should update position based on forces', () => {
       // Test implementation
     });
   });
   ```

## Performance Optimization

1. **Canvas Rendering**
   - Use requestAnimationFrame
   - Batch draw operations
   - Implement object pooling for particles

2. **React Optimization**
   - Use React.memo for expensive renders
   - Implement useMemo for complex calculations
   - Use useCallback for event handlers

## Debugging

1. **Physics Engine**
   - Use debug rendering to visualize vectors
   - Log state changes at critical points
   - Implement step-by-step execution

2. **React Components**
   - Use React DevTools
   - Implement error boundaries
   - Add detailed console logging in development

## Build and Deployment

1. **Development Build**
   ```bash
   npm run dev
   ```

2. **Production Build**
   ```bash
   npm run build
   ```

3. **Running Tests**
   ```bash
   npm test
   ```

4. **Deployment**
   - Builds automatically via GitHub Actions
   - Deploys to configured platform (Vercel/Netlify)

## Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Jest Documentation](https://jestjs.io/docs)
- [Testing Library Documentation](https://testing-library.com/docs/)

For more detailed information about physics implementations, refer to [PHYSICS_GUIDE.md](PHYSICS_GUIDE.md).