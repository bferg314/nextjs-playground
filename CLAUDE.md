# CLAUDE.md - Next.js Playground Guidelines

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style
- **Imports**: Group imports by source (React, Next.js, components, utils)
- **Components**: Use functional components with TypeScript interfaces for props
- **TypeScript**: Enable strict mode, use explicit types for function parameters
- **Naming**: PascalCase for components, camelCase for functions/variables
- **CSS**: Use Tailwind with `cn()` utility for class merging
- **State Management**: Use React hooks (useState, useEffect)
- **Error Handling**: Use try/catch blocks for async operations
- **Component Structure**: Props interface → component definition → exports
- **Path Aliases**: Use `@/` alias for imports from src directory
- **Exports**: Prefer named exports for utilities, default exports for components

## Project Structure
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions
- `/src/app/playground` - Mini-app pages and components