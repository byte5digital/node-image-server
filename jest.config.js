module.exports = {
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.ts?$": "babel-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	moduleNameMapper: {
		'\\.(scss|sass|css)$': 'identity-obj-proxy',
	  },
}
