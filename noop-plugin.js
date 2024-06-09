const path = require('path')
const { Compilation, Compiler, NormalModule, WebpackError, sources } = require("webpack");

const { RawSource, ConcatSource } = sources;

const PLUGIN_NAME = 'noop'

class NoopPlugin {
  constructor({} = {}) {
  }

  async apply(compiler) {
    compiler.hooks.make.tap(PLUGIN_NAME, (compilation) => {
      // Apply loader to JS modules.
      NormalModule.getCompilationHooks(compilation).loader.tap(
        PLUGIN_NAME,
        (loaderContext, module) => {
          if (
            // JavaScript (and Flow) modules
            /\.jsx?/.test(path.extname(module.resource)) ||
            // TypeScript modules
            /\.tsx?/.test(path.extname(module.resource))
          ) {
            module.loaders.push({
              loader: path.resolve(__dirname, "./noop-loader.js"),
              options: {
                testOptions: '!debug'
              },
            });
          }
        }
      );
    });
  }

}

module.exports = () => (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack(config, webpackPluginOptions) {
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options);
      }
      const noop = new NoopPlugin(webpackPluginOptions);
      config.plugins.push(noop);
      return config;
    },
  };
};

