const SDK = require("weavedb-sdk-node")
const EthCrypto = require("eth-crypto")
const dbOwnerAuth = require("./.wallets/account1.json")

const TX_COUNT = parseInt(process.argv[2], 10) || 1
const COLLECTION_NAME = process.argv[3] || "horseRace"
const CONTRACT_TX_ID =
  process.argv[4] || "lP2OF2uPBl4dlS5h5-0umnJMxTsE7Repi3T9jLX7JBA"

const main = async () => {
  const db = new SDK({
    contractTxId: CONTRACT_TX_ID,
    nocache: true,
  })
  await db.init()

  const setRules = async () => {
    for (let i = 0; i < TX_COUNT; i++) {
      const txSetRules = await db.setRules(
        { "allow write": true },
        COLLECTION_NAME,
        dbOwnerAuth
      )
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
