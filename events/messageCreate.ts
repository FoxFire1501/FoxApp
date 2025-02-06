import Client from "index";
import { inlineCode, Message, userMention, Events } from "discord.js";
import { Event, newLog } from "modules";
import config from "config";

async function messageCreate(message: Message) {
	if (
		message.author.bot ||
		!message.inGuild() ||
		!message.channel.isTextBased()
	)
		return;

	const client = message.client as Client;

	client.user = client.user!;

	const prefix = config.prefix;

	if (message.content == userMention(client.user.id))
		return message.channel.send(
			`Xin chào, prefix của bot là ${inlineCode(prefix)} nhé.`
		);

	if (
		!message.content.startsWith(prefix) &&
		!message.content.startsWith(userMention(client.user.id))
	)
		return;

	const [commandName, ...args] = message.content
		.slice(
			message.content.startsWith(prefix)
				? prefix.length
				: userMention(client.user.id).length
		)
		.trim()
		.split(/ +g/);

	if (!commandName) return;

	const command = client.messageCommands.get(commandName);
	if (!command) return;

	if (client.owner != message.author.id) {
		let isM = false;
		if (command.ownerOnly)
			return message.reply({
				embeds: [
					{
						description: `Commands này chỉ có thể được sử dụng bởi ${inlineCode(
							client.owner
						)} nhé.`,
						color: config.embedOption.color,
						footer: {
							text: config.embedOption.footer,
							icon_url: message.author.displayAvatarURL({
								forceStatic: true,
							}),
						},
					},
				],
			});

		client.managers.forEach((i) => {
			if (message.member?.roles.cache.get(i)) isM = true;
		});

		if (command.managerOnly && !isM)
			return message.reply({
				embeds: [
					{
						description: `Bạn không có quyền dùng lệnh này`,
						color: config.embedOption.color,
						footer: {
							text: config.embedOption.footer,
							icon_url: message.author.displayAvatarURL({
								forceStatic: true,
							}),
						},
					},
				],
			});
	}

	try {
		command.run(message, ...args);
	} catch (err) {
		return message.reply({
			embeds: [
				{
					description: `Sảy ra lỗi khi cố sử dụng lệnh.`,
					color: config.embedOption.color,
					footer: {
						text: config.embedOption.footer,
						icon_url: message.author.displayAvatarURL({
							forceStatic: true,
						}),
					},
				},
			],
		});
		newLog(err, "error");
	}
}

export default new Event({
	eventName: Events.MessageCreate,
	run: messageCreate,
});
