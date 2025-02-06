import { Message, SlashCommandBuilder } from "discord.js";
import Client from "index";
import { MessageCommand } from "modules";

// deploy slash commands
async function deployCommand(message: Message, ...args: string[]) {
    const client = message.client as Client;

    const guildID = args[1];

    const slashCommands: SlashCommandBuilder[] = [];
    client.slashCommands.forEach(slashCommand => slashCommands.push(slashCommand.data));

    if (guildID) {
        try {
            await client.application?.commands.set(slashCommands, guildID);
        } catch (error) {
            return message.reply("Xin cái ID lmeo");
        }
    } else client.application?.commands.set(slashCommands);

    message.reply("Đã deploy slash commands");
}

export default new MessageCommand({
    name: 'deploy',
    category: 'owners',
    description: 'Deploy slash commands',
    ownerOnly: true,
    run: deployCommand
})
