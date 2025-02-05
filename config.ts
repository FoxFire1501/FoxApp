import "dotenv/config"

export default {
    token: process.env.TOKEN,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,

    ownerId: "1195381172549722204",

    managerIds: [""],

    embedOption: {
        color: 0x00ff00,
        footer: `Bot by Mr Cáo`,
        timestamp: true,
    },

    emojiOption: {
        succest: "",
        error: "",
        wait: ""
    }


}