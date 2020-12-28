module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"plugin:react/recommended",
		"airbnb-typescript",
		"plugin:@typescript-eslint/recommended",
		"plugin:eslint-comments/recommended",
		"plugin:promise/recommended",
		"plugin:unicorn/recommended",
		"plugin:prettier/recommended",
		"prettier",
		"prettier/@typescript-eslint",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
		project: "./tsconfig.json",
	},
	plugins: ["@typescript-eslint", "eslint-comments", "promise", "unicorn"],
	rules: {
		 // As agreed we will use tabs for indentation
		 "indent": ["warn", "tab"],
		 "no-prototype-builtins": "off",
		 "import/prefer-default-export": "off",
		 "import/no-default-export": "off",
		 "no-underscore-dangle": ["error", { "allow": ["_source"] }],
		 "jsx-a11y/no-static-element-interactions": "off",
		 "jsx-a11y/click-events-have-key-events": "off",
		 "jsx-a11y/label-has-associated-control": "off",
		 "no-use-before-define": "off",
		 "@typescript-eslint/no-use-before-define": ["error"],
		 // Common abbreviations are known and readable
		 "unicorn/prevent-abbreviations": "off",
	},
}
