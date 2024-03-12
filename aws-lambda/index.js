import { performance } from "perf_hooks"
import SDK from "weavedb-node-client"
import crypto from "crypto"
import userAuth from "./.wallets/user.json" assert { type: "json" }
import PrivateKeys from "./.wallets/privateKeys.js"

export const handler = async (event) => {
  const TX_COUNT = 20
  const COLLECTION_NAME = "posts"

  const db = new SDK({
    rpc: "47.128.255.11:8080",
    contractTxId: "drumtest1",
    // rpc: "localhost:8080",
    // contractTxId: "K6zxVKEuOeeZGhvfcE1q9SVxH7lkOJ4eqGuN9UWL-ZA",
    // contractTxId: "dLQzTjEWblJBYWb2nAwX_9ZFJAbYiZFYqZ_pxxzcGww",
  })

  const _myEntries = []

  const add = async (_key) => {
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

  const measureAddPerformance = async (count) => {
    try {
      const promises = []

      const start = performance.now()
      PrivateKeys().map(async (_key) => {
        promises.push(add(_key))
      })

      const end = performance.now()
      const duration = end - start
      _myEntries.push(
        `name: measureAddPerformance, count: ${
          promises.length
        }, duration: ${duration} ms, average TPS: ${count / (duration / 1000)}`
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
  console.log("response", response)
  return response
}

handler()
