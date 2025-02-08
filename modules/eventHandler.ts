import {
	Interaction,
	ChatInputCommandInteraction,
	StringSelectMenuInteraction,
	ChannelSelectMenuInteraction,
	RoleSelectMenuInteraction,
	ButtonInteraction,
} from "discord.js";

export abstract class EventHandler {
	abstract handler(
		interaction:
			| Interaction
			| ChatInputCommandInteraction
			| StringSelectMenuInteraction
			| ChannelSelectMenuInteraction
			| RoleSelectMenuInteraction
			| ButtonInteraction
	): void;
}
