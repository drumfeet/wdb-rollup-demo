const { performance, PerformanceObserver } = require("perf_hooks")
const SDK = require("weavedb-sdk-node")

const main = async () => {
  const COLLECTION_NAME = process.argv[2] || "coas_nftcanvases"
  const CONTRACT_TX_ID =
    process.argv[3] || "0M4qTPqFTxKpfe2uPeimYTEFV3VImL8nSZD3Az7g5Iw"

  const db = new SDK({
    contractTxId: CONTRACT_TX_ID,
  })
  await db.init()

  const performanceObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      console.log(entry)
    })
  })
  performanceObserver.observe({
    entryTypes: ["function"],
    buffer: false,
  })

  const measureGetPerformance = async () => {
    try {
      const result = await db.get(COLLECTION_NAME)
      console.log("Number of documents", result.length)
    } catch (e) {
      console.error(e.message)
    }
  }
  performance.timerify(measureGetPerformance)()
}

main()
