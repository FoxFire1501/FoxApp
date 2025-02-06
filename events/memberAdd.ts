import { Event } from "modules";
import { Events, GuildMember } from "discord.js";
import Client from "index";

async function memberAdd(member: GuildMember) {
    const client = member.client as Client;
    const guiWelChannel = await client.db?.get(`${member.guild.id}.welChannelId`)

    if (!guiWelChannel) return;
}

export default new Event({
    eventName: Events.GuildMemberAdd,
    run: memberAdd
})
