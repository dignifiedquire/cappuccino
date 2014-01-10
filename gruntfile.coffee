module.exports = (grunt) ->

  DEST_DIR = 'build/'

  grunt.initConfig
    includereplace:
      options:
        prefix: '#'
      objectivej:
        files: [
          src: ['Objective-J/Includes.js', 'Objective-J/Browser/Objective-J.js']
          dest: DEST_DIR
        ]


  grunt.loadNpmTasks 'grunt-include-replace'
  grunt.registerTask 'objectivej', ['includereplace']
  grunt.registerTask 'default', ['objectivej']
