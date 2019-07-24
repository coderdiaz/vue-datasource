## Contribute
We would love for you to contribute and help make it even better than it is todat! As a contributor, here are the guidelines we would like you to follow:

## Development Setup
You will need Node.js version +8.9.0.
1. After clonning the repo, run:
```bash
$ npm i # or yarn install
```

### Commonly use NPM scripts
```bash
# build all packages
$ npm run build

# run full unit-tests suite
$ npm run test:unit

# run linter
$ npm run lint
```

## Found a Bug?
If you find a bug in source code, you can help us by submitting an issue to our GitHub repository. Even better, you can submit a Pull Request with a fix.

## Missing a Feature?
You can request a new feature by submitting an issue to our GitHub repository. If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it. Please consider what kind of change it is:
- For a **Major Feature**, first open an issue and outline your proposal so that it can be discussed. This will also allow us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted in the project. For your issue name, please prefix your proposal with `[discussion]`, for example "[discussion]: your feature idea".
- **Small Features** can be crafted and firectly submitted as a Pull Request.

## Coding Rules
To ensure consistency throughout the source code, keep these rules in mind as you are working:
- All feature or bug fixes **must be tested** by one or more specs (unit-tests).
- We follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), but wrap all code at **100 characters**.

## Commit Message Guidelines
We have very precise rules over how our git commit messages can be formatted. This leads to **more readable messages** that are easy to follow when looking through the **project history**. But also, we use git commit messages to **generate the change log**.

### Type
Must be one of the following:
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
- **docs**: Documentation only changes.
- **feature**: A new feature.
- **bugfix**: A bug fix.
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- **test**: Adding missing tests or correcting existing tests.
