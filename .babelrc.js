module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions", "IE >= 9"]
        },
        loose: true,
        // 将 ES6 module 转换为其他模块规范，
        // 可选 "adm" | "umd" | "systemjs" | "commonjs" | "cjs" | false，默认为 false，
        // 交给rollup或者webpack来处理
        modules: false
      }
    ],
    ["@babel/preset-typescript"],
    ["@babel/preset-react"]
  ],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "transform-react-remove-prop-types",
      {
        removeImport: true,
        mode: "remove"
      }
    ],
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/plugin-transform-runtime",
      {
        absoluteRuntime: false,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: true
      }
    ]
  ]
};
