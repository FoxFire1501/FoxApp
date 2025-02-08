import {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	Message,
	SlashCommandBuilder,
} from "discord.js";
import { Argument } from "./Argument";
import ClientBase from "index";

interface MessageCommandOptions {
	name: string;
	description?: string;
	aliases?: string[];
	category?: string;
	usage?: Argument[];
	ownerOnly?: boolean;
	managerOnly?: boolean;
	run: (clinet: ClientBase, message: Message, ...agrs: string[]) => Promise<any>;
}

export class MessageCommand {
	constructor(option: MessageCommandOptions) {
		(this.name = option.name),
			(this.description = option.description || ""),
			(this.aliases = option.aliases || []),
			(this.category = option.category || "General"),
			(this.usage = option.usage || []),
			(this.ownerOnly = option.ownerOnly || false),
			(this.managerOnly = option.managerOnly || false),
			(this.run = option.run);
	}

	public readonly name: string;

	public readonly description?: string;
	public readonly aliases?: string[];
	public readonly category?: string;
	public readonly usage?: Argument[];

	public readonly ownerOnly?: boolean;
	public readonly managerOnly?: boolean;

	public readonly run: (clinet: ClientBase, message: Message, ...args: string[]) => Promise<any>;
}

interface SlashCommandOptions {
	managerOnly?: boolean;
	ownerOnly?: boolean;
	data: SlashCommandBuilder;
	run: (interaction: ChatInputCommandInteraction) => Promise<any>;
	completion?: (interaction: AutocompleteInteraction) => Promise<any>;
}

export class SlashCommand {
	constructor(option: SlashCommandOptions) {
		this.data = option.data;

		this.managerOnly = option.managerOnly;
		this.ownerOnly = option.ownerOnly;

		this.run = option.run;
		this.completion = option.completion;
	}

	public readonly data: SlashCommandBuilder;

	public readonly managerOnly?: boolean;
	public readonly ownerOnly?: boolean;

	public readonly guildsOnly?: boolean;

	public readonly run: (
		interaction: ChatInputCommandInteraction
	) => Promise<any>;
	public readonly completion?: (
		interaction: AutocompleteInteraction
	) => Promise<void>;
}
