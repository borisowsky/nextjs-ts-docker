# Next.js Apollo TypeScript starter with Docker

- [What you get](#what-you-get)
  - [Features](#features)
  - [Developer experience](#developer-experience)
- [Getting started](#getting-started)
  - [Start development server](#start-development-server)
  - [Run tests](#run-tests)
- [Additional helpers](#additional-helpers)
  - [useAuth()](#useauth-hook)
- [Docker](#docker)

## What you get

### Features

- Latest [Next.js](https://nextjs.org/) version.
- GraphQL [Apollo](https://www.apollographql.com/docs/react/essentials/get-started/) client with built-in [JWT](https://jwt.io/) authentication.
- Localization via [i18next](https://github.com/isaachinman/next-i18next/).
- Configured [TypeScript](https://www.typescriptlang.org/) environment.
- Configured [Sass/SCSS](https://sass-lang.com/) via [next-sass](https://github.com/zeit/next-plugins/tree/master/packages/next-sass) for styling (plus [Normalize.css](https://necolas.github.io/normalize.css/) included).
- Built-in [helpers](#additional-helpers).

### Developer experience

- Testing environment via [Jest](https://jestjs.io/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro).
- [Prettier](https://prettier.io/) for code formatting.
- Debug configuration for [VSCode](https://code.visualstudio.com/).
- [Docker](https://www.docker.com/) configuration to serve **production-ready** build with Nginx.

## Getting started

### Start development server

Before start using project you have to unstall dependencies by running _one of these commands_:

```bash
# If you're using Yarn package mangaer:
yarn

# If you're using NPM package mangaer:
npm install
```

### Tests

We are using [Jest](https://jestjs.io/) for testing. To run tests located in `src/tests` directory use `test` script from `package.json`:

```bash
yarn test
```

---

Pretty much everything you need to know you can find in [Next.js documentation](https://nextjs.org/docs).

## Additional helpers

### `useAuth()` hook

This hook helps you to implement authentication. Here is an example how to use it:

```tsx
import React from 'react';

import { useAuth } from './utils/auth';

const MyPage = () => {
  const [{ data }, logout] = useAuth();

  return (
    <div>
      {data ? (
        <div>
          <div>Hello, {data.me.name}!</div>
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
        <div>Please sign in</div>
      )}
    </div>
  );
};
```

## Docker

To build and run Dockerized **production-ready** container, run:

```bash
docker-compose up --build
```