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
					cwd: 'src/<%= pkg.name %>/',
					src: ['**/*.js', '!**/*.min.js'],
					dest: 'dist/<%= pkg.name %>/'
				}]
			},
			minify: {
				options: {
					banner: '<%= banner %>',
					footer: '\n'
				},
				files: [
					{
						expand: true,
						cwd: 'src/<%= pkg.name %>/',
						src: ['**/*.js', '!**/*.min.js'],
						dest: 'dist/<%= pkg.name %>/',
						ext: '.min.js',
						extDot: 'last'
					},
					{
						expand: true,
						cwd: 'src/<%= pkg.name %>/',
						src: ['**/*.js', '!**/*.min.js'],
						dest: 'dist/gh-pages/scripts/',
						ext: '.min.js',
						extDot: 'last'
					}
				]
			}
		},
		'compile-handlebars': {
			index: {
				template: 'src/gh-pages/index.handlebars',
				templateData: 'src/gh-pages/data/index.json',
				output: 'dist/gh-pages/index.html'
			}
		},
		less: {
			style: {
				options: {
					compress: false,
					cleancss: false,
					banner: '<%= banner %>'
				},
				files: [{
					expand: true,
					cwd: 'src/gh-pages/styles/',
					src: ['**/*.less', '!**/_*.less'],
					dest: 'dist/gh-pages/styles/',
					ext: '.css',
					extDot: 'last'
				}]
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'dist/gh-pages/'
				}
			}
		},
		watch: {
			client: {
				files: 'src/**/*.*',
				tasks: [
					'jshint',
					'clean',
					'uglify',
					'compile-handlebars'
				],
				options: {
					spawn: false,
				}
			},
			less: {
				files: 'src/gh-pages/styles/**/*.less',
				tasks: 'less',
				options: {
					nospawn: true
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
	grunt.loadNpmTasks('grunt-compile-handlebars');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-gh-pages');

	grunt.registerTask('default', [
		'jshint',
		'clean',
		'uglify',
		'compile-handlebars',
		'lses'
	]);

	grunt.registerTask('server', [
		'jshint', 
		'clean', 
		'uglify', 
		'compile-handlebars', 
		'less', 
		'connect', 
		'watch'
	]);

	grunt.registerTask('pages', [
		'gh-pages'
	]);
};
