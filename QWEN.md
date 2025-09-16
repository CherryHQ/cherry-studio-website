# Project Overview: Cherry Studio Website

## Project Type
This is a **React + TypeScript + Vite** web application, configured as a modern frontend project with a focus on performance and developer experience.

## Key Technologies
- **React**: Version 18.3.1
- **TypeScript**: Version 5.6.2
- **Vite**: Version 6.0.5 (for fast development and production builds)
- **Styled Components**: Version 6.1.14 (for styling)
- **React Router DOM**: Version 7.1.5 (for routing)
- **i18next**: Version 25.2.1 (for internationalization)

## Project Structure
- **Source Code**: Located in the `src` directory (not listed but inferred from configuration).
- **Configuration Files**:
  - `vite.config.ts`: Vite configuration with React plugin and proxy setup.
  - `tsconfig.json`: TypeScript configuration with references to app and node-specific configs.
  - `eslint.config.js`: ESLint configuration for TypeScript and React.
  - `.prettierrc`: Prettier configuration for code formatting.

## Building and Running
### Development
```bash
yarn dev
```
Starts the Vite development server with hot module replacement (HMR).

### Production Build
```bash
yarn build
```
Compiles TypeScript and builds the production-ready assets using Vite.

### Linting
```bash
yarn lint
```
Runs ESLint to check for code quality and style issues.

### Preview
```bash
yarn preview
```
Serves the production build locally for testing.

### Deployment
```bash
yarn release
```
Builds the project and deploys it to a remote server using `rsync`.

## Development Conventions
- **TypeScript**: Strict typing is enforced.
- **ESLint**: Configured with React-specific rules and TypeScript support.
- **Prettier**: Ensures consistent code formatting.
- **Aliases**: Uses `@` as an alias for the `src` directory (configured in `vite.config.ts`).

## Proxy Configuration
The development server proxies `/api` requests to `http://rack1.raincs.cc:18192`.

## Internationalization
The project uses `i18next` for managing translations, with support for language detection in the browser.

## Styling
Styled Components is used for CSS-in-JS styling.

## Additional Notes
- The project is managed with **Yarn** (version 4.7.0).
- The `README.md` provides additional setup details for expanding ESLint configuration.