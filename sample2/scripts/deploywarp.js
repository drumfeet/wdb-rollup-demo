const WeaveDB = require("weavedb-node-client")
const accounts = require("./lib/accounts")

const db = new WeaveDB({
  rpc: "localhost:8080",
  contractTxId: "drumfeettest2", // Replace 'CONTRACT_TX_ID' with an existing deployed database contract on the rollup node
})

const main = async () => {
  const adminAuth = accounts.evm.admin.privateKey
  const { contractTxId, srcTxId } = await db.admin(
    { op: "deploy_contract", key: "drumfeettest2" }, // Replace 'CONTRACT_DB_NAME' with your actual contract database name
    {
      privateKey: adminAuth, // Replace 'ADMIN_PRIVATE_KEY' with the actual admin private key
    }
  )
}

main()
