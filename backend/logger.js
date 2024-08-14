const chalk = require("chalk");

function log(action, status, message) {
	const options = {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: false,
	};
	const timestamp = new Date().toLocaleString(undefined, options).replace(",", " -");
	//[DATE - TIME]: STATUS - "ACTION" - MESSAGE
	if (!message) {
		if (status === "SUCCESS") {
			console.log(chalk.cyan(`[${timestamp}]`) + chalk.greenBright(` ${status} `) + `- "${action}"`);
		} else {
			console.log(chalk.cyan(`[${timestamp}]`) + chalk.red(` ${status} `) + `- "${action}"`);
		}
	} else {
		if (status === "SUCCESS") {
			console.log(chalk.cyan(`[${timestamp}]`) + chalk.greenBright(` ${status} `) + `- "${action}" - ${message}`);
		} else {
			console.log(chalk.cyan(`[${timestamp}]`) + chalk.red(` ${status} `) + `- "${action}" - ${message}`);
		}
	}
}

exports.log = log;
