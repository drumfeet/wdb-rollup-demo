const SDK = require("weavedb-node-client")
const SDK_NODE = require("weavedb-sdk-node")
const adminAuth = require("../.weavedb/accounts/evm/owner.json")

const TX_COUNT = parseInt(process.argv[2], 10) || 1
const COLLECTION_NAME = process.argv[3] || "posts"

const CONTRACT_TX_ID = "c_4WEuyQcxI5DFVvd48wULt_aGGXYRAB458XcSM7uFs"
const RPC_NODE = "localhost:8080"

const wait = (ms) => {
  console.log("waiting for...", String(ms), "ms")
  return new Promise((res) => setTimeout(() => res(), ms))
}
const main = async () => {
  try {
    if (1) {
      const db = new SDK({
        rpc: RPC_NODE,
        contractTxId: CONTRACT_TX_ID,
      })
      for (let i = 0; i < TX_COUNT; i++) {
        const txSetRules = await db.setRules(
          [["allow()"]],
          COLLECTION_NAME,
          "write",
          adminAuth
        )
        console.log(`[${i}] txSetRules.success ${txSetRules.success}`)
        // console.log("txSetRules", txSetRules)
        await wait(15000)
      }
    }

    if (1) {
      const dbLog = new SDK({
        contractTxId: `${CONTRACT_TX_ID}#log`,
        rpc: RPC_NODE,
      })
      const _txs = await dbLog.cget("txs", ["id", "desc"], 1)
      // console.log("_txs", _txs)
      const warpLastTxId = _txs[0].data.warp
      const _blks = await dbLog.cget("blocks", ["height", "desc"], 1)
      // console.log("_blks", _blks)
      const lastBlock = _blks[0].data.txid
      console.log("lastBlock", lastBlock)
      console.log("warpLastTxId", warpLastTxId)
    }
  } catch (e) {
    console.log(">>main() ERROR ", e)
  }
}
main()
