//
// Grunt task for the objj-compiler.
//
// Author: Friedel Ziegelmayer <dignifiedquire@gmail.com>
//
module.exports = function(grunt) {
  'use strict';

  var compiler = require('objj-compiler');
  var path = require('path');

  grunt.registerMultiTask('objjc', 'Compile files using the objj-compiler.', function() {

    var options = this.options({
      // TODO: add default options
    });

    grunt.log.debug('Options', options);

    this.files.forEach(function(config) {
      config.src.forEach(function(file) {
        grunt.log.debug('Processing glob ' + file);

        if (!grunt.file.isFile(file)) {
          return;
        }

        var contents = grunt.file.read(file);
        var compiled;
        try {
          compiled = compiler.compile(contents, file, options);
        } catch(e) {
          grunt.fail.fatal(e);
        }

        var dest = config.dest;

        if (isDirectory(dest) && !config.orig.cwd) {
          dest = path.join(dest, file);
        }

        // Remove file extension if exists
        if (dest.lastIndexOf('.js') === dest.length - 3) dest.slice(0, -3);

        grunt.log.debug('Saving to', dest);
        grunt.file.write(dest + '.js', compiled.code());

        if (options.sourceMap) grunt.file.write(dest + '.map', compiled.map());
        if (options.ast) grunt.file.write(dest + '.ast', compiled.ast());

        grunt.log.ok('Processed ' + file);
      });
    });

  });
  // Detect if destination path is a directory
  function isDirectory (dest) {
    return grunt.util._.endsWith(dest, '/');
  }
};
