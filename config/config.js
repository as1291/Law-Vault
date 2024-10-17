let config = {
    MONGO_URL: "mongodb://AnkitRaj:AnkitRaj@cluster0-shard-00-00.tanpw.mongodb.net:27017,cluster0-shard-00-01.tanpw.mongodb.net:27017,cluster0-shard-00-02.tanpw.mongodb.net:27017/?ssl=true&replicaSet=atlas-14vf0n-shard-0&authSource=admin&retryWrites=true&w=majority",
    DB_CONNECTION_RETTEMPT_LIMIT_NODE: 5,
    SECRET_KEY: "jksdo"
}

module.exports = config;