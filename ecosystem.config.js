module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [
		{
			name: "image-server",
			script: "dist/index.js",
			instances: 5,
			exec_mode: "cluster",
			watch: true,
			autorestart: true,
		},
	],
}
