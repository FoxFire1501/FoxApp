import { lstatSync, readdirSync } from "fs";
import ClientBase from "index";
import { MessageCommand, SlashCommand } from "modules";

import { join } from "path";

export default async function (client: ClientBase) {
	async function loadCommad(root: string, item: string): Promise<any> {
		if (lstatSync(root + item).isDirectory()) {
			const newRoot = join(root, item, "/");
			return readdirSync(newRoot).forEach(async (i) =>
				loadCommad(newRoot, i)
			);
		}

		const command = (await import(join(root, item))).default as
			| MessageCommand
			| SlashCommand;

		if (!command) return;

		if (command instanceof SlashCommand)
			return client.slashCommands.set(command.data.name, command);

		client.messageCommands.set(command.name, command);

		command.aliases?.forEach((c) => client.messageCommands.set(c, command));
	}

	for (const folder of ["commands/messages/", "commands/slashs/"])
		readdirSync(folder).forEach(async (i) => loadCommad(folder, i));
}
