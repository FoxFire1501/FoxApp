import { createWelImage, Event, newLog } from "modules";
import { Events, GuildMember, TextChannel } from "discord.js";
import ClientBase from "index";

async function memberAdd(member: GuildMember) {
    const client = member.client as ClientBase;
    const guiWelChannelID = await client.db?.get(`${member.guild.id}.welChannelId`) as string

    if (!guiWelChannelID) return;

    const guiWelChannel = await member.guild.channels.cache.get(guiWelChannelID)?.fetch() as TextChannel

    try {
        guiWelChannel.send({
            files: [
                {
                    attachment: await createWelImage(member),
                    name: `welcome_${member.id}.png`
                }
            ]
        })
    } catch (err) {
        newLog(err, "error")
    }
}

export default new Event({
    eventName: Events.GuildMemberAdd,
    run: memberAdd
})
