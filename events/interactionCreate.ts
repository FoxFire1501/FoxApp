import Client from "index";
import { Events, Interaction } from "discord.js";
import { Event } from "modules";

async function slashCommand(interaction: Interaction) {
    if (!interaction.isChatInputCommand() && !interaction.isAutocomplete()) return;

    if (interaction.user.bot) return;

    const client = interaction.client as Client;
    const command = client.slashCommands.get(interaction.commandName);

    if (!command) return;

    if (interaction.isAutocomplete()) {
        if (!command.completion) return;

        if (!client.owner.includes(interaction.user.id)) {
            if (command.ownerOnly) return;
            if (!client.managers.includes(interaction.user.id) && command.managerOnly) return;
        }

        try {
            await command.completion(interaction);
        } catch (error) {
            reportError(error);
        }
    }

    if (interaction.isChatInputCommand()) {
        if (!client.owner.includes(interaction.user.id)) {
            if (command.ownerOnly || !client.managers.includes(interaction.user.id) && command.managerOnly) return interaction.reply("Bạn không có quền để dùng lệnh này:<");
        }

        try {
            await command.run(interaction);
        } catch (error) {
            if (!interaction.replied) interaction.reply("Có lỗi xảy ra khi chạy lệnh này :<");
            else interaction.followUp("Có lỗi xảy ra khi chạy lệnh này :<");
        }
    }
}

export default new Event({
    eventName: Events.InteractionCreate,
    run: slashCommand
});