const { resolve } = require('path');

const { build: ESBuild } = require('esbuild');

const pkg = require('../package.json');

const BASE_PATH = resolve(__dirname, '..');

/**
 * @type {import('esbuild').BuildOptions}
 */
const BASE_CONFIG = {
  target: 'es2015',
  logLevel: 'info',
  platform: 'node',
  tsconfig: 'tsconfig.json',
  absWorkingDir: BASE_PATH,
  bundle: true,
  minify: true,
  sourcemap: true,
  external: ['puppeteer', 'handlebars'],
  banner: {
    js: `/** 
 * @version ${pkg.version}
 *
 * @license MIT
 * @copyright Hitechline
 */`,
  },
};

/**
 * @param {import('esbuild').BuildOptions} config
 * @return {import('esbuild').BuildOptions}
 */
function makeConfig(config) {
  return {
    ...BASE_CONFIG,
    ...config,
  };
}

/**
 * @param {import('esbuild').BuildOptions} config
 * @return {import('esbuild').BuildResult}
 */
function build(config) {
  return ESBuild(makeConfig(config));
}

module.exports = {
  BASE_PATH,
  BASE_CONFIG,

  build,
  makeConfig,
};
