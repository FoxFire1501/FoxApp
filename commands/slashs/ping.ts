import { SlashCommand } from "modules";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Client from "index";

async function pingCommand(interaction: ChatInputCommandInteraction) {
	const client = interaction.client as Client;

	interaction.reply("Test");
}

export default new SlashCommand({
	data: new SlashCommandBuilder().setName("ping").setDescription("Test"),
	run: pingCommand,
});
