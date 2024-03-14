const { performance, PerformanceObserver } = require("perf_hooks")
const SDK = require("weavedb-node-client")
const crypto = require("crypto")
const PrivateKeys = require("../.weavedb/accounts/evm/privateKeys.js")

const COLLECTION_NAME = process.argv[2] || "posts"
const CONTRACT_TX_ID = process.argv[3] || "drumtest1"
const RPC_NODE = process.argv[4] || "13.212.91.15:8080"

const main = () => {
  const db = new SDK({
    rpc: RPC_NODE,
    contractTxId: CONTRACT_TX_ID,
  })

  const addDocument = async (_key) => {
    const randomBytes = crypto.randomBytes(16).toString("hex")
    const start = performance.now()
    const tx = await db.query(
      "add:post",
      { body: `Post ${randomBytes}` },
      COLLECTION_NAME,
      { privateKey: _key }
    )
    const end = performance.now()

    if (tx.error) {
      throw tx.error
    }

    return end - start
  }

  const measureAddPerformance = async () => {
    try {
      const promises = []
      PrivateKeys().map(async (_key) => {
        promises.push(addDocument(_key))
      })

      const results = await Promise.allSettled(promises)
      console.log("results", results)

      const totalDuration = results.reduce((acc, curr) => acc + curr.value, 0)
      const count = PrivateKeys().length
      const averageLatency = totalDuration / count
      console.log(`Average latency: ${averageLatency} milliseconds.`)
      console.log(`TPS ${count / (totalDuration / 1000)}`)
    } catch (e) {
      console.error(e.message)
    }
  }
  measureAddPerformance()
}
main()
