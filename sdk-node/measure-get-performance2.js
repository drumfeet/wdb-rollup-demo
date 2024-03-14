const { performance } = require("perf_hooks")
const SDK = require("weavedb-sdk-node")

const TX_COUNT = parseInt(process.argv[2], 10) || 1
const COLLECTION_NAME = process.argv[3] || "users"
const CONTRACT_TX_ID =
  process.argv[4] || "I5eMduWzfjAZvqJNtQ8j8gtD7Vh6W-nxO_Y9cWTUKuU"

const main = async () => {
  const db = new SDK({
    contractTxId: CONTRACT_TX_ID,
  })
  await db.init()

  const durations = []
  for (let i = 0; i < TX_COUNT; i++) {
    try {
      const start = performance.now()
      const result = await db.get(COLLECTION_NAME)
      const end = performance.now()

      durations.push(end - start)
      console.log(`${i+1} : Documents fetched`, result.length)
    } catch (e) {
      console.error(e.message)
    }
  }
  const totalDuration = durations.reduce((acc, curr) => acc + curr, 0)
  const averageLatency = totalDuration / TX_COUNT
  console.log("durations", durations)
  console.log(`Average latency: ${averageLatency} milliseconds.`)
  console.log(`TPS ${TX_COUNT / (totalDuration / 1000)}`)
}
main()
