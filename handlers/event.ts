import { Event } from "modules";
import ClientBase from "index";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";
const EVENT_DIR = "./events/";

export default async function (client: ClientBase) {
	readdirSync(EVENT_DIR).forEach(async (file) => {
		async function loadEvent(root: string, item: string) {
			const event = (await import(join(root, item)))
				.default as Event<any>;
			if (!event) return;
			if (event.once) client.once(event.eventName, event.run);
			else client.on(event.eventName, event.run);
		}
		if (lstatSync(EVENT_DIR + file).isDirectory()) {
			const newRoot = join(EVENT_DIR, file, "/");
			readdirSync(newRoot).forEach(async (f) => {
				loadEvent(newRoot, f);
			});
		} else {
			loadEvent(EVENT_DIR, file);
		}
	});
}
