import { MessageCommand } from "modules";
import ClientBase from "index";
import { Message } from "discord.js";

async function pingCommand(client: ClientBase, message: Message, ...args: string[]) {
    message.reply("Test")
}

export default new MessageCommand({
    name: 'ping',
    run: pingCommand
})