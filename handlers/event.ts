import { Event } from "modules"
import Client from "index"
import { readdirSync } from "fs"
const EVENT_DIR = './events/'

export default async function (client: Client) {
    readdirSync(EVENT_DIR).forEach(async file => {
        const clientEvent = (await import(`.${EVENT_DIR}${file}`)).default as Event<any>;
        client.on(clientEvent.eventName, clientEvent.run);
    });
}