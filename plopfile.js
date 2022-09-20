const fuzzyPath = require("inquirer-fuzzy-path");

const requireField = (fieldName) => {
	return (value) => {
		if (String(value).length === 0) {
			return `${fieldName} is required`;
		}
		return true;
	};
};

module.exports = (plop) => {
	plop.setPrompt("fuzzyPath", fuzzyPath);

	// get module name from path
	plop.setHelper("moduleName", (text) => {
		return text.split("/")[1];
	});

	plop.setGenerator("component", {
		description: "Create a component",
		prompts: [
			{
				type: "input",
				name: "compName",
				message: "What is your component name?",
				validate: requireField("compName"),
			},
			{
				type: "fuzzyPath",
				name: "modulePath",
				message: "in which module will your component live?",
				itemType: "directory",
				rootPath: "src/",
				depthLimit: 0,
				excludeFilter: (nodePath) => nodePath === "src/",
				validate: requireField("modulePath"),
			},
		],
		actions: [
			{
				type: "add",
				path: "{{modulePath}}/{{pascalCase compName}}/{{pascalCase compName}}.tsx",
				templateFile: "plop-templates/Component/Component.ts.hbs",
			},
			{
				type: "add",
				path: "{{modulePath}}/{{pascalCase compName}}/{{pascalCase compName}}.module.scss",
				templateFile: "plop-templates/Component/Component.module.scss.hbs",
			},
			{
				type: "add",
				path: "{{modulePath}}/{{pascalCase compName}}/{{pascalCase compName}}.test.js",
				templateFile: "plop-templates/Component/Component.test.js.hbs",
			},
			{
				type: "add",
				path: "{{modulePath}}/{{pascalCase compName}}/index.ts",
				templateFile: "plop-templates/Component/index.ts.hbs",
			},
		],
	});
};
