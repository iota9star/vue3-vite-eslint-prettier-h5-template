module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 75,
      propList: [`*`],
      unitPrecision: 5,
    },
    autoprefixer: {
      overrideBrowserslist: [`> 0%`],
      grid: true,
    },
  },
};
