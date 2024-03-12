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

  const add = async (str) => {
    try {
      const tx = await db.query(
        "add:post",
        { body: `Post ${str}` },
        COLLECTION_NAME,
        userAuth
      )

      if (tx.error) {
        throw new Error(tx.error)
      }

      return tx
    } catch (e) {
      console.error(e.message)
    }
  }

  const measureAddPerformance = async (count) => {
    try {
      const randomBytesArray = Array.from({ length: count }, () =>
        crypto.randomBytes(16).toString("hex")
      )
      const promises = []

      const start = performance.now()
      randomBytesArray.map((_str) => {
        promises.push(add(_str))
      })
      const end = performance.now()
      const duration = end - start
      _myEntries.push(
        `name: measureAddPerformance, count: ${count}, duration: ${duration} ms, average TPS: ${
          count / (duration / 1000)
        }`
      )

      const results = await Promise.allSettled(promises)
      console.log("results", results)
    } catch (e) {
      console.error(e.message)
    }
  }
  await measureAddPerformance(TX_COUNT)

  const response = {
    statusCode: 200,
    body: JSON.stringify(_myEntries),
  }
  return response
}

handler()
