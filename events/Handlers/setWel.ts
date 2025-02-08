import ClientBase from "index";
import { Event, EventHandler } from "modules";
import {
	ActionRowBuilder,
	APIEmbed,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	channelMention,
	ChannelSelectMenuBuilder,
	ChannelSelectMenuInteraction,
	ChannelType,
	Events,
	inlineCode,
	Interaction,
	TextChannel,
} from "discord.js";
import config from "config";

function embedContent(interaction: Interaction, content: string): APIEmbed {
	return {
		description: content,
		color: config.embedOption.color,
		footer: {
			text: config.embedOption.footer,
			icon_url: interaction.member?.avatar ?? "",
		},
	};
}

let channelWel: string | undefined

class buttonHandler extends EventHandler {
	handler(interaction: ButtonInteraction): void {
		const [customId, memberID] = interaction.customId.split(".");

		switch (customId) {
			case "setChannelWel":
				if (
					customId !== "setChannelWel" ||
					memberID !== interaction.member?.user.id
				)
					return;

				if (Date.now() - interaction.message.createdTimestamp > 60000) {
					interaction.message.edit({ components: [] });
					interaction.reply({
						content: "Bạn vui lòng sử dụng lại lệnh",
						ephemeral: true,
					});
					return;
				}

				const content = {
					embeds: [
						embedContent(
							interaction,
							"Bạn vui lòng chọn channel Welcome"
						),
					],
					components: [
						new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(
							new ChannelSelectMenuBuilder()
								.setChannelTypes(ChannelType.GuildText)
								.setCustomId(`setChannelWel.${interaction.user.id}`)
						),
					],
				};

				try {
					interaction.message.delete();
				} catch (er) {}

				(interaction.channel as TextChannel).send(content);
				break;
			case "sumChannelWel":
				if (!channelWel) interaction.reply({
					content: `Sảy ra lỗi khi lấy ID channel.`,
					ephemeral: true
				});
				else {
					(interaction.client as ClientBase).db?.set(`${interaction.guildId}.welChannelId`, channelWel)
					interaction.message.edit({
						embeds: [
							embedContent(interaction, `Đã đặt channel ${channelMention(channelWel)} là Welcome channel.`)
						],
						components: []
					});
					interaction.deferUpdate()
				}
				break;
		}
	}
}

class selectMenuHandler extends EventHandler {
	handler(interaction: ChannelSelectMenuInteraction) {
		const [customId, memberID] = interaction.customId.split(".");

		if (
			customId !== "setChannelWel" ||
			memberID !== interaction.user.id
		)
			return;

		channelWel = interaction.values[0].trim();

		const content = {
			embeds: [
				embedContent(
					interaction,
					`${channelMention(
						channelWel
					)} sẽ là channel welcome của server ${inlineCode(
						interaction.guild?.name ?? ""
					)}`
				),
			],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
					.setCustomId(`sumChannelWel.${interaction.user.id}`)
					.setLabel("Chấp Nhận")
					.setStyle(ButtonStyle.Success),
					new ButtonBuilder()
					.setCustomId(`setChannelWel.${interaction.user.id}`)
					.setLabel("Quay Lại")
					.setStyle(ButtonStyle.Secondary)
				)
			]
		};

		

		interaction.message.edit(content)
		interaction.deferUpdate()
	}
}

async function setWelButtonHandlers(interaction: Interaction) {
	if (interaction.isButton()) new buttonHandler().handler(interaction);
	if (interaction.isChannelSelectMenu()) new selectMenuHandler().handler(interaction);
}

export default new Event({
	eventName: Events.InteractionCreate,
	run: setWelButtonHandlers,
});
