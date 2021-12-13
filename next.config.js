// next.config.js
const withPlugins = require("next-compose-plugins");

const nextConfiguration = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.child_process = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.events = false;
      config.resolve.fallback.string_decoder = false;
    }
    return config;
  },
};

module.exports = withPlugins([], nextConfiguration);
