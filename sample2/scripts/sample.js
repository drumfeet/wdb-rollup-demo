const DB = require("weavedb-node-client")
const db = new DB({ rpc: "localhost:8080", contractTxId: "dbsample1" })

const main = async () => {
  const stats = await db.node({ op: "stats" })
  console.log("stats", stats)
}

main()
