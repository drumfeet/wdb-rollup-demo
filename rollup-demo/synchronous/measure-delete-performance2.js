const { performance, PerformanceObserver } = require("perf_hooks")
const SDK = require("weavedb-node-client")

const TX_COUNT = parseInt(process.argv[2], 10) || 1
const COLLECTION_NAME = process.argv[3] || "posts"
const CONTRACT_TX_ID = process.argv[4] || "drumtest1"
const RPC_NODE = process.argv[5] || "13.212.91.15:8080"
const userAuth =
  process.argv[6] || require("../.weavedb/accounts/evm/user.json")

const main = async () => {
  const db = new SDK({
    rpc: RPC_NODE,
    contractTxId: CONTRACT_TX_ID,
  })

  const measureDeletePerformance = async (count) => {
    const docs = await db.cget(COLLECTION_NAME, ["date", "desc"], count)

    const durations = []
    for (let i = 0; i < count; i++) {
      try {
        const doc = docs[i]
        const start = performance.now()
        const tx = await db.query(
          "delete:post",
          COLLECTION_NAME,
          doc.id,
          userAuth
        )
        const end = performance.now()

        durations.push(end - start)
        console.log(`${i+1} : tx.docID`, tx.docID)
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

  measureDeletePerformance(TX_COUNT)
}
main()
