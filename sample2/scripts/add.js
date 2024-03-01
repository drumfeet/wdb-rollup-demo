const WeaveDB = require("weavedb-node-client")
const accounts = require("./lib/accounts")

const db_name = "mar8"
const db = new WeaveDB({
  rpc: "localhost:8080",
  contractTxId: db_name,
})
console.log("db: ", db)
console.log(`db: ${db}`)

const main = async () => {
  const adminAuth = accounts.evm.admin.privateKey

  try {
    await db.admin(
      {
        op: "add_db",
        key: db_name, // This value will appear as `Contract TxID` in WeaveDB Scan if `rollup` to Warp is set to false
        db: {
          app: "http://localhost:3000",
          name: db_name, // Replace 'db_name' with the database name you wish to use
          rollup: true, // Set this to true to deploy your database to roll up to the Layer 1 Warp contract
          plugins: { notifications: {} },
          tick: 1000 * 60 * 5,
          owner: accounts.evm.user.address.toLowerCase(),
        },
      },
      { privateKey: adminAuth, nonce: 1 }
    )
    console.log(`DB [${db_name}] added!`)
  } catch (e) {
    console.log(e.message)
  }
}

main()
