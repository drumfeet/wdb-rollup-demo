const { performance, PerformanceObserver } = require("perf_hooks")
const SDK = require("weavedb-node-client")

const TX_COUNT = parseInt(process.argv[2], 10) || 1
const COLLECTION_NAME = process.argv[3] || "posts"
const CONTRACT_TX_ID = process.argv[4] || "drumtest1"
const RPC_NODE = process.argv[5] || "13.212.91.15:8080"

const main = async () => {
  const db = new SDK({
    rpc: RPC_NODE,
    contractTxId: CONTRACT_TX_ID,
  })

  const measureGetPerformance = async (count) => {
    const durations = []
    for (let i = 0; i < count; i++) {
      try {
        const start = performance.now()
        const result = await db.get(COLLECTION_NAME, ["date", "desc"])
        const end = performance.now()
        console.log("Number of documents", result.length)

        durations.push(end - start)
      } catch (e) {
        console.error(e.message)
      }
    }
    const totalDuration = durations.reduce((acc, curr) => acc + curr, 0)
    const averageLatency = totalDuration / count
    console.log("durations", durations)
    console.log(`Average latency: ${averageLatency} milliseconds.`)
    console.log(`TPS ${count / (totalDuration / 1000)}`)
  }

  measureGetPerformance(TX_COUNT)
}
main()
