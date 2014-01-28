module.exports = function(grunt) {

  grunt.initConfig({

    wintersmith: {
      build: {},
      preview: {
        options: {
          action: "preview"
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: '../articles',
          src: ['**/*.jpg'],
          ext: '.jpg'
        }, {
          expand: true,
          cwd: '../articles',
          src: ['**/*.png'],
          ext: '.png'
        }]
      }
    },
    responsive_images: {
      build: {
        options: {
          separator: '.',
          sizes: [{
            name: '320',
            width: 320
          }, {
            name: '640',
            width: 640
          }, {
            name: "1024",
            width: 1024
          }]
        },
        files: [{
          expand: true,
          cwd: '../articles',
          src: ['**/*.{jpg,gif,png}','!src'],
          dest: '../articles'
        }]
      }
    },
    clean: {
      options: {
        force: true
      },
      stuff: ["../**/*", "!../src/**", "!../CNAME"]
    }
  });

  // Load NPM Task
  grunt.loadNpmTasks('grunt-wintersmith');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['wintersmith:preview']);
  grunt.registerTask('build', ['clean:stuff', 'wintersmith:build', 'responsive_images:build', 'imagemin']);

};