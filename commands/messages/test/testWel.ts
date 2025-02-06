import { createWelImage, MessageCommand } from "modules";
import Client from "index";
import { Message } from "discord.js";

async function testWel(message: Message, ...args: string[]) {
    if (!message.member) return;
	const img = await createWelImage(message.member);

	message.reply({
		files: [
			{
				attachment: img,
				name: "welcome.png",
			},
		],
	});
}

export default new MessageCommand({
	name: "tw",
	run: testWel,
});
