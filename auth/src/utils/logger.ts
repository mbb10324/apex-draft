import chalk from "chalk";

/* Structures a legible console log with the format:
    [DATE - TIME]: STATUS - "ACTION" - MESSAGE
  ========================================================================*/
export default function log(action: string, status: string, message?: string) {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	};

	const timestamp = new Date().toLocaleString(undefined, options).replace(",", " -");

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
