module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: [
			'/*!',
			' * Name: <%= pkg.name %> - <%= pkg.description %>',
			' * Version: v<%= pkg.version %>',
			' * Homepage: <%= pkg.homepage %>',
			' * License: <%= pkg.license %>',
			' */\n\n'
		].join('\n'),
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
			beautify: {
				options: {
					banner: '<%= banner %>',
					mangle: false,
					compress: false,
					beautify: true,
					preserveComments: true,
					footer: '\n'
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.js', '!**/*.min.js'],
					dest: 'dist/'
				}]
			},
			minify: {
				options: {
					banner: '<%= banner %>',
					footer: '\n'
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
		},
		copy: {
			jsCopy: {
				expand: true,
				cwd: 'dist/',
				src: '**/*.min.js',
				dest: 'examples/javascripts'
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'examples'
				}
			}
		},
		watch: {
			client: {
				files: 'src/**/*.*',
				tasks: ['jshint', 'clean', 'uglify', 'copy'],
				options: {
					spawn: false,
				}
			},
			grunt: {
				files: ['Gruntfile.js']
			}
		},
		'gh-pages': {
			options: {
				base: 'examples',
				message: 'Auto-generated commit:'
			},
			src: '**/*'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-gh-pages');

	grunt.registerTask('default', ['jshint', 'clean', 'uglify', 'copy']);
	grunt.registerTask('server', ['jshint', 'clean', 'uglify', 'copy', 'connect', 'watch']);
	grunt.registerTask('pages', ['gh-pages']);
};
