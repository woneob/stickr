module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			hint: {
				files: {
					src: 'src/**/*.js'
				}
			}
		},
		clean: {
			options: {
				force: true
			},
			dist: 'dist/**/*.*'
		},
		uglify: {
			prototype: {
				options: {
					banner: [
						'/*!',
						' * Plugin name: <%= pkg.name %> - <%= pkg.description %>',
						' * Version: v<%= pkg.version %>',
						' * Created: <%= grunt.template.today("yyyy-mm-dd") %>',
						' * Homepage: <%= pkg.homepage %>',
						' * ',
						' * License: MIT License (MIT)',
						' * License URI: http://www.opensource.org/licenses/mit-license.html',
						' */\n\n'
					].join('\n')
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.js', '!**/*.min.js'],
					dest: 'dist/',
					ext: '.min.js',
					extDot: 'last'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['jshint', 'clean', 'uglify']);
};