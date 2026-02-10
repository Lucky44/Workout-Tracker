# Changelog

All notable changes to this project will be documented in this file.

## [0.58] - 2026-02-10

### 🛡️ Hardened Orientation Guard
- **Native Detection**: Replaced manual dimension checks with `window.matchMedia("(orientation: landscape)")` for 100% accuracy across mobile engines.
- **Aggressive Shielding**: Increased sensitivity to cover all devices under 1024px width in landscape mode.
- **Improved Responsiveness**: Added `orientationchange` listeners to trigger the guard instantly.
- **PWA Hardening**: Added `scope` and consistent `start_url` to manifest for better OS recognition of standalone preferences.

## [0.55 - 0.57] - 2026-02-10

### 🛠️ Orientation Lock Infrastructure
- **React-based Shield**: Implemented a "Soft Lock" system that replaces the entire UI with a "Rotate Device" warning in landscape mode.
- **Portrait Lock**: Configured PWA manifest for `portrait` and `standalone` display modes.
- **UI Compaction**: Reduced vertical padding and margins across all components to improve "scannability" and fit more content on mobile screens.

## [0.54] - 2026-02-10

### 🎨 Aesthetic Overhaul
- **Syne & Lexend Fonts**: Syne for body copy and Lexend for headers/buttons.
- **Glassmorphism**: Added backdrop-blur, semi-transparent backgrounds, and subtle borders to all cards.
- **Color Palette**: Transitioned to a **Deep Midnight Navy** background (#02040a) with subtle radial glows for high chromatic contrast with the blue accents.
- **Color Palette**: Synchronized main title to primary blue accent with glow effect.
- **Button Glow**: Added hover glows and transitions to all buttons.
- **Mobile Optimization**: Implemented fluid typography (`clamp()`), larger touch targets, and haptic tap feedback (`scale(0.96)`) for a native app feel.

### 🧪 System Test
- **Speed Run**: Verified a fix for the terminal stalling issue using the new "Bulletproof Mode" tasking.


## [0.52] - 2026-02-10

### 🎨 UI Polish
- **LogTracker Styling**: Fixed the color of "No activities added yet" to use the `#8899ff` primary color for better theme consistency.

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
