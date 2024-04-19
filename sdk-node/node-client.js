const SDK = require("weavedb-node-client")
const SDK_NODE = require("weavedb-sdk-node")
const EthCrypto = require("eth-crypto")
const dbOwnerAuth = require("./.wallets/owner.json")

const COLLECTION_NAME = "people"

const CONTRACT_TX_ID = "RsVicFU1mx97QxQAY3h3_SfDmxrQq6RMRiuGH7PI3zg"
const RPC_NODE =
  "a46e1545-db7f-4b6d-883e-cba1e0a28918.raas.weavedb-node.xyz:443"

const wait = (ms) => {
  console.log("waiting for...", String(ms), "ms")
  return new Promise((res) => setTimeout(() => res(), ms))
}
const sdkNode = async () => {
  const db = new SDK_NODE({
    contractTxId: CONTRACT_TX_ID,
    nocache: true,
  })
  await db.init()

  // only bundle queries are allowed. db contract v0.37.2 cannot write queries using `weavedb-sdk-node`
  const txSetRules = await db.setRules(
    { "allow write": true },
    COLLECTION_NAME,
    dbOwnerAuth
  )
  console.log("txSetRules", txSetRules)

  const userAuth = EthCrypto.createIdentity()
  const txAdd = await db.add({ name: "Bob" }, COLLECTION_NAME, userAuth)
  console.log("txAdd", txAdd)
}

const nodeClient = async () => {
  const db = new SDK({
    rpc: RPC_NODE,
    contractTxId: CONTRACT_TX_ID,
  })

  const txSetRules = await db.setRules(
    [["allow()"]],
    COLLECTION_NAME,
    "write",
    dbOwnerAuth
  )
  console.log("txSetRules", txSetRules)

  const userAuth = EthCrypto.createIdentity()
  const txAdd = await db.add({ name: "Bob" }, COLLECTION_NAME, userAuth)
  console.log("txAdd", txAdd)

  process.exit()
}

// sdkNode()
nodeClient()
