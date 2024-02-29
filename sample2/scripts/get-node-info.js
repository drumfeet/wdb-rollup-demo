const WeaveDB = require("weavedb-node-client")

const db = new WeaveDB({
  rpc: "localhost:8080",
  contractTxId: "CONTRACT_TX_ID", // Replace 'CONTRACT_TX_ID' with an existing deployed database contract on the rollup node
})

const main = async () => {
  const stats = await db.node({ op: "stats" })
  console.log("stats", stats)
}

main()
