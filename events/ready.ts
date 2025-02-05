import { Event, newLog } from "modules";
import { Events, Client } from "discord.js";
import chalk from "chalk";

async function clientReady(client: Client) {
	newLog(`Loggin ${client.user?.username}`, "success");
}

export default new Event({
	eventName: Events.ClientReady,
	run: clientReady,
});
