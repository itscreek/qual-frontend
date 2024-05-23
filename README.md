# Qual Frontend
<img src="https://img.shields.io/badge/-TypeScript-007ACC.svg?style=flat&logo=typescript&logoColor=%23FFFFFF"> <img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=flat"> <img src="https://img.shields.io/badge/-Remix-232F3E?style=flat&logo=remix"> <img src="https://badges.aleen42.com/src/vitejs.svg">

This repository is where we develop the [Qual Typing](https://app.qualcloud.net)(Quantum Typing App) product. 

Qual helps you to improve your typing skills using Quantum Machine Learning. During your play, our QML model learns your typo and output optimized typing practice words for you.

<p align="center">
    <img src="https://github.com/itscreek/qual-frontend/assets/133622243/58d56697-bfd2-4ebb-a24f-682e8cadf0e5">
</p>

## Setup

Set up your environment using `npm`. If you haven't installed Node.js yet, install Node.js first.

```shellscript
npm install
```

## Development

You can develop your SPA app just like you would a normal Remix app, via:

```shellscript
npm run dev
```

## Production

When you are ready to build a production version of your app, `npm run build` will generate your assets and an `index.html` for the SPA.

```shellscript
npm run build
```

### Preview

You can preview the build locally with [vite preview](https://vitejs.dev/guide/cli#vite-preview) to serve all routes via the single `index.html` file:

```shellscript
npm run preview
```

> [!IMPORTANT]
>
> `vite preview` is not designed for use as a production server

### Deployment
Vercel will automatically deploy every push in `main` branch.

## Env variables
You can specified these env variables in your `.env` file.

```
VITE_API_BASE_URL=baseUrlOfAPI
VITE_API_LOG_ENDPOINT=/endPointOfLogAPI
VITE_API_TYPING_PROBLEMS_ENDPOINT=/endPointOfTypingProblemsAPI
```

You can use `.env.development` in `development` mode and `.env.production` in `production` mode. For more details, please check https://vitejs.dev/guide/env-and-mode.

## Workflow
Our workflow is basically based on [Github flow](https://docs.github.com/ja/get-started/using-github/github-flow). 

1. Create a branch and make some commits.
2. Create a pull request. (Fix your codes according to review comments if there are any problems.)
3. Merge your pull request.

The above workflow is just a general case. We encourage developers to be flexible.

## Dependencies
- Node.js v20.12.1

## References
- [Qual Backend](https://github.com/itscreek/qual-backend)
- [Node.js](https://nodejs.org/en)
- [Remix Docs](https://remix.run/docs/en/main)
- [Remix SPA Mode](https://remix.run/docs/en/main/future/spa-mode)
- [React Docs(jp)](https://ja.react.dev/learn)
- [Vite](https://ja.vitejs.dev/)
