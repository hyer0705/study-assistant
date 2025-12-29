# GEMINI.md

## Project Overview

This project is a Discord bot designed to automate the announcement of algorithm study problems. It's built with **Bun**, **Discord.js**, and **TypeScript**. The bot integrates with **Google Sheets** to fetch a list of problems and then posts them to a Discord channel. The project follows the **Angular Commit Convention** for commit messages.

The core functionality involves:
- A Discord slash command (`/문제공지`) to trigger the announcement.
- Fetching problem data from a Google Sheet.
- Formatting and posting the problem list to Discord.
- Pinning the announcement message for visibility.

Authentication with Google services is handled via a service account, with credentials stored in a `study-assistant-account-credentials.json` file.

## Building and Running

### Prerequisites
- Bun
- Node.js
- A Discord bot token
- Google Cloud service account credentials

### Environment Variables
The bot requires the following environment variables to be set:
- `DISCORD_TOKEN`: Your Discord bot token.
- `SHEET_ID`: The ID of the Google Sheet containing the problems.

### Commands

- **Install Dependencies:**
  ```bash
  bun install
  ```

- **Build the project:**
  ```bash
  bun run build
  ```

- **Start the bot:**
  ```bash
  bun run start
  ```

- **Deploy slash commands:**
  ```bash
  bun run deploy
  ```

## Development Conventions

- **Commit Messages:** This project uses the [Angular Commit Convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#commit).
  - `feat`: New feature
  - `fix`: Bug fix
  - `docs`: Documentation changes
  - `style`: Code formatting
  - `refactor`: Code refactoring
  - `test`: Adding or modifying tests
  - `chore`: Build process or auxiliary tool changes

- **Linting:** The project uses ESLint for code linting. You can run the linter with:
  ```bash
  bunx eslint .
  ```

- **Formatting:** The project uses Prettier for code formatting. You can format the code with:
  ```bash
  bunx prettier --write .
  ```
