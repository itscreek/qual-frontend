# Qual Frontend
<img src="https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=flat">
<img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/-Remix-232F3E?style=flat&logo=remix">
<img src="https://badges.aleen42.com/src/vitejs.svg">

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

You can then serve your app from any HTTP server of your choosing. The server should be configured to serve multiple paths from a single root `/index.html` file (commonly called "SPA fallback"). Other steps may be required if the server doesn't directly support this functionality.

For a simple example, you could use [sirv-cli](https://www.npmjs.com/package/sirv-cli):

```shellscript
npx sirv-cli build/client/ --single
```

## Workflow
Our workflow is basically based on [Github flow](https://docs.github.com/ja/get-started/using-github/github-flow). 

1. Create a branch and make some commits.
2. Create a pull request. (Fix your codes according to review comments if there are any problems.)
3. Merge your pull request.

The above workflow is just a general case. We encourage developers to be flexible.

## Dependencies
- Node.js v20.12.1

## References
- [Node.js](https://nodejs.org/en)
- [Remix Docs](https://remix.run/docs/en/main)
- [Remix SPA Mode](https://remix.run/docs/en/main/future/spa-mode)
- [React Docs(jp)](https://ja.react.dev/learn)
- [Vite](https://ja.vitejs.dev/)