const { performance, PerformanceObserver } = require("perf_hooks")
const SDK = require("weavedb-node-client")
const crypto = require("crypto")

const TX_COUNT = parseInt(process.argv[2], 10) || 1
const COLLECTION_NAME = process.argv[3] || "posts"
const CONTRACT_TX_ID = process.argv[4] || "drumtest1"
const RPC_NODE = process.argv[5] || "13.212.91.15:8080"
const userAuth =
  process.argv[6] || require("../.weavedb/accounts/evm/user3.json")

const main = async () => {
  const db = new SDK({
    rpc: RPC_NODE,
    contractTxId: CONTRACT_TX_ID,
  })

  const measureAddPerformance = async (count) => {
    const durations = []
    for (let i = 0; i < count; i++) {
      const randomBytes = crypto.randomBytes(16).toString("hex")
      try {
        const start = performance.now()
        const tx = await db.query(
          "add:post",
          { body: `Post ${randomBytes}` },
          COLLECTION_NAME,
          userAuth
        )
        const end = performance.now()
        durations.push(end - start)

        if (tx.error) throw new Error(tx.error)

        console.log(`${i + 1} : tx.docID`, tx.docID)
      } catch (e) {
        console.error(`${i + 1} :`, e.message)
      }
    }
    const totalDuration = durations.reduce((acc, curr) => acc + curr, 0)
    const averageLatency = totalDuration / count
    console.log("durations", durations)
    console.log(`Average latency: ${averageLatency} milliseconds.`)
    console.log(`TPS ${count / (totalDuration / 1000)}`)
  }

  measureAddPerformance(TX_COUNT)
}
main()
