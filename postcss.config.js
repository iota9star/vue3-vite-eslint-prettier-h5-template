module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: [`*`],
      unitPrecision: 5,
    },
    autoprefixer: {
      overrideBrowserslist: [`> 0%`],
      grid: true,
    },
  },
};
