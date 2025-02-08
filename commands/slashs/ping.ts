import { SlashCommand } from "modules";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import ClientBase from "index";

async function pingCommand(interaction: ChatInputCommandInteraction) {
	const client = interaction.client as ClientBase;

	interaction.reply("Test");
}

export default new SlashCommand({
	data: new SlashCommandBuilder().setName("ping").setDescription("Test"),
	run: pingCommand,
});
