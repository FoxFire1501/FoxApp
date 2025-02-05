import { ClientEvents } from "discord.js";

interface EventOption<Event extends keyof ClientEvents> {
    eventName: Event;
    once?: boolean;
    run: (...args: ClientEvents[Event]) => Promise<any>;
}

export class Event<Event extends keyof ClientEvents> {
    constructor(options: EventOption<Event>) {
        this.eventName = options.eventName;
        this.once = options.once;
        this.run = options.run;
    }

    eventName;
    once?;
    run;
}