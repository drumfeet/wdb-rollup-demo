const WeaveDB = require("weavedb-node-client")
const accounts = require("./lib/accounts")
const db = new WeaveDB({
  rpc: "localhost:8080",
  contractTxId: "drumfeetkey1", // Replace 'CONTRACT_TX_ID' with an existing deployed database contract on the rollup node
})

const main = async () => {
  const adminAuth = accounts.evm.admin.privateKey
  const tx = await db.admin(
    {
      op: "add_db",
      key: "drumfeettest2", // Replace 'NEW_CONTRACT_TX_ID' with your actual database contract name
      db: {
        app: "http://localhost:3000",
        name: "drumfeettest2", // Replace 'db_name' with your actual database instance
        rollup: true, // Set this to true to deploy your database to roll up to the Layer 1 Warp contract
        plugins: { notifications: {} },
        tick: 1000 * 60 * 5,
      },
    },
    {
      privateKey: adminAuth, // Replace 'ADMIN_PRIVATE_KEY' with the actual admin private key
    }
  )
}

main()
