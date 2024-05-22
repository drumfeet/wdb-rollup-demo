const SDK = require("weavedb-sdk-node")
const EthCrypto = require("eth-crypto")
const dbOwnerAuth = require("./.wallets/account1.json")
const { resolve } = require("path")
require("dotenv").config({ path: resolve(__dirname, "./.env") })

const TX_COUNT = parseInt(process.argv[2], 10) || 1
const COLLECTION_NAME = process.argv[3] || "posts"
const CONTRACT_TX_ID =
  process.argv[4] || "tEmSvpAKbQGYuQjak2e2l_Sn3n0byeec9e_-jDtljhk"
const WARP_API_KEY = process.argv[5] || process.env.apiKey

const main = async () => {
  console.log("WARP_API_KEY", WARP_API_KEY)
  const db = new SDK({
    contractTxId: CONTRACT_TX_ID,
    nocache: true,
    sequencerUrl: "https://gw.warp.cc/",
    apiKey: WARP_API_KEY,
  })
  await db.init()

  const setRules = async () => {
    for (let i = 0; i < TX_COUNT; i++) {
      const txSetRules = await db.setRules(
        { "allow write": true },
        COLLECTION_NAME,
        dbOwnerAuth
      )
      console.log("txSetRules", txSetRules)
      console.log(`[${i}] txSetRules.success ${txSetRules.success}`)
    }
  }

  const addPost = async () => {
    const randomNum = async () => {
      return Math.floor(Math.random() * 8) + 1
    }

    for (let i = 0; i < TX_COUNT; i++) {
      const userAuth = EthCrypto.createIdentity()
      const userAddress = userAuth.address.toLowerCase()
      const txAddPost = await db.upsert(
        { horseNum: randomNum().toString(), address: userAddress },
        COLLECTION_NAME,
        userAddress,
        userAuth
      )
      console.log(`[${i}] ${txAddPost.docID}`)
    }
  }

  const result = await Promise.allSettled([setRules()])
  console.log("result", result)
  process.exit()
}
main()
