---
description: Standard procedure for committing and pushing changes to the Workout Tracker repository.
---

Whenever a feature or fix is completed and ready to be pushed to GitHub, follow these steps:

1.  **UI Polish**: Ensure all colors match the brand identity (#8899ff).
2.  **Versioning**: 
    - Determine the next version number (e.g., v0.52 -> v0.53).
    - Update the version string in `src/App.tsx`.
3.  **Documentation Update**:
    - Add a new entry to `CHANGELOG.md` describing the changes.
    - Update `SESSION_NOTES.md` with the latest accomplishments and version info.
    - (Optional) Update `README.md` if new features were added.
4.  **Local Verification**: If possible, verify the visual changes locally.
5.  **Commit & Push**:
    - Stage all changed files (including docs).
    - Commit with a descriptive message that includes the version number.
    - Push to `main`.
    - Verify the push by checking the Git log or GitHub Actions.
