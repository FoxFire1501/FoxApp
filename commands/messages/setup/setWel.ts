import { MessageCommand } from "modules";
import ClientBase from "index";
import {
	ActionRowBuilder,
	APIEmbed,
	ButtonBuilder,
	ButtonStyle,
	channelMention,
	inlineCode,
	Message,
	PermissionFlagsBits,
} from "discord.js";
import config from "config";

let channelWel: string | undefined = undefined;

async function setWelCommand(
	client: ClientBase,
	message: Message,
	...args: string[]
) {
	if (!message.member?.permissions.has(PermissionFlagsBits.ManageGuild))
		return message.reply({
			embeds: [
				{
					description: `Bạn không có quyền để dùng lệnh này!`,
					color: config.embedOption.color,
					footer: {
						text: config.embedOption.footer,
						icon_url: message.member?.displayAvatarURL({
							forceStatic: true,
						}),
					},
				},
			],
		});

	channelWel = (await client.db?.get(
		`${message.guildId}.welChannelId`
	)) as string;

	let embedContent: APIEmbed = {
		description: `${
			channelWel
				? `Channel welcome của server ${inlineCode(
						message.guild?.name ?? ""
				  )} là \n > ${channelMention(channelWel)}`
				: `Hiện tại server ${inlineCode(
						message.guild?.name ?? ""
				  )} chưa có channel Welcome!`
		}`,
		footer: {
			text: config.embedOption.footer,
			icon_url:
				message.member?.displayAvatarURL({ forceStatic: true }) ?? "",
		},
		color: config.embedOption.color,
	};

	message.reply({
		embeds: [embedContent],
		components: [
			new ActionRowBuilder<ButtonBuilder>().addComponents(
				new ButtonBuilder()
					.setLabel(channelWel ? "Chỉnh Sửa" : "Thêm Mới")
					.setCustomId(`setChannelWel.${message.member.id}`)
					.setStyle(
						channelWel ? ButtonStyle.Secondary : ButtonStyle.Success
					)
			),
		],
	});
}

export default new MessageCommand({
	name: "setWel",
	aliases: ["sw"],
	run: setWelCommand,
});
