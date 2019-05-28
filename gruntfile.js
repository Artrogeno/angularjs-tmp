module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["dist", '.tmp'],
        copy: {
            main: {
                expand: true,
                cwd: 'app/',
                src: ['**', '!js/**', '!lib/**', '!**/*.css', '!**/bower_components/**'],
                dest: 'dist/'
            },
            shims: {
                expand: true,
                cwd: 'app/lib/webshim/shims',
                src: ['**'],
                dest: 'dist/js/shims'
            },
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app/bower_components/font-awesome/',
                        src: 'fonts/*',
                        dest: 'dist/assets/'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app/assets/',
                        src: 'fonts/*',
                        dest: 'dist/assets/'
                    }
                ]
            }
        },
        rev: {
            files: {
                src: ['dist/**/*.{js,css}', '!dist/js/shims/**', '!bower_components/**', '!app/bower_components/**']
            }
        },
        useminPrepare: {
            html: 'app/index.html'
        },
        usemin: {
            html: ['dist/index.html']
        },

        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin'
    ]);
};