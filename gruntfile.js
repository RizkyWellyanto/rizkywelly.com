/**
 * Created by welly on 09/24/2016.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        watch: {
            options: {livereload: true},
            files: ['public/**', 'server.js', 'routes/**', 'models/**'],
            tasks:[]
        },
        express: {
            all:{
                options:{
                    port:3000,
                    hostname:'localhost',
                    bases:['./public'],
                    livereload:true,
                    script:'server.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.registerTask('default', ['express:all', 'watch']);
};