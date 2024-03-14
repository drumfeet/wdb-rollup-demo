const { performance, PerformanceObserver } = require("perf_hooks")
const crypto = require("crypto")
const SDK = require("weavedb-sdk-node")
const userAuth = process.argv[5] || require("./.wallets/user.json")

const main = async () => {
  const ADD_TX_COUNT = parseInt(process.argv[2], 10) || 1
  const COLLECTION_NAME = process.argv[3] || "users"
  const CONTRACT_TX_ID =
    process.argv[4] || "I5eMduWzfjAZvqJNtQ8j8gtD7Vh6W-nxO_Y9cWTUKuU"

  const db = new SDK({
    contractTxId: CONTRACT_TX_ID,
  })
  await db.init()

  const performanceObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      console.log(entry)
      if (entry.name === "measureAddPerformance") {
        console.log(`TPS: ${ADD_TX_COUNT / (entry.duration / 1000)}`)
      }
    })
  })
  performanceObserver.observe({
    entryTypes: ["function"],
    buffer: false,
  })

  const measureAddPerformance = async (count) => {
    for (let i = 0; i < count; i++) {
      const randomBytes = crypto.randomBytes(16).toString("hex")
      try {
        const tx = await db.add(
          { body: `${randomBytes}` },
          COLLECTION_NAME,
          userAuth
        )
        console.log("tx.success", tx.success)
        if (tx.error) console.error("tx.error", tx.error)
      } catch (e) {
        console.error(e.message)
      }
    }
  }

  performance.timerify(measureAddPerformance)(ADD_TX_COUNT)
}

main()
