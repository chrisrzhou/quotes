module.exports = (config, env) => {
  config.module.rules.map(rule => {
    if (typeof rule.test !== 'undefined' || typeof rule.oneOf === 'undefined') {
      return rule;
    }
    rule.oneOf.unshift({
      test: /quotes\.md$/,
      use: [
        {
          loader: require.resolve('./src/lib/loader.js'),
        },
      ],
    });
    return rule;
  });
  return config;
};
