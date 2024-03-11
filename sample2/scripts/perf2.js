const { performance, PerformanceObserver } = require("perf_hooks")
const SDK = require("weavedb-node-client")
const accounts = require("./lib/accounts")
const { nanoid } = require("nanoid")

const ADD_TX_COUNT = 20
const GET_TX_COUNT = 1
const COLLECTION_NAME = "posts"
const userAuth = { privateKey: accounts.evm.user.privateKey }

const db = new SDK({
  rpc: "localhost:8080",
  contractTxId: "K6zxVKEuOeeZGhvfcE1q9SVxH7lkOJ4eqGuN9UWL-ZA",
})

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry)
    if (entry.name === "measureAddPerformance") {
      console.log(`TPS: ${COUNT / (entry.duration / 1000)}`)
    }
  })

  // performance.clearMarks()
  // performance.clearMeasures()
  // performanceObserver.disconnect()
})
performanceObserver.observe({
  entryTypes: ["function"],
  buffer: false,
})

const measureAddPerformance = async (count) => {
  for (let i = 0; i < count; i++) {
    const randomStr = nanoid(8)
    try {
      let i = 0
      const tx = await db.query(
        "add:post",
        { body: `Post ${randomStr}` },
        COLLECTION_NAME,
        userAuth
      )
      console.log("tx.docID", tx.docID)
    } catch (e) {
      console.error(e.message)
    }
  }
}

const measureGetPerformance = async (count) => {
  for (let i = 0; i < count; i++) {
    try {
      const result = await db.get(COLLECTION_NAME)
      // console.log("result", result)
    } catch (e) {
      console.error(e.message)
    }
  }
}

performance.timerify(measureAddPerformance)(ADD_TX_COUNT)
performance.timerify(measureGetPerformance)(GET_TX_COUNT)
