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
          src: ['./contents/**/*.jpg'],
          ext: '.jpg'
        }, {
          expand: true,
          src: ['./contents/**/*.png'],
          ext: '.png'
        }]
      }
    },
    responsive_images: {
      options:{
        force:true
      },
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
          src: ['../articles/**/*.{jpg,gif,png}','!src']
        }]
      }
    },
    clean: {
      options: {
        force: true
      },
      stuff: ["../**", "!../src/**", "!../CNAME"]
    }
  });

  // Load NPM Task
  grunt.loadNpmTasks('grunt-wintersmith');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['wintersmith:preview']);
  grunt.registerTask('build', ['clean:stuff', 'imagemin', 'wintersmith:build']);

};