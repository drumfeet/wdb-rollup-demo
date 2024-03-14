const { performance } = require("perf_hooks")
const SDK = require("weavedb-node-client")

const TX_COUNT = parseInt(process.argv[2], 10) || 1
const COLLECTION_NAME = process.argv[3] || "posts"
const CONTRACT_TX_ID = process.argv[4] || "drumtest1"
const RPC_NODE = process.argv[5] || "13.212.91.15:8080"

const db = new SDK({
  rpc: RPC_NODE,
  contractTxId: CONTRACT_TX_ID,
})

const getDocuments = async () => {
  const start = performance.now()
  const result = await db.get(COLLECTION_NAME)
  const end = performance.now()
  const duration = end - start
  console.log("result.length", result.length)
  return duration
}

const measureGetPerformance = async (count) => {
  try {
    const promises = []
    for (let i = 0; i < count; i++) {
      promises.push(getDocuments())
    }

    const results = await Promise.allSettled(promises)
    console.log("results", results)

    const totalDuration = results.reduce((acc, curr) => acc + curr.value, 0)
    const averageLatency = totalDuration / count
    console.log(`Average latency: ${averageLatency} milliseconds.`)
    console.log(`TPS ${count / (totalDuration / 1000)}`)
  } catch (e) {
    console.error(e.message)
  }
}
measureGetPerformance(TX_COUNT)
