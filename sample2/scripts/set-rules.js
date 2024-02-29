const WeaveDB = require("weavedb-node-client")
const accounts = require("./lib/accounts")

const CONTRACT_TX_ID = "dbtest01"
const COLLECTION_NAME = "people"

const db = new WeaveDB({
  rpc: "localhost:8080",
  contractTxId: CONTRACT_TX_ID, // Replace 'CONTRACT_TX_ID' with an existing deployed database contract on the rollup node
})

const main = async () => {
  const adminAuth = accounts.evm.admin.privateKey
  const tx = await db.setRules([["deny()"]], COLLECTION_NAME, "write", {
    privateKey: adminAuth,
  })
  console.log("tx", tx)
}

main()
