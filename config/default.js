module.exports = {
	client: {
		lib: {
			css:[

			],
			scss: [
				'src/vendorssrc/bootstrap-sass-oficial/assets/stylesheets/bootstrap.scss',
				'src/vendorssrc/fontawesome/fontawesome.scss'
			],
			js: [
				'src/vendorssrc/jquery/dist/jquery.js',
				'src/vendorssrc/angular/angular.js',
				'src/vendorssrc/angular-cookies/angular-cookies.js',
				'src/vendorssrc/angular-sanitize/angular-sanitize.js',
				'src/vendorssrc/angular-ui-router/release/angular-ui-router.js',
				//'src/vendorssrc/sprintf/src/angular-sprintf.js',
				//'src/vendorssrc/angular-ui-utils/ui-utils.js',
				//'src/vendorssrc/angular-bootstrap/ui-bootstrap-tpls.js',
				//'src/vendorssrc/angular-file-upload/angular-file-upload.js'
			]
		},
		css: [
			'src/css/*.css'
		],
		scss: [
			'src/scss/*.scss'
		],
		js:[
			'src/js/**/*.js','!./src/vendorssrc/**/*.js'
		],
		html: ['src/**/*.html'],
	}
};