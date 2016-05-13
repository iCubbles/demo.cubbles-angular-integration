'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    'http-server':{
      'dev': {
        port: '8080',
        root: './public',
        logFn: function(req, res, error){}
      }
    }
  });

  grunt.loadNpmTasks('grunt-http-server');
  grunt.registerTask('startWebserver', ['http-server']);
};