// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const builder = require('./tasks/builder');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('css-class-builder.buildCSS', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		let {
			fileName
		} = vscode.window.activeTextEditor.document;
		let fileType = '';

		for (let i = fileName.length - 1; i > 0; i--) {
			if (fileName[i] === '.') {
				break;
			}
			fileType = `${fileType}${fileName[i]}`;
		}
		fileType = fileType.split('').reverse().join('');

		if (fileType !== 'html') {
			vscode.window.showErrorMessage('Only HTML files are supported');
		}
		let {
			tabSize
		} = vscode.workspace.getConfiguration().editor || {};
		let {
			seperator
		} = vscode.workspace.getConfiguration()['css-class-builder'] || {};

		builder({
			filePath: fileName,
			tabSize,
			seperator: seperator || '_'
		});
		vscode.window.showInformationMessage('Styles added successfully');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}