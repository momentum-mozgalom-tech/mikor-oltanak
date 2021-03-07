# Mikor oltanak?

## Project setup

This is mostly a TypeScript monorepo setup, meaning that multiple "packages" are hosted and interlinked within this one repository.

Repository setup:

1. `packages/api`: the common API type definitions
1. `firebase`: the web app, deployed using Firebase Hosting
1. `packages/firebase-functions`: backend functions, deployed using Firebase Functions

## Dev setup

### For the first time

1. Request access to Firebase from a project owner.
1. Make sure you have `node`, `git`, and `git lfs` are installed.
1. Check out the repo.
1. Run `npm install -g pnpm` to install the PNPM package manager.
1. Run `pnpm install` to download the dependencies of the project.
1. Run `pnpx firebase login` to log into Firebase.

### Web App

1. Make sure that the project dependencies are installed and that the development environment is set up (see instructions above).
1. Run `pnpm build:app` to build the app dependencies.
1. Change into the `firebase` directory and run `pnpm dev` to run the development server locally.
    - Local server should open an instance of the app in your default browser.
    - The app should say that it is a test environment.
    - You should be able to log in.
1. Try modifying something in the code and saving the changes. The app should update its components without having to refresh the page.
