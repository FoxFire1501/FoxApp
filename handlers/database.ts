import config from "config";
import { MongoDriver, QuickDB } from "quick.db";

const mongoDriver = new MongoDriver(config.database.ulrMongo ?? "");
let dbInstance: QuickDB | null = null;


async function initializeDB() {
    if (!dbInstance) {
        try {
            await mongoDriver.connect();
            console.log("Kết nối MongoDB thành công!");
            dbInstance = new QuickDB({ driver: mongoDriver });
        } catch (error) {
            console.error("Lỗi kết nối MongoDB:", error);
            process.exit(1);
        }
    }
    return dbInstance;
}


initializeDB().then(() => console.log("Database đã sẵn sàng!"));

export default dbInstance;