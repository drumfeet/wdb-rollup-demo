const { performance } = require("perf_hooks")
const crypto = require("crypto")
const SDK = require("weavedb-sdk-node")

const TX_COUNT = parseInt(process.argv[2], 10) || 1
const COLLECTION_NAME = process.argv[3] || "users"
const CONTRACT_TX_ID =
  process.argv[4] || "I5eMduWzfjAZvqJNtQ8j8gtD7Vh6W-nxO_Y9cWTUKuU"
const userAuth = process.argv[5] || require("./.wallets/user.json")

const main = async () => {
  const db = new SDK({
    contractTxId: CONTRACT_TX_ID,
  })
  await db.init()

  const durations = []
  for (let i = 0; i < TX_COUNT; i++) {
    const randomBytes = crypto.randomBytes(16).toString("hex")
    try {
      const start = performance.now()
      const tx = await db.add(
        { body: `${randomBytes}` },
        COLLECTION_NAME,
        userAuth
      )
      const end = performance.now()

      durations.push(end - start)
      console.log("tx.success", tx.success)
      if (tx.error) console.error("tx.error", tx.error)
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
