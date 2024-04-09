const SDK = require("weavedb-node-client")
const crypto = require("crypto")
const adminAuth = require("../.weavedb/accounts/evm/admin.json")

const TX_COUNT = parseInt(process.argv[2], 10) || 1
const COLLECTION_NAME = process.argv[3] || "horseRace"
const CONTRACT_TX_ID = process.argv[4] || "drumtest1"
const RPC_NODE = process.argv[5] || "localhost:8080"

const main = async () => {
  const db = new SDK({
    rpc: RPC_NODE,
    contractTxId: CONTRACT_TX_ID,
  })

  const txSetRules = await db.setRules(
    [["allow()"]],
    COLLECTION_NAME,
    "write",
    adminAuth
  )

  const randomNum = async () => {
    return Math.floor(Math.random() * 8) + 1
  }

  const addPost1 = async () => {
    for (let i = 0; i < TX_COUNT; i++) {
      const userAuth = EthCrypto.createIdentity()
      const userAddress = userAuth.address.toLowerCase()
      const txAddPost = await db.upsert(
        { horseNum: randomNum().toString(), address: userAddress },
        COLLECTION_NAME,
        userAddress,
        userAuth
      )
    }
  }

  const result = await Promise.allSettled([
    addPost1(),
    addPost2(),
    addPost3(),
    addPost4(),
    addPost5(),
    addPost6(),
    addPost7(),
    addPost8(),
    addPost9(),
    addPost10(),
    addPost11(),
    addPost12(),
    addPost13(),
    addPost14(),
    addPost15(),
    addPost16(),
    addPost17(),
    addPost18(),
    addPost19(),
    addPost20(),
  ])
}
main()
