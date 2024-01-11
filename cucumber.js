module.exports = {
  default: [
    "test/features/*.feature",
    "--require-module ts-node/register",
    "--require test/features/**/*.ts",
  ].join(" "),
};
