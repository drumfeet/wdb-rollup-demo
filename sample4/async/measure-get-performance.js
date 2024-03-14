const { performance, PerformanceObserver } = require("perf_hooks")
const SDK = require("weavedb-node-client")

const TX_COUNT = parseInt(process.argv[2], 10) || 1
const COLLECTION_NAME = process.argv[3] || "posts"
const CONTRACT_TX_ID = process.argv[4] || "drumtest1"
const RPC_NODE = process.argv[5] || "13.212.91.15:8080"

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

const getDocuments = async () => {
  const result = await db.get(COLLECTION_NAME)
  return result.length
}

const measureGetPerformance = async (count) => {
  try {
    const promises = []
    for (let i = 0; i < count; i++) {
      promises.push(getDocuments())
    }

    const results = await Promise.allSettled(promises)
    console.log("results", results)
  } catch (e) {
    console.error(e.message)
  }
}
performance.timerify(measureGetPerformance)(TX_COUNT)
