module.exports = (grunt) ->

  DEST_DIR = 'build/'

  grunt.initConfig
    includereplace:
      options:
        prefix: '#'
      objectivej:
        files: [
          src: 'Objective-J/Includes.js'
          dest: DEST_DIR
        ]
    objjc:
      objectivej:
        files: [
          src: "#{DEST_DIR}/Objective-J/Browser/Objective-J.js"
          dest: DEST_DIR
        ]

  grunt.loadNpmTasks 'grunt-include-replace'
  grunt.loadTasks 'tasks'

  grunt.registerTask 'objectivej', ['includereplace:objectivej', 'objjc:objectivej']
  grunt.registerTask 'default', ['objectivej']
