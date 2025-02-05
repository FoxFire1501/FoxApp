import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import chalk from "chalk";

export function newLog(
	message: string | unknown,
	type?: "error" | "success" | "warn"
): void {
	let messagecl;
	if (!existsSync("./logs")) {
		mkdirSync("./logs", { recursive: true });
	}

	const timestamp = new Date().toLocaleDateString().split("/").join("-");
	const logFileName = join("logs", `${timestamp}.log`);
	writeFileSync(
		logFileName,
		`[${new Date().toLocaleString()}] ${message}\n`,
		{ flag: "a" }
	);

	switch (type) {
		case "error":
			messagecl = chalk.red(message);
			break;
		case "success":
			messagecl = chalk.green(message);
			break;
		case "warn":
			messagecl = chalk.yellow(message);
			break;
		default:
			break;
	}

	const logMessage = `[${new Date().toLocaleString()}] ${
		messagecl ?? message
	}\n`;

	console.log(logMessage.trim());
}
