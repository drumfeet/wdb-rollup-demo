const SDK = require("weavedb-node-client")
const SDK_NODE = require("weavedb-sdk-node")
const adminAuth = require("../.weavedb/accounts/evm/admin.json")

const CONTRACT_TX_ID =
  process.argv[2] || "NA9rKscXy1byKA7oyVypcpLgokH8qYX7Mvbu4ei6g4U"
const RPC_NODE = process.argv[3] || "localhost:8080" //localhost:9090 does not work
const DATABASE_KEY = CONTRACT_TX_ID

const main = async () => {
  try {
    const sdkNode = new SDK_NODE({
      type: 3,
      contractTxId: CONTRACT_TX_ID,
    })
    await sdkNode.init()
    const dbInfo = await sdkNode.getInfo()
    console.log("dbInfo", dbInfo)

    const db = new SDK({
      rpc: RPC_NODE,
      contractTxId: CONTRACT_TX_ID,
    })

    const txAddDb = await db.admin(
      {
        op: "add_db",
        key: DATABASE_KEY,
        db: {
          app: "http://localhost:3000",
          name: DATABASE_KEY,
          rollup: true,
          owner: dbInfo.owner,
          contractTxId: CONTRACT_TX_ID,
        },
      },
      adminAuth
    )
    console.log("txAddDb", txAddDb)
  } catch (e) {
    console.log("e", e)
  }
  process.exit()
}
main()
