const { performance } = require("perf_hooks")
const SDK = require("weavedb-node-client")
const accounts = require("./lib/accounts")

const measureWritePerformance = async (numWrites) => {
  const NUM_DEMO = 1
  const COLLECTION_NAME = "posts"
  const userAuth = { privateKey: accounts.evm.user.privateKey }

  const db = new SDK({
    rpc: "13.229.238.124:8080",
    contractTxId: "drumtest6",
  })

  if (1) {
    let start = performance.now()

    for (let i = 0; i < numWrites; i++) {
      try {
        const tx = await db.query(
          "add:post",
          { body: `Post ${NUM_DEMO} ${i}` },
          COLLECTION_NAME,
          userAuth
        )
        console.log("tx", tx.docID)
      } catch (e) {
        console.error(e.message)
      }
    }

    let end = performance.now()
    let duration = end - start
    console.log(`Total time for ${numWrites} writes: ${duration}ms`)
    console.log(`Writes per second: ${numWrites / (duration / 1000)}`)
  }

  //   console.log(await db.get(COLLECTION_NAME, "4fb816cf57b78b8fb1fb3f18119696a2"))
  //   const result = await db.get(COLLECTION_NAME)
  //   console.log(result.length)
}

measureWritePerformance(10)
