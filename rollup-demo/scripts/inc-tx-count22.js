const SDK = require("weavedb-node-client")
const adminAuth = require("../.weavedb/accounts/evm/owner.json")
const EthCrypto = require("eth-crypto")

const TX_COUNT = parseInt(process.argv[2], 10) || 100000000
const COLLECTION_NAME = process.argv[3] || "horseRace"

const CONTRACT_TX_ID = "FoBg8mk8DOn2hKQBu3NpJPHRQ8slpYyBms0XwmC5VSE"
const RPC_NODE =
  "42b4b729-9e11-49f8-a3b6-d1bd035834ee.raas.weavedb-node.xyz:443"

const wait = (ms) => {
  console.log("waiting for...", String(ms), "ms")
  return new Promise((res) => setTimeout(() => res(), ms))
}
const main = async () => {
  const db = new SDK({
    rpc: RPC_NODE,
    contractTxId: CONTRACT_TX_ID,
  })

  const userAuth = EthCrypto.createIdentity()

  for (let i = 0; i < TX_COUNT; i++) {
    const txAdd = await db.add({ name: "Bob" }, COLLECTION_NAME, userAuth)
    console.log(`[${i}] txAdd.success ${txAdd.success}`)

    // const txSetRules = await db.setRules(
    //   [["allow()"]],
    //   COLLECTION_NAME,
    //   "write",
    //   adminAuth
    // )
    // console.log(`[${i}] txSetRules.success ${txSetRules.success}`)

    await wait(15000)
  }
}
main()
