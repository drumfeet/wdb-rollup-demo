const DB = require("weavedb-node-client")
const accounts = require("../../sample2/scripts/lib/accounts")
const db = new DB({ rpc: "localhost:8080", contractTxId: "dbsample1" })

const main = async () => {
  if (0) {
    const adminAuth = accounts.evm.admin.privateKey
    const tx = await db.admin(
      {
        op: "add_db",
        key: "hellodb2", //contractTxId
        db: {
          app: "http://localhost:3000", // this will be shown on the explorer
          name: "hello2", // this will be shown on the explorer
          rollup: true,
          plugins: { notifications: {} },
          tick: 1000 * 60 * 5,
        },
      },
      {
        privateKey: adminAuth,
      }
    )
    console.log("tx", tx)
  }

  if (0) {
    const adminAuth = accounts.evm.admin.privateKey
    const { contractTxId, srcTxId } = await db.admin(
      { op: "deploy_contract", key: "hellodb2" },
      {
        privateKey: adminAuth,
      }
    )
    console.log("contractTxId", contractTxId)
    console.log("srcTxId", srcTxId)
    // you will need the "contractTxId" for regular DB queries
  }

  const stats = await db.node({ op: "stats" })
  console.log("stats", stats)
}

main()
