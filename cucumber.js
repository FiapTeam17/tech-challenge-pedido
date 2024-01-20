module.exports = {
  default: {
    paths: ['test/features/**/*.feature'],
    parallel: 2,
    format: [
      'progress-bar', 
      ['html', 'cucumber-report.html']
    ],
    requireModule: ['ts-node/register'],
    require: ['test/features/**/*.ts']
  }
}
