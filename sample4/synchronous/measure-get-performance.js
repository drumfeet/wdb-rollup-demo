const { performance, PerformanceObserver } = require("perf_hooks")
const SDK = require("weavedb-node-client")

const COLLECTION_NAME = process.argv[2] || "posts"
const CONTRACT_TX_ID = process.argv[3] || "drumtest1"
const RPC_NODE = process.argv[4] || "localhost:8080"

const db = new SDK({
  rpc: RPC_NODE,
  contractTxId: CONTRACT_TX_ID,
})

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry)
  })
})
performanceObserver.observe({
  entryTypes: ["function"],
  buffer: false,
})

const measureGetPerformance = async (count) => {
  try {
    const result = await db.get(COLLECTION_NAME)
    console.log("Number of documents", result.length)
  } catch (e) {
    console.error(e.message)
  }
}
performance.timerify(measureGetPerformance)()
