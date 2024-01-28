module.exports = {
  default: {
    paths: ['test/features/**/*.feature'],
    parallel: 5,
    format: [
      'progress-bar',
      ['junit','cucumber-report.xml'],
      ['html', 'cucumber-report.html']
    ],
    requireModule: ['ts-node/register'],
    require: ['test/features/**/*.ts']
  }
}
