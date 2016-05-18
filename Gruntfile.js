'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    'http-server': {
      'dev': {
        port: '8080',
        root: './public',
        logFn: function (req, res, error) {}
      }
    },
    'eslint': {
      target: ['public/js/**', 'Gruntfile.js']
    }
  });

  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.registerTask('startWebserver', ['http-server']);
};
