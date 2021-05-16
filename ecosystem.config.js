module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [
		{
			name: "image-server",
			script: "dist/index.js",
			instances: 10,
			exec_mode: "fork",
			watch: true,
			autorestart: true,
		},
	],
}
