# Changelog

All notable changes to this project will be documented in this file.

## [0.51] - 2026-02-10

### 🚀 Added
- **"Check for Update" Button**: Added a manual refresh button in the footer to help force-reload cached PWA versions.
- **Version Tracking**: Visible version number (v0.51) in the footer for easier troubleshooting.

## [0.50] - 2026-02-10

### 🛠️ Fixed
- **Local Date Offset**: Switched from UTC (`toISOString`) to local system time for all date logging and chart display. This fixes the issue where evening workouts were recorded on the "tomorrow" date.

## [1.0.0] - 2026-02-09

### 🚀 Added
- Initial release of the **Workout Tracker**.
- Activity Management (Add/Edit/Delete).
- Daily Log Tracker with completion toggles.
- Interactive Stats Dashboard using Chart.js.
- PWA (Progressive Web App) manifest and service worker.

### 🛠️ Fixed
- **Vite Compatibility**: Downgraded to Vite 6 to resolve peer dependency conflicts with the PWA plugin during deployment.
- **Mobile "White Screen" Blocker**: Added a `crypto.randomUUID` fallback for compatibility with older mobile Safari and Chrome engines.
- **Asset Path Resolution**: Fixed relative pathing in `index.html` to support GitHub Pages subdomains.
- **URL Casing**: Standardized repository naming to resolve mobile 404 errors.

### ⚙️ CI/CD
- Automated GitHub Actions workflow for building and deploying to GitHub Pages.
- Standardized ESLint 9 (Flat Config) for automated code quality checks.
