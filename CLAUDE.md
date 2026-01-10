# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for Cherry Studio - a React + TypeScript + Vite application with i18n support. The site serves as a marketing and download portal for the Cherry Studio desktop application, featuring homepage, download page, theme showcase, careers, and enterprise edition information.

## Development Commands

```bash
# Start development server with HMR
pnpm dev

# Build for production (TypeScript compilation + Vite build)
pnpm build

# Format code with Biome
pnpm format

# Lint code with Biome
pnpm lint

# Run both format and lint checks with Biome
pnpm check

# Preview production build locally
pnpm preview

# Build and deploy to remote server
pnpm release
```

## Project Architecture

### Routing Structure

The application uses React Router v7 with these routes:

- `/` - Home page ([src/pages/home/index.tsx](src/pages/home/index.tsx))
- `/download` - Download page with auto-detection and version info ([src/pages/download/index.tsx](src/pages/download/index.tsx))
- `/theme` - Theme showcase ([src/pages/theme/index.tsx](src/pages/theme/index.tsx))
- `/enterprise` - Enterprise edition information ([src/pages/enterprise/index.tsx](src/pages/enterprise/index.tsx))
- `/careers` - Careers page ([src/pages/careers/index.tsx](src/pages/careers/index.tsx))

All routes are defined in [src/App.tsx](src/App.tsx) with a shared header and ThemeProvider context.

### Internationalization (i18n)

The project uses i18next with browser language detection:

- Configuration: [src/i18n/index.ts](src/i18n/index.ts)
- Supported languages: `en-US`, `zh-CN`
- Translation files: [src/i18n/lang/en.json](src/i18n/lang/en.json), [src/i18n/lang/zh.json](src/i18n/lang/zh.json)
- Language preference stored in localStorage with key `i18n-language`
- Automatically updates `<html lang>` attribute on language change

When adding new translatable strings, add them to both language files.

### Version & Download Management

The [useVersionData](src/hooks/useVersionData.ts) hook is central to download functionality:

- Fetches latest release from `https://releases.cherry-ai.com`
- Auto-generates download URLs for all platforms and architectures
- Provides structured download groups for Windows, macOS, and Linux
- All downloads point to GitCode mirror: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/`

Platform detection is handled by [src/utils/systemDetection.ts](src/utils/systemDetection.ts):

- Detects user's OS and architecture
- Returns appropriate download links
- Hides download buttons on mobile devices

### Data Fetching

Community channel data (QQ groups, WeChat QR codes, ZSXQ) is fetched from:

- Base URL: `https://data1.cherry-ai.com`
- API function: `fetchChannelData()` in [src/assets/js/data.ts](src/assets/js/data.ts)
- Used in JoinCommunity component to display social links

## Code Style & Linting

This project uses **Biome** for formatting and linting (not ESLint/Prettier).

### Biome Configuration ([biome.json](biome.json))

**Formatter settings:**
- 2-space indentation
- 120 character line width
- Single quotes
- Semicolons as needed (omit when possible)
- No trailing commas
- Brackets on same line

**Import organization:**
- Imports are auto-organized into groups: Node builtins → External packages → Blank line → Aliases/relative paths

Run `pnpm check` before committing to format and lint in one step.

## Path Aliases

The `@` alias points to the `src` directory:

- Configured in [vite.config.ts:11](vite.config.ts#L11) and [tsconfig.json](tsconfig.json)
- Use `@/` for all absolute imports within src

Example:

```typescript
import { fetchChannelData } from '@/assets/js/data'
import SimpleHeader from '@/components/website/SimpleHeader'
```

## Development Proxy

API requests to `/api` are proxied to `http://rack1.raincs.cc:18192` during development (see [vite.config.ts:16-22](vite.config.ts#L16-L22)).

## Styling Approach

**Primary styling method (REQUIRED for all new code):**

- ✅ Use Tailwind CSS v4 classes directly in components
- ✅ Use `cn()` utility from [src/lib/utils.ts](src/lib/utils.ts) for conditional class merging

**Legacy code (do NOT use for new development):**

- ❌ CSS modules in [src/assets/css/module-css/](src/assets/css/module-css/)
- ❌ Styled Components (v6)
- ❌ Separate CSS files

**Other styling tools:**

- Custom icon font (icomoon) for UI icons

**Example:**

```tsx
// Good - Use Tailwind classes
<div className={cn("flex items-center gap-4", isActive && "bg-blue-500")}>

// Bad - Don't use styled-components or CSS modules
import styled from 'styled-components'
import styles from './styles.module.css'
```

## Asset Organization

- Provider logos: [src/assets/images/provider_logo/](src/assets/images/provider_logo/)
- Feature icons: [src/assets/images/icons/](src/assets/images/icons/)
- Background images: [src/assets/images/background/](src/assets/images/background/)
- Static resources: [src/assets/images/resource/](src/assets/images/resource/)

## Deployment

The `pnpm release` command builds and deploys to production via rsync:

- Target server: `tencent.vm`
- Destination: `/opt/1panel/apps/openresty/openresty/www/sites/cherry-ai.com/index`
- Flags: `-rvztl --delete` (recursive, verbose, compressed, preserve timestamps/symlinks, delete extraneous files)

Only run this command if you have proper SSH access to the production server.
