---
description: How to bypass terminal stalling on this system
---

# Bulletproof Mode Protocol

Use this workflow if the integrated terminal (`run_command`) hangs or stalls indefinitely.

## The Troubleshooting Context
On this Windows Insider Build (26200) with PowerShell 7.5.4, the terminal bridge often loses the "close" signal, causing commands to hang on "Running..." indefinitely.

## The Protocol
1. **Bypass the Terminal**: Prioritize filesystem-direct tools (`view_file`, `write_to_file`, `list_dir`, `replace_file_content`) for all possible operations.
2. **Silent Background Commands**: If a command MUST be run (like a git push or npm build), use the `run_command` tool with the command set as a background task, piping output to a `.log` file.
3. **Manual Verification**: Since background commands won't return stdout immediately, verify success by reading the generated `.log` file or checking the filesystem state.
4. **User-Assisted Pushing**: If Git hanging persists, guide the USER to use the VS Code Source Control sidebar for commits and syncs.
5. **Session Persistence**: Always read `SESSION_NOTES.md` and `CHANGELOG.md` at the start of a session to understand the current build state and blocking issues.
