import { Client, ClientOptions, GatewayIntentBits } from "discord.js";
import config from "config";
import { readFileSync } from "fs";
import { MessageCommand, SlashCommand } from "modules";
import loadCommand from "handlers/command";
import loadEvent from "handlers/event";

const package_json = JSON.parse(readFileSync("./package.json", "utf-8"));

interface ClientBaseOptions extends ClientOptions {
	owner: string;
	managers: string[];

	version: string;
}

export default class ClientBase extends Client {
	constructor(option: ClientBaseOptions) {
		super(option);

		this.owner = option.owner;
		this.managers = option.managers;

		this.version = option.version;

		this.messageCommands = new Map();
		this.slashCommands = new Map();

		loadCommand(this);
		loadEvent(this);
	}

	public readonly owner: string;
	public readonly managers: string[];
	public readonly version: string;

	public readonly messageCommands: Map<string, MessageCommand>;
	public readonly slashCommands: Map<string, SlashCommand>;
}

const client = new ClientBase({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.Guilds,
	],

	version: package_json.version,
	owner: config.ownerId,
	managers: config.managerIds,
});

client.login(config.token);
