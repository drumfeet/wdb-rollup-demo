const WeaveDB = require("weavedb-node-client")
const accounts = require("./lib/accounts")

const db_name = "mar8"
const db = new WeaveDB({
  rpc: "localhost:8080",
  contractTxId: db_name, // Replace 'CONTRACT_TX_ID' with an existing deployed database contract on the rollup node
})

const main = async () => {
  const adminAuth = accounts.evm.admin.privateKey
  const { contractTxId, srcTxId } = await db.admin(
    {
      op: "deploy_contract",
      key: db_name,
    },
    {
      privateKey: adminAuth, // Replace 'ADMIN_PRIVATE_KEY' with the actual admin private key
    }
  )
  if (contractTxId) {
    console.log("DB successfully deployed!")
    console.log("contractTxId", contractTxId)
  } else {
    console.log("something went wrong!")
  }
}

main()
