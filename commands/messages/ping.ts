import { MessageCommand } from "modules";
import Client from "index";
import { Message } from "discord.js";

async function pingCommand(message: Message, ...args: string[]) {
    message.reply("Test")
}

export default new MessageCommand({
    name: 'ping',
    run: pingCommand
})