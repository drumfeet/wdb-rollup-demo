import { performance } from "perf_hooks"
import SDK from "weavedb-node-client"
import { nanoid } from "nanoid"
import userAuth from "./.wallets/user.json" assert { type: "json" }

export const handler = async (event) => {
  const ADD_TX_COUNT = 20
  const GET_TX_COUNT = 1
  const COLLECTION_NAME = "posts"

  const db = new SDK({
    rpc: "47.128.255.11:8080",
    contractTxId: "drumtest1",
  })

  const _myEntries = []

  const measureAddPerformance = async (count) => {
    const start = performance.now()
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
      } catch (e) {
        console.error(e.message)
      }
    }
    const end = performance.now()
    const duration = end - start

    _myEntries.push(
      `name: measureAddPerformance, count: ${count}, duration: ${duration}, average TPS: ${
        count / (duration / 1000)
      }`
    )
  }

  const measureGetPerformance = async (count) => {
    const start = performance.now()
    for (let i = 0; i < count; i++) {
      try {
        const result = await db.get(COLLECTION_NAME)
      } catch (e) {
        console.error(e.message)
      }
    }
    const end = performance.now()
    const duration = end - start

    _myEntries.push(
      `name: measureGetPerformance, count: ${count}, duration: ${duration}, average TPS: ${
        count / (duration / 1000)
      }`
    )
  }

  await measureAddPerformance(ADD_TX_COUNT)
  await measureGetPerformance(GET_TX_COUNT)

  const response = {
    statusCode: 200,
    body: JSON.stringify(_myEntries),
  }
  return response
}
