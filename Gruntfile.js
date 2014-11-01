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
					src: 'src/scripts/**/*.js'
				}
			}
		},
		clean: {
			scripts: "dist/**/*.js",
			images: "dist/gh-pages/images/**/*.*",
			html: "dist/gh-pages/**/*.html",
			styles: "dist/gh-pages/styles/**/*.css"
		},
		uglify: {
			pageScript: {
				options: {
					banner: '<%= banner %>',
					footer: '\n'
				},
				files: [
					{
						expand: true,
						cwd: 'src/scripts/',
						src: ['**/*.js', '!**/*.min.js'],
						dest: 'dist/gh-pages/scripts/',
						ext: '.min.js',
						extDot: 'last'
					},
					{
						expand: true,
						cwd: 'src/scripts/stickr/',
						src: '**/*.js',
						dest: 'dist/stickr/',
						ext: '.min.js',
						extDot: 'last'
					}
				]
			},
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
					cwd: 'src/scripts/stickr/',
					src: '**/*.js',
					dest: 'dist/stickr/'
				}]
			}
		},
		'compile-handlebars': {
			index: {
				template: 'src/index.handlebars',
				templateData: [
					'package.json',
					'src/data/index.json'
				],
				output: 'dist/gh-pages/index.html'
			}
		},
		less: {
			style: {
				options: {
					compress: false,
					cleancss: true,
					banner: '<%= banner %>',
					cleancssOptions: {
						keepBreaks: true,
						keepSpecialComments: 1
					}
				},
				files: [{
					expand: true,
					cwd: 'src/styles/',
					src: ['**/*.less', '!**/_*.less'],
					dest: 'dist/gh-pages/styles/',
					ext: '.css',
					extDot: 'last'
				}]
			}
		},
		copy: {
			images: {
				expand: true,
				cwd: 'src/images/',
				src: '**/*.*',
				dest: 'dist/gh-pages/images/'
			},
			rootCfg: {
				expand: true,
				cwd: 'src/',
				src: ['*', '!*.handlebars'],
				dest: 'dist/gh-pages/'
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
			options: {
				spawn: false,
			},
			scripts: {
				files: 'src/scripts/**/*.js',
				tasks: [
					'jshint',
					'clean:scripts',
					'uglify'
				]
			},
			html: {
				files: 'src/**/*.handlebars',
				tasks: [
					'clean:html',
					'compile-handlebars'
				]
			},
			images: {
				files: 'src/images/**/*.*',
				tasts: [
					'clean:images',
					'copy:images'
				]
			},
			less: {
				files: 'src/styles/**/*.less',
				tasks: [
					'clean:styles',
					'less'
				]
			},
			rootCfg: {
				files: ['src/*', '!src/*.handlebars'],
				tasks: ['copy:rootCfg']
			},
			grunt: {
				files: 'Gruntfile.js',
				tasks: [
					'jshint',
					'clean',
					'uglify',
					'compile-handlebars',
					'copy',
					'less'
				]
			}
		},
		'gh-pages': {
			options: {
				base: 'dist/gh-pages/',
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
		'copy',
		'lses'
	]);

	grunt.registerTask('server', [
		'jshint',
		'clean',
		'uglify',
		'compile-handlebars',
		'copy',
		'less',
		'connect',
		'watch'
	]);

	grunt.registerTask('pages', [
		'gh-pages'
	]);
};
