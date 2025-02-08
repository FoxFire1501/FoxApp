import config from "config"
import { Database } from "quickmongo"

export default new Database(config.database.ulrMongo ?? "", { autoConnect: true })