const SDK = require("weavedb-node-client")

const main = async () => {
  // drumtest9
  const CONTRACT_TX_ID = "mdsGnEPW-aah2R2CKJVBpwaMi79wyqMsM6UeYfV1C30"
  const RPC_NODE =
    "ec9609ff-825a-459c-87a1-e59bed84bf7c.raas.weavedb-node.xyz:443"

  // drumtest10
  // const CONTRACT_TX_ID = "nSb_GHqY82g1DDK5ig657wSTh-0FN-U9BahhBWJ0dmw"
  // const RPC_NODE =
  //   "3453f10c-cc48-440f-be8b-4ada7b719212.raas.weavedb-node.xyz:443"

  const db = new SDK({
    contractTxId: `${CONTRACT_TX_ID}#log`,
    rpc: RPC_NODE,
  })
  const _txs = await db.cget("txs", ["id", "desc"], 2)
  console.log("_txs", _txs)

  const _blks = await db.cget("blocks", ["height", "desc"], 2)
  console.log("_blks", _blks)
}
main()
