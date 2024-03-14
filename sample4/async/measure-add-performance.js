const { performance, PerformanceObserver } = require("perf_hooks")
const SDK = require("weavedb-node-client")
const crypto = require("crypto")
const PrivateKeys = require("../.weavedb/accounts/evm/privateKeys.js")

const COLLECTION_NAME = process.argv[2] || "posts"
const CONTRACT_TX_ID = process.argv[3] || "drumtest1"
const RPC_NODE = process.argv[4] || "13.212.91.15:8080"

const db = new SDK({
  rpc: RPC_NODE,
  contractTxId: CONTRACT_TX_ID,
})

const performanceObserver = new PerformanceObserver((items) => {
  const count = PrivateKeys().length
  console.log("Wallet count", count)
  items.getEntries().forEach((entry) => {
    console.log(entry)

    console.log(`TPS: ${count / (entry.duration / 1000)}`)
  })
})
performanceObserver.observe({
  entryTypes: ["function"],
  buffer: false,
})

const addDocument = async (_key) => {
  const randomBytes = crypto.randomBytes(16).toString("hex")
  const tx = await db.query(
    "add:post",
    { body: `Post ${randomBytes}` },
    COLLECTION_NAME,
    { privateKey: _key }
  )

  if (tx.error) {
    throw tx.error
  }

  return tx.docID
}

const measureAddPerformance = async () => {
  try {
    const promises = []

    PrivateKeys().map(async (_key) => {
      promises.push(addDocument(_key))
    })

    const results = await Promise.allSettled(promises)
    console.log("results", results)
  } catch (e) {
    console.error(e.message)
  }
}
performance.timerify(measureAddPerformance)()
