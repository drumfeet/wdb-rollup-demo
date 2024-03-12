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

  const update = async (doc) => {
    try {
      const docID = doc.id
      const randomBytes = crypto.randomBytes(16).toString("hex")

      const tx = await db.query(
        "update:post",
        { body: `Post Updated! ${randomBytes}` },
        COLLECTION_NAME,
        docID,
        userAuth
      )
    } catch (e) {
      console.error(e.message)
    }
  }

  const measureUpdatePerformance = async (count) => {
    const docs = await db.cget(COLLECTION_NAME, count)

    const start = performance.now()
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i]
      await update(doc)
    }
    const end = performance.now()
    const duration = end - start

    _myEntries.push(
      `name: measureUpdatePerformance, count: ${count}, duration: ${duration} ms, average TPS: ${
        count / (duration / 1000)
      }`
    )
  }
  await measureUpdatePerformance(TX_COUNT)

  const response = {
    statusCode: 200,
    body: JSON.stringify(_myEntries),
  }
  return response
}
