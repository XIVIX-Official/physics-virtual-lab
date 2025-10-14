# Contributing to Physics Virtual Lab

Thank you for your interest in contributing to Physics Virtual Lab! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Create a new branch for your changes: `git checkout -b feature/your-feature-name`

## Development Guidelines

### Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run lint` to check for style issues
- Run `npm run format` to automatically fix formatting issues

### Testing

- Write tests for new features and bug fixes
- Run tests with `npm test`
- Make sure all tests pass before submitting a PR

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Code style changes (formatting, missing semi-colons, etc)
- refactor: Code changes that neither fixes a bug nor adds a feature
- test: Adding missing tests or correcting existing tests
- chore: Changes to the build process or auxiliary tools

### Pull Requests

1. Update your fork to the latest main branch
2. Create a feature branch
3. Make your changes
4. Write/update tests as needed
5. Update documentation as needed
6. Push your changes
7. Open a pull request with a clear title and description

## Project Structure

```
physics-virtual-lab/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable React components
│   ├── physics/     # Physics calculation modules
│   ├── simulations/ # Individual simulation implementations
│   ├── hooks/       # Custom React hooks
│   └── pages/       # Page components
├── tests/          # Test files
└── docs/           # Documentation
```

## Adding New Simulations

1. Create a new directory under `src/simulations/`
2. Implement the simulation using the following files:
   - `index.jsx`: Main simulation component
   - `engine.js`: Physics engine implementation
   - `config.js`: Simulation configuration

## Need Help?

- Open an issue for bugs or feature requests
- Join our community discussions
- Contact us at info@codexustechnologies.com

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).