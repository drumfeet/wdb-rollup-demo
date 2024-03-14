const { performance, PerformanceObserver } = require("perf_hooks")
const SDK = require("weavedb-node-client")
const crypto = require("crypto")

const TX_COUNT = parseInt(process.argv[2], 10) || 1
const COLLECTION_NAME = process.argv[3] || "posts"
const CONTRACT_TX_ID = process.argv[4] || "drumtest1"
const RPC_NODE = process.argv[5] || "13.212.91.15:8080"
const userAuth =
  process.argv[6] || require("../.weavedb/accounts/evm/user.json")

const db = new SDK({
  rpc: RPC_NODE,
  contractTxId: CONTRACT_TX_ID,
})

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry)
    if (entry.name === "measureAddPerformance") {
      console.log(`TPS: ${TX_COUNT / (entry.duration / 1000)}`)
    }
  })
})
performanceObserver.observe({
  entryTypes: ["function"],
  buffer: false,
})

const measureAddPerformance = async (count) => {
  for (let i = 0; i < count; i++) {
    const randomBytes = crypto.randomBytes(16).toString("hex")
    try {
      let i = 0
      const tx = await db.query(
        "add:post",
        { body: `Post ${randomBytes}` },
        COLLECTION_NAME,
        userAuth
      )
      console.log("tx.docID", tx.docID)
    } catch (e) {
      console.error(e.message)
    }
  }
}
performance.timerify(measureAddPerformance)(TX_COUNT)
