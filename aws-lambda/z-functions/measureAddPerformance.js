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

  const measureAddPerformance = async (count) => {
    const start = performance.now()
    for (let i = 0; i < count; i++) {
      const uuid = crypto.randomUUID()
      try {
        let i = 0
        const tx = await db.query(
          "add:post",
          { body: `Post ${uuid}` },
          COLLECTION_NAME,
          userAuth
        )
      } catch (e) {
        console.error(e.message)
      }
    }
    const end = performance.now()
    const duration = end - start

    _myEntries.push(
      `name: measureAddPerformance, count: ${count}, duration: ${duration} ms, average TPS: ${
        count / (duration / 1000)
      }`
    )
  }
  await measureAddPerformance(TX_COUNT)

  const response = {
    statusCode: 200,
    body: JSON.stringify(_myEntries),
  }
  return response
}
