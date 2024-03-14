import { performance } from "perf_hooks"
import SDK from "weavedb-node-client"
import crypto from "crypto"
import userAuth from "./.wallets/user.json" assert { type: "json" }

export const handler = async (event) => {
  const TX_COUNT = 20
  const COLLECTION_NAME = "posts"

  const db = new SDK({
    rpc: "47.128.255.11:8080",
    contractTxId: "drumtest1",
  })

  const _myEntries = []

  const measureUpsertPerformance = async (count) => {
    const start = performance.now()
    for (let i = 0; i < count; i++) {
      const randomBytes = crypto.randomBytes(16).toString("hex")
      const docID = randomBytes
      try {
        const tx = await db.query(
          "upsert:post",
          { body: `Post ${randomBytes}` },
          COLLECTION_NAME,
          docID,
          userAuth
        )
      } catch (e) {
        console.error(e.message)
      }
    }
    const end = performance.now()
    const duration = end - start

    _myEntries.push(
      `name: measureUpsertPerformance, count: ${count}, duration: ${duration} ms, average TPS: ${
        count / (duration / 1000)
      }`
    )
  }
  await measureUpsertPerformance(TX_COUNT)

  const response = {
    statusCode: 200,
    body: JSON.stringify(_myEntries),
  }
  return response
}
