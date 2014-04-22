/**

    The final Gruntfile

**/
module.exports = function(grunt) {

  /*
    The following line is a killer!

    It takes all devdependencies defined in the package.json and creates
    the tasks we can use here in the gruntfile.
    By writing this line you won't have to register each task seperately
    at the end of the gruntfile.
  */
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // initialising our configuration
  grunt.initConfig({
    // where can I find the devDependencies
    pkg: grunt.file.readJSON('package.json'),

    // HTML Hint Block
    htmlhint: {
      build: {
        options: {
          'tag-pair': true, // always watch for matching end-tags
          'tagname-lowercase': true, // lowercase for tagnames
          'attr-lowercase': true, // lowercase for attributes
          'attr-value-double-quotes': true, // double quotationmarks for attributes
          'doctype-first': true, // Check for a doctype
          'spec-char-escape': true, // Check for unescaped special characters
          'id-unique': true, // Check for unique IDs, not unique -> kickbandie
          'head-script-disabled': true, // Scripts go to the footer
          'style-disabled': true // no style tag in the header, only external CSS-files
        },
        src: ['*.html'] // check all HTML files
      }
    },

    // LESS to CSS Block
    less: {
      build: {
        options: {
          paths: ['less'], // Watch this folder
          report: true // Report in the terminal what you did
        },

        files: {
          /*
            Create a css file out of the given less file.
            WATCH OUT: the source is in the back, not in the front!
          */
          'css/learning-less.css' : 'less/combined-learning-less.less'
        }
      }
    },

    // Autoprefixer Block
    autoprefixer: {
      build: {
        options: {
          /*
            We support modern browsers three version back but only
            if their share among users is above 1%.
          */
          browsers: ['last 3 versions', '> 1%']
        },

        files: {
          // Watch out again: The one in the back is the source!
          'css/learning-less.css' : 'css/learning-less.css'
        }
      }
    },

    // CSS Minifier Block
    cssmin: {
      build: {
        src: 'css/learning-less.css', // When this file is created
        dest: 'css/learning-less.min.css' // create a minified version of it.
      }
    },

    // Watch Block
    watch: {

      html: {
        files: ['index.html'], // watch index.html for changes
        tasks: ['htmlhint'] // when changes -> do task
      },

      css: {
        files: ['less/*.less'], // watch all .less files for changes
        tasks: ['lessy'] // when changes -> do all defined tasks (see grunt.registerTask 'lessy')
      }
    }


  });

  grunt.registerTask('default', []);
  grunt.registerTask('lessy', ['less', 'autoprefixer', 'cssmin']);
}