const { expect } = require("chai")
const SDK = require("weavedb-node-client")
const adminAuth = require("../.weavedb/accounts/evm/owner.json")

describe("rollup node", function () {
  this.timeout(0)

  const COLLECTION_NAME = "posts"
  const CONTRACT_TX_ID = "Hz5zTiFlVK5gn2_OmNdOPWuz6avtCfPGAlBdVLsvGD8"
  const RPC_NODE = "localhost:9090"
  const TX_COUNT = 100000

  before(async () => {
    this.bail(true)
  })

  after(async () => {
    process.exit()
  })

  it("should not fail", async () => {
    try {
      const wait = (ms) => {
        console.log("waiting for...", String(ms), "ms")
        return new Promise((res) => setTimeout(() => res(), ms))
      }

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
        expect(txSetRules.success).to.eql(true)
        await wait(15000)

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
        expect(lastBlock).to.eql(warpLastTxId)
      }
    } catch (e) {
      console.error(e)
      expect(e).to.eql(null)
    }
  })
})
