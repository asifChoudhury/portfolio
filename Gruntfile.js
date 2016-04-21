module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* Clear out the images and js directory if it exists */
        clean: {
          dev: {
            src: ['images'],
          },
        },

        /* Generate the images and js directory if it is missing */
        mkdir: {
          dev: {
            options: {
              create: ['images']
            },
          },
        },

        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'css/',    //css file directory
              src: ['*.css'], //select all css files
              dest: 'css/',   //save it in specified directory
              ext: '.min.css'
            }]
          }
        },

        svgmin: {                       // Task
          options: {                  // Configuration that will be passed directly to SVGO
              plugins: [{
                  removeViewBox: false
              }]
          },
          dist: {                     // Target
              files: [{               // Dictionary of files
                  expand: true,       // Enable dynamic expansion.
                  cwd: 'images_src',     // Src matches are relative to this path.
                  src: ['**/*.svg'],  // Actual pattern(s) to match.
                  dest: 'images/',       // Destination path prefix.
                  ext: '.min.svg'     // Dest filepaths will have this extension.
                  // ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
              }]
          }
        },

        imagemin: {
          dynamic: {
            files: [{
              expand: true,
              cwd: 'images_src/',
              src: ['**/*.{png,jpg,gif}'],
              dest: 'images_src/build'
            }]
          }
        },

        responsive_images: {
          myTask: {
            options: {
              sizes: [{
                width: 220,
                height: 220,
                suffix: "_xxsmall"
              },{
                width: 290,
                height: 290,
                suffix: "_xsmall"
              },{
                width: 320,
                suffix: "_small"
              },{
                width: 640,
                suffix: "_medium"
              },{
                width: 800,
                suffix: "_large",
                quality: 60
              },{
                width: 1600,
                suffix: "_xlarge",
                quality: 60
              }]
            },
            files: [{
              expand: true,
              cwd: 'images_src/build/',
              src: ['**.{jpg,gif,png}'],
              dest: 'images/'
            }]
          }
        },
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['clean', 'mkdir' ,'cssmin', 'svgmin', 'imagemin', 'responsive_images']);

};