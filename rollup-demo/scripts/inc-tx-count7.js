const SDK = require("weavedb-node-client")
const adminAuth = require("../.weavedb/accounts/evm/owner.json")

const TX_COUNT = parseInt(process.argv[2], 10) || 100000000
const COLLECTION_NAME = process.argv[3] || "horseRace"

const CONTRACT_TX_ID = "2b0UYpRM2FJGoKIynqLyHDvJ1eS4JNmhe1Ei0qpT5c0"
const RPC_NODE =
  "c0cd826f-a0f3-42d5-8ac4-f2fa34583d23.raas.weavedb-node.xyz:443"

const wait = (ms) => {
  console.log("waiting for...", String(ms), "ms")
  return new Promise((res) => setTimeout(() => res(), ms))
}
const main = async () => {
  const db = new SDK({
    rpc: RPC_NODE,
    contractTxId: CONTRACT_TX_ID,
  })

  for (let i = 0; i < TX_COUNT; i++) {
    const txSetRules = await db.setRules(
      [["allow()"]],
      COLLECTION_NAME,
      "write",
      adminAuth
    )
    console.log(`[${i}] txSetRules.success ${txSetRules.success}`)
    await wait(15000)
  }
}
main()
