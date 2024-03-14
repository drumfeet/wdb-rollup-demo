const { performance, PerformanceObserver } = require("perf_hooks")
const SDK = require("weavedb-node-client")

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
    console.log(`TPS: ${TX_COUNT / (entry.duration / 1000)}`)
  })
})
performanceObserver.observe({
  entryTypes: ["function"],
  buffer: false,
})

const measureDeletePerformance = async (count) => {
  const docs = await db.cget(COLLECTION_NAME, ["date", "desc"], count)

  for (let i = 0; i < count; i++) {
    try {
      const doc = docs[i]
      const tx = await db.query(
        "delete:post",
        COLLECTION_NAME,
        doc.id,
        userAuth
      )
      console.log("tx.docID", tx.docID)
    } catch (e) {
      console.error(e.message)
    }
  }
}
performance.timerify(measureDeletePerformance)(TX_COUNT)
