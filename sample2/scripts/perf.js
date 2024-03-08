const { performance } = require("perf_hooks")
const SDK = require("weavedb-node-client")
const accounts = require("./lib/accounts")

const measureWritePerformance = async (numWrites) => {
  const NUM_DEMO = 1
  const COLLECTION_NAME = "posts"
  const userAuth = { privateKey: accounts.evm.user.privateKey }

  const db = new SDK({
    rpc: "localhost:8080",
    // contractTxId: "W2FGmWcZAKyCdDkeZ8etiXDOlZRUgz1IiMN70loh5vk",
    // contractTxId: "YF-yKJTi6f6_vhyTxCz-UsGf0tNKi5yKwPAYbrxfB8g",
    contractTxId: "K6zxVKEuOeeZGhvfcE1q9SVxH7lkOJ4eqGuN9UWL-ZA",
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

  // console.log(await db.get(COLLECTION_NAME, "a5135c99ad7f65e016db5a03b2b90564"))
  // const result = await db.get(COLLECTION_NAME)
  // console.log(result.length)
}

measureWritePerformance(20)
