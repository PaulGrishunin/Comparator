# Overpack

Build multiple Webpack configurations in parallel.

## Installation

```
# NPM
npm install --save-dev overpack

# Yarn
yarn add -D overpack
```

## Basic Usage

In order to build multiple configurations in parallel, your Webpack config must export an array of configurations to
build (or a function that returns an array).
Then, instead of running the Webpack CLI to build, simply run Overpack instead:

```
overpack path/to/webpack.config.js
``` 

By default, Overpack will look for `webpack.config.js` in the current working directory.
